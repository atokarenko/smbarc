import { test, expect, type Page } from "@playwright/test";

const BASE = "http://localhost:7001";

// Answers for open-text questions — realistic 2-3 sentences each
const OPEN_TEXT_ANSWERS: Record<string, string> = {
  ops_time_sink:
    "Больше всего времени уходит на ручной ввод данных из заказов в нашу систему учёта. Каждый день команда тратит около 3 часов на рутинную обработку документов и сверку.",
  ops_bottleneck:
    "Основные заторы возникают при согласовании между отделами продаж и логистики. Информация передаётся по email и часто теряется или задерживается на 1-2 дня.",
  ops_automate_wish:
    "Я бы автоматизировал обработку входящих заказов — от получения до создания задачи на склад. Это сэкономило бы как минимум 15 человеко-часов в неделю.",
  sal_find_customers:
    "В основном находим клиентов через холодные звонки и рекомендации текущих клиентов. LinkedIn и отраслевые выставки тоже работают, но конверсия там ниже.",
  sal_lose_customers:
    "Чаще всего теряем на этапе коммерческого предложения — клиенты уходят к конкурентам с более быстрым ответом. Наш цикл согласования КП занимает 3-5 дней.",
  sal_complaints:
    "Клиенты жалуются на долгую доставку и отсутствие трекинга заказов. Сейчас обратную связь собираем через email вручную, системы нет.",
  fin_growing_costs:
    "Больше всего растут расходы на персонал и аренду складских помещений. Деньги утекают на переработки — платим сверхурочные из-за неэффективных процессов.",
  fin_cash_flow:
    "Главная проблема — поздние платежи от крупных клиентов, задержки до 60 дней. Плюс сезонные спады в январе и летом создают кассовые разрывы.",
  thr_hiring:
    "Самое сложное — найти квалифицированных менеджеров по продажам. Закрытие вакансии занимает 2-3 месяца, и текучка в первый год высокая.",
  thr_turnover:
    "Хорошие сотрудники уходят из-за выгорания и отсутствия карьерного роста. Удержать помогла бы прозрачная система KPI и обучение.",
  thr_communication:
    "Команда тратит около 30% времени на совещания и переписки. Особенно много координации между удалёнщиками и офисными сотрудниками.",
  rsk_keeps_up:
    "Больше всего беспокоит зависимость от одного крупного клиента — он даёт 40% выручки. Если уйдёт, бизнес окажется в критическом состоянии.",
  rsk_key_person:
    "Если уйдёт наш главный инженер, встанут все технические процессы. Документации почти нет, всё держится на его экспертизе.",
  rsk_data_security:
    "Уверенность средняя — данные на локальных серверах без бэкапа в облако. В случае взлома или аварии восстановление займёт несколько дней.",
};

const RADIO_ANSWERS: Record<string, number> = {
  ops_breaks: 1,
  sal_pipeline: 2,
  fin_reporting: 1,
  thr_training: 2,
  rsk_regulatory: 1,
};

const SECTIONS = [
  ["ops_time_sink", "ops_bottleneck", "ops_breaks", "ops_automate_wish"],
  ["sal_find_customers", "sal_lose_customers", "sal_pipeline", "sal_complaints"],
  ["fin_growing_costs", "fin_reporting", "fin_cash_flow"],
  ["thr_hiring", "thr_turnover", "thr_training", "thr_communication"],
  ["rsk_keeps_up", "rsk_key_person", "rsk_regulatory", "rsk_data_security"],
];

async function login(page: Page) {
  await page.goto(`${BASE}/ru/login`);
  await page.waitForLoadState("networkidle");
  const ceoCard = page.locator("[class*=cursor-pointer]").first();
  await ceoCard.click();
  await page.waitForURL(/\/ru\/dashboard/, { timeout: 30_000 });
  console.log("OK: Logged in as demo-ceo");
}

