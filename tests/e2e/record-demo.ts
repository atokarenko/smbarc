/**
 * Demo video recorder for the assessment flow.
 * Records browser via Playwright, then overlays Russian subtitles via ffmpeg.
 *
 * Usage:
 *   npx tsx tests/e2e/record-demo.ts
 *
 * Prerequisites:
 *   - Dev server running on localhost:7001
 *   - AI proxy running on localhost:3456
 *   - ffmpeg installed
 *   - No incomplete assessments in DB (run: sqlite3 ./prisma/dev.db "DELETE FROM Assessment WHERE status <> 'COMPLETE';")
 */

import { chromium, type Page } from "@playwright/test";
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const BASE = "http://localhost:7001";
const OUTPUT_DIR = path.resolve(__dirname, "../../demo");
const RAW_VIDEO = path.join(OUTPUT_DIR, "raw.webm");
const SUBTITLES_FILE = path.join(OUTPUT_DIR, "subs.srt");
const FINAL_VIDEO = path.join(OUTPUT_DIR, "demo-assessment.mp4");

// ── Subtitle timeline ──
// Each entry: [startSec, endSec, russianText]
// Times are approximate — adjusted after recording based on actual durations
const subtitles: [number, number, string][] = [];
let subIndex = 1;
let currentTime = 0;

function addSub(durationSec: number, text: string) {
  subtitles.push([currentTime, currentTime + durationSec, text]);
  currentTime += durationSec;
}

function advanceTime(sec: number) {
  currentTime += sec;
}