async function fillSection(page: Page, sectionIndex: number) {
  const questionIds = SECTIONS[sectionIndex];
  console.log(`Filling section ${sectionIndex + 1}/${SECTIONS.length} (${questionIds.length} questions)...`);

  for (const qId of questionIds) {
    if (RADIO_ANSWERS[qId] !== undefined) {
      const radioIndex = RADIO_ANSWERS[qId];
      const radioItem = page.locator(`#${qId}-${radioIndex}`);
      await radioItem.click();
      console.log(`  [radio] ${qId} -> option ${radioIndex}`);
    } else if (OPEN_TEXT_ANSWERS[qId]) {
      const textareas = page.locator("textarea");
      const openTextQuestionsInSection = questionIds.filter(
        (id) => RADIO_ANSWERS[id] === undefined
      );
      const textareaIndex = openTextQuestionsInSection.indexOf(qId);
      if (textareaIndex >= 0) {
        await textareas.nth(textareaIndex).fill(OPEN_TEXT_ANSWERS[qId]);
        console.log(`  [text]  ${qId} -> filled`);
      }
    }
    await page.waitForTimeout(400);
  }
}

/**
 * After clicking "Next section" or "Complete", wait for one of:
 * 1. AI follow-up indicator (generation succeeded)
 * 2. Next section label change (generation failed, moved on)
 * 3. Processing screen (completion started)
 * 4. Error message
 */
async function waitForFollowUpOrNextState(
  page: Page,
  sectionIndex: number,
  isLast: boolean
): Promise<"followup" | "next_section" | "processing" | "error" | "completed"> {
  console.log(`  Waiting for AI follow-up or state change...`);

  // First wait for the spinner to appear (means the server action was called)
  const spinner = page.locator("text=Генерируем уточняющие вопросы...");
  try {
    await spinner.waitFor({ timeout: 5_000 });
    console.log(`  Spinner appeared - generating follow-ups...`);
  } catch {
    console.log(`  No spinner - checking current state...`);
  }

  // Now race between possible outcomes
  const followUpIndicator = page.locator("text=ИИ задаёт вопросы на основе ваших ответов");
  const nextSectionLabel = page.locator(`text=Раздел ${sectionIndex + 2} из 5`);
  const processingText = page.locator("text=/Анализируем ваш бизнес|Ищем возможности/");
  const errorText = page.locator("text=Что-то пошло не так");
  const completedText = page.locator("text=Оценка завершена");

  const result = await Promise.race([
    followUpIndicator.waitFor({ timeout: 180_000 }).then(() => "followup" as const),
    ...(isLast
      ? [
          processingText.waitFor({ timeout: 180_000 }).then(() => "processing" as const),
          completedText.waitFor({ timeout: 180_000 }).then(() => "completed" as const),
          errorText.waitFor({ timeout: 180_000 }).then(() => "error" as const),
        ]
      : [nextSectionLabel.waitFor({ timeout: 180_000 }).then(() => "next_section" as const)]),
  ]);

  console.log(`  State resolved: ${result}`);
  return result;
}

async function handleFollowUp(page: Page, sectionIndex: number, isLast: boolean) {
  // Fill all follow-up textareas
  const followUpTextareas = page.locator("textarea");
  const count = await followUpTextareas.count();
  console.log(`  ${count} follow-up question(s) to answer`);

  for (let i = 0; i < count; i++) {
    const answer =
      "Мы работаем над этим вопросом и планируем внедрить улучшения в ближайшие месяцы. Сейчас используем базовые инструменты для решения этой задачи.";
    await followUpTextareas.nth(i).fill(answer);
    await page.waitForTimeout(400);
  }

  // Click continue button
  const continueBtn = page.getByRole("button", {
    name: "Перейти к следующему разделу",
  });
  const skipBtn = page.getByRole("button", { name: "Пропустить" });

  if (await continueBtn.isVisible().catch(() => false)) {
    await continueBtn.click();
    console.log(`  Clicked 'Continue' after follow-up`);
  } else if (await skipBtn.isVisible().catch(() => false)) {
    await skipBtn.click();
    console.log(`  Clicked 'Skip' after follow-up`);
  }
}