function formatSrtTime(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const ms = Math.round((sec % 1) * 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

function writeSrt(subs: [number, number, string][], filePath: string) {
  let srt = "";
  subs.forEach(([start, end, text], i) => {
    srt += `${i + 1}\n${formatSrtTime(start)} --> ${formatSrtTime(end)}\n${text}\n\n`;
  });
  fs.writeFileSync(filePath, srt, "utf-8");
}

// ── Answer data ──
const OPEN_TEXT_ANSWERS: Record<string, string> = {
  ops_time_sink: "Больше всего времени уходит на ручной ввод данных из заказов в систему учёта. Команда тратит 3 часа в день на рутину.",
  ops_bottleneck: "Заторы при согласовании между продажами и логистикой. Информация теряется и задерживается на 1-2 дня.",
  ops_automate_wish: "Автоматизировал бы обработку входящих заказов — от получения до задачи на склад.",
  sal_find_customers: "Находим клиентов через холодные звонки и рекомендации. LinkedIn тоже работает, но конверсия ниже.",
  sal_lose_customers: "Теряем на этапе КП — клиенты уходят к конкурентам с более быстрым ответом. Цикл КП 3-5 дней.",
  sal_complaints: "Жалуются на долгую доставку и отсутствие трекинга заказов. Обратную связь собираем вручную.",
  fin_growing_costs: "Растут расходы на персонал и аренду склада. Деньги утекают на переработки и сверхурочные.",
  fin_cash_flow: "Поздние платежи от крупных клиентов — задержки до 60 дней. Сезонные спады создают кассовые разрывы.",
  thr_hiring: "Сложно найти менеджеров по продажам. Закрытие вакансии — 2-3 месяца, текучка высокая.",
  thr_turnover: "Уходят из-за выгорания и отсутствия карьерного роста. Помогла бы система KPI и обучение.",
  thr_communication: "Команда тратит 30% времени на совещания и переписки. Много координации между удалёнщиками.",
  rsk_keeps_up: "Зависимость от одного клиента — 40% выручки. Если уйдёт, бизнес в критическом состоянии.",
  rsk_key_person: "Если уйдёт главный инженер, встанут все технические процессы. Документации нет.",
  rsk_data_security: "Данные на локальных серверах без облачного бэкапа. Восстановление займёт несколько дней.",
};

const RADIO_ANSWERS: Record<string, number> = {
  ops_breaks: 1,
  sal_pipeline: 2,
  fin_reporting: 1,
  thr_training: 2,
  rsk_regulatory: 1,
};

const SECTIONS = [
  { name: "Операции и процессы", ids: ["ops_time_sink", "ops_bottleneck", "ops_breaks", "ops_automate_wish"] },
  { name: "Продажи и клиенты", ids: ["sal_find_customers", "sal_lose_customers", "sal_pipeline", "sal_complaints"] },
  { name: "Финансы и ресурсы", ids: ["fin_growing_costs", "fin_reporting", "fin_cash_flow"] },
  { name: "Команда и кадры", ids: ["thr_hiring", "thr_turnover", "thr_training", "thr_communication"] },
  { name: "Риски и соответствие", ids: ["rsk_keeps_up", "rsk_key_person", "rsk_regulatory", "rsk_data_security"] },
];

// ── Helpers ──
async function typeSlowly(page: Page, selector: string, text: string, index: number) {
  const el = page.locator(selector).nth(index);
  await el.click();
  // Type at ~40 chars/sec for visual effect
  for (let i = 0; i < text.length; i += 3) {
    const chunk = text.slice(i, i + 3);
    await el.pressSequentially(chunk, { delay: 25 });
  }
}

async function pause(page: Page, ms: number) {
  await page.waitForTimeout(ms);
}

// ── Main recording flow ──
async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("Launching browser with video recording...");
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: { dir: OUTPUT_DIR, size: { width: 1280, height: 800 } },
    locale: "ru-RU",
  });
  const page = await context.newPage();

  // Track real timestamps for subtitle sync
  const t0 = Date.now();
  function elapsed() { return (Date.now() - t0) / 1000; }
  const subs: [number, number, string][] = [];
  function sub(text: string) {
    const t = elapsed();
    // Close previous subtitle
    if (subs.length > 0 && subs[subs.length - 1][1] === 0) {
      subs[subs.length - 1][1] = t;
    }
    subs.push([t, 0, text]); // end=0 means open, will be closed by next sub or endSub
  }
  function endSub() {
    if (subs.length > 0 && subs[subs.length - 1][1] === 0) {
      subs[subs.length - 1][1] = elapsed();
    }
  }

  try {
    // ── SCENE 1: Login ──
    sub("AI Architect — Оценка здоровья бизнеса");
    await page.goto(`${BASE}/ru/login`);
    await page.waitForLoadState("networkidle");
    await pause(page, 2000);

    sub("Входим как демо-пользователь (CEO)");
    const ceoCard = page.locator("[class*=cursor-pointer]").first();
    await pause(page, 1500);
    await ceoCard.click();
    await page.waitForURL(/dashboard/, { timeout: 30000 });
    await pause(page, 2000);

    // ── SCENE 2: Navigate to Scan ──
    sub("Переходим к бизнес-оценке");
    await page.goto(`${BASE}/ru/scan`);
    await page.waitForLoadState("networkidle");
    await pause(page, 2000);

    // ── SCENE 3: Start Assessment ──
    sub("Начинаем оценку здоровья бизнеса");
    await pause(page, 1500);
    const startBtn = page.getByRole("button", { name: "Начать оценку" });
    await startBtn.click();
    await pause(page, 1500);

    // ── SCENE 4-8: Fill sections ──
    for (let si = 0; si < SECTIONS.length; si++) {
      const section = SECTIONS[si];
      const isLast = si === SECTIONS.length - 1;

      sub(`Раздел ${si + 1}/5: ${section.name}`);
      await pause(page, 1500);

      // Fill questions
      const openIds = section.ids.filter((id) => !RADIO_ANSWERS[id]);
      let textareaIdx = 0;

      for (const qId of section.ids) {
        if (RADIO_ANSWERS[qId] !== undefined) {
          sub(`Выбираем вариант ответа`);
          await page.locator(`#${qId}-${RADIO_ANSWERS[qId]}`).click();
          await pause(page, 800);
        } else {
          const answer = OPEN_TEXT_ANSWERS[qId];
          sub(`Описываем ситуацию в компании`);
          await typeSlowly(page, "textarea", answer, textareaIdx);
          textareaIdx++;
          await pause(page, 600);
        }
      }

      // Click Next / Complete
      if (!isLast) {
        sub("Переходим к следующему разделу");
        await pause(page, 800);
        const nextBtn = page.getByRole("button", { name: "Следующий раздел" });
        await nextBtn.click();

        // Wait for follow-up or next section
        sub("ИИ анализирует ответы и задаёт уточняющие вопросы...");

        const followUpAppeared = await page
          .locator("text=ИИ задаёт вопросы на основе ваших ответов")
          .waitFor({ timeout: 180_000 })
          .then(() => true)
          .catch(() => false);

        if (followUpAppeared) {
          sub("ИИ сгенерировал уточняющие вопросы");
          await pause(page, 2000);

          // Fill follow-up answers
          const fTextareas = page.locator("textarea");
          const fCount = await fTextareas.count();
          for (let fi = 0; fi < fCount; fi++) {
            sub("Отвечаем на уточняющий вопрос ИИ");
            await fTextareas.nth(fi).fill(
              "Планируем внедрить улучшения в ближайшие месяцы. Используем базовые инструменты."
            );
            await pause(page, 800);
          }

          sub("Продолжаем к следующему разделу");
          await pause(page, 800);
          const continueBtn = page.getByRole("button", { name: "Перейти к следующему разделу" });
          if (await continueBtn.isVisible().catch(() => false)) {
            await continueBtn.click();
          } else {
            const skipBtn = page.getByRole("button", { name: "Пропустить" });
            if (await skipBtn.isVisible().catch(() => false)) await skipBtn.click();
          }
          await pause(page, 1500);
        } else {
          // Follow-up skipped
          await pause(page, 1000);
        }
      } else {
        // Last section — complete
        sub("Завершаем оценку — запускаем ИИ-анализ");
        await pause(page, 1000);
        const completeBtn = page.getByRole("button", { name: "Завершить оценку" });
        await completeBtn.click();

        // Handle possible final follow-up
        const finalFollowUp = await page
          .locator("text=ИИ задаёт вопросы на основе ваших ответов")
          .waitFor({ timeout: 180_000 })
          .then(() => true)
          .catch(() => false);

        if (finalFollowUp) {
          sub("Последние уточняющие вопросы от ИИ");
          await pause(page, 1500);
          const fTextareas = page.locator("textarea");
          const fCount = await fTextareas.count();
          for (let fi = 0; fi < fCount; fi++) {
            await fTextareas.nth(fi).fill("Работаем над решением, планируем автоматизацию.");
            await pause(page, 500);
          }
          const btn = page.getByRole("button", { name: "Перейти к следующему разделу" });
          if (await btn.isVisible().catch(() => false)) await btn.click();
        }
      }
    }

    // ── SCENE 9: Processing ──
    sub("ИИ анализирует все ответы по 5 направлениям бизнеса...");
    try {
      await page.waitForSelector("text=/Анализируем|Ищем возможности|Рассчитываем/", { timeout: 30000 });
    } catch { /* processing screen may be too fast */ }

    sub("Генерация отчёта: оценка зрелости, план автоматизации, карта рисков, прогноз ROI");

    // ── SCENE 10: Results ──
    await page.waitForSelector("text=Оценка завершена", { timeout: 300_000 });
    sub("Оценка завершена! Результаты сохранены.");
    await pause(page, 3000);

    sub("Переходим к панели управления с результатами");
    await pause(page, 1500);
    const dashBtn = page.getByRole("button", { name: "Перейти к панели" });
    await dashBtn.click();
    await page.waitForURL(/dashboard/, { timeout: 10000 });
    await pause(page, 3000);

    endSub();
    sub("AI Architect — Автоматизация бизнеса начинается здесь");
    await pause(page, 3000);
    endSub();

  } finally {
    // Close to finalize video
    await context.close();
    await browser.close();
  }

  // ── Find the recorded video file ──
  const videoFiles = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".webm"));
  if (videoFiles.length === 0) {
    console.error("No video file found!");
    process.exit(1);
  }
  const latestVideo = videoFiles
    .map((f) => ({ name: f, time: fs.statSync(path.join(OUTPUT_DIR, f)).mtimeMs }))
    .sort((a, b) => b.time - a.time)[0].name;
  const videoPath = path.join(OUTPUT_DIR, latestVideo);
  console.log(`Recorded video: ${videoPath}`);

  // ── Write SRT subtitles ──
  writeSrt(subs, SUBTITLES_FILE);
  console.log(`Subtitles written: ${SUBTITLES_FILE}`);
  console.log(`Total subtitles: ${subs.length}`);

  // ── Burn subtitles with ffmpeg ──
  console.log("Encoding final video with subtitles...");
  const fontFilter = [
    `subtitles='${SUBTITLES_FILE}'`,
    `:force_style='FontSize=22`,
    `,FontName=Arial`,
    `,PrimaryColour=&H00FFFFFF`,
    `,OutlineColour=&H00000000`,
    `,Outline=2`,
    `,Shadow=1`,
    `,MarginV=40`,
    `,Alignment=2'`,
  ].join("");

  const ffCmd = [
    "ffmpeg", "-y",
    "-i", `"${videoPath}"`,
    "-vf", `"${fontFilter}"`,
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "23",
    "-c:a", "aac",
    "-movflags", "+faststart",
    `"${FINAL_VIDEO}"`,
  ].join(" ");

  console.log(`Running: ${ffCmd}`);
  try {
    execSync(ffCmd, { stdio: "inherit", timeout: 120000 });
    console.log(`\nDone! Final video: ${FINAL_VIDEO}`);
  } catch (e) {
    console.error("ffmpeg failed, trying simpler approach...");
    // Fallback: just convert without subtitle burn-in
    const simpleFf = `ffmpeg -y -i "${videoPath}" -c:v libx264 -preset medium -crf 23 "${FINAL_VIDEO}"`;
    execSync(simpleFf, { stdio: "inherit", timeout: 120000 });
    console.log(`\nVideo saved without burned subtitles: ${FINAL_VIDEO}`);
    console.log(`Subtitles file (add manually): ${SUBTITLES_FILE}`);
  }
}

main().catch((e) => {
  console.error("Recording failed:", e);
  process.exit(1);
});