test.describe("Assessment Flow E2E", () => {
  test("complete full assessment with AI follow-ups", async ({ page }) => {
    test.setTimeout(600_000);

    // Capture console errors from the browser
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    // Step 1: Login
    await login(page);
    expect(page.url()).toContain("/ru/dashboard");

    // Step 2: Navigate to scan page
    await page.goto(`${BASE}/ru/scan`);
    await page.waitForLoadState("networkidle");

    // Step 3: Start assessment
    const startButton = page.getByRole("button", { name: "Начать оценку" });
    if (await startButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await startButton.click();
      console.log("OK: Started new assessment");
      await page.waitForTimeout(1000);
    } else {
      console.log("OK: Resuming existing assessment");
    }

    // Verify we see section 1
    await expect(page.locator("text=Раздел 1 из 5")).toBeVisible({ timeout: 10_000 });

    // Step 4: Fill all 5 sections
    let followUpCount = 0;

    for (let sectionIdx = 0; sectionIdx < 5; sectionIdx++) {
      const isLast = sectionIdx === 4;

      // Fill the current section
      await fillSection(page, sectionIdx);

      // Click next/complete button
      if (!isLast) {
        const nextBtn = page.getByRole("button", { name: "Следующий раздел" });
        await expect(nextBtn).toBeEnabled({ timeout: 5_000 });
        await nextBtn.click();
        console.log(`Clicked 'Next section' after section ${sectionIdx + 1}`);
      } else {
        const completeBtn = page.getByRole("button", { name: "Завершить оценку" });
        await expect(completeBtn).toBeEnabled({ timeout: 5_000 });
        await completeBtn.click();
        console.log("Clicked 'Complete Assessment'");
      }

      // Wait for follow-up or next state
      const state = await waitForFollowUpOrNextState(page, sectionIdx, isLast);

      if (state === "followup") {
        followUpCount++;
        console.log(`AI follow-up #${followUpCount} for section ${sectionIdx + 1}`);
        await handleFollowUp(page, sectionIdx, isLast);

        // After follow-up on last section, wait for processing/completion
        if (isLast) {
          console.log("Waiting for processing after final follow-up...");
          const finalState = await Promise.race([
            page.locator("text=/Анализируем ваш бизнес|Ищем возможности/")
              .waitFor({ timeout: 180_000 }).then(() => "processing" as const),
            page.locator("text=Оценка завершена")
              .waitFor({ timeout: 180_000 }).then(() => "completed" as const),
            page.locator("text=Что-то пошло не так")
              .waitFor({ timeout: 180_000 }).then(() => "error" as const),
          ]);
          console.log(`Final state after follow-up: ${finalState}`);

          if (finalState === "processing") {
            // Wait for completion
            await page.waitForSelector("text=Оценка завершена", { timeout: 300_000 });
          } else if (finalState === "error") {
            // Print console errors and fail
            console.log("Console errors:", consoleErrors.join("\n"));
            await page.screenshot({ path: "tests/e2e/error-screenshot.png" });
            throw new Error("Assessment scoring failed — see console errors above");
          }
        } else {
          // Wait for next section to appear after follow-up
          await expect(
            page.locator(`text=Раздел ${sectionIdx + 2} из 5`)
          ).toBeVisible({ timeout: 30_000 });
        }
      } else if (state === "next_section") {
        console.log(`Follow-up skipped/failed for section ${sectionIdx + 1}, moved to next`);
      } else if (state === "processing") {
        console.log("Processing screen visible — waiting for completion...");
        await page.waitForSelector("text=Оценка завершена", { timeout: 300_000 });
      } else if (state === "completed") {
        console.log("Assessment already completed!");
      } else if (state === "error") {
        console.log("Console errors:", consoleErrors.join("\n"));
        await page.screenshot({ path: "tests/e2e/error-screenshot.png" });
        throw new Error("Assessment encountered an error — see console errors");
      }
    }

    // Step 5: Verify completion
    console.log("=== VERIFICATION ===");
    await expect(page.locator("text=Оценка завершена")).toBeVisible();
    await expect(
      page.locator("text=Результаты сгенерированы и сохранены")
    ).toBeVisible();

    const dashboardBtn = page.getByRole("button", { name: "Перейти к панели" });
    await expect(dashboardBtn).toBeVisible();

    console.log(`Follow-ups completed: ${followUpCount}/5`);
    console.log("OK: Assessment flow completed successfully!");

    // Navigate back to dashboard
    await dashboardBtn.click();
    await page.waitForURL(/\/ru\/dashboard/, { timeout: 10_000 });
    console.log("OK: Back on dashboard");

    // Log any console errors for review
    if (consoleErrors.length > 0) {
      console.log(`\nBrowser console errors (${consoleErrors.length}):`);
      consoleErrors.forEach((e) => console.log(`  ${e}`));
    }
  });
});
