/**
 * Maturity Level Rubrics for AI/Digital Maturity Assessment of SMB Businesses.
 *
 * Synthesized from:
 * - McKinsey Digital Quotient (strategy, culture, capabilities, organization)
 * - Deloitte AI Maturity Model (foundational -> skilled -> structured -> transformers)
 * - BCG AI@Scale / AI Maturity Matrix (ASPIRE framework, RAI dimensions)
 * - Accenture Operations Maturity (stable -> efficient -> predictive -> future-ready)
 * - MITRE AI Maturity Model (6 pillars)
 * - Academic SME digital maturity frameworks (CMMI-based 5-level models)
 *
 * Used for:
 * 1. Calibrating AI scoring (so Claude knows what 30 vs 70 means)
 * 2. Generating meaningful explanations for scores
 * 3. Providing actionable "next level" recommendations
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MaturityLevel {
  level: number;
  name: string;
  range: [number, number];
  description: string[];
  exampleQuotes: { en: string; ru: string }[];
  scoreTriggers: string[];
  nextSteps: { en: string; ru: string }[];
}

export interface DimensionRubric {
  dimension: string;
  dimensionLabel: { en: string; ru: string };
  levels: [MaturityLevel, MaturityLevel, MaturityLevel, MaturityLevel, MaturityLevel];
}

// ---------------------------------------------------------------------------
// 1. Operations & Processes
// ---------------------------------------------------------------------------

const operationsRubric: DimensionRubric = {
  dimension: "operations",
  dimensionLabel: {
    en: "Operations & Processes",
    ru: "Операции и процессы",
  },
  levels: [
    {
      level: 1,
      name: "Critical",
      range: [0, 20],
      description: [
        "No documented processes; work depends entirely on tribal knowledge and individual habits.",
        "Daily firefighting is the norm -- errors, delays, and rework consume most of the team's energy.",
        "No automation whatsoever; everything is manual, paper-based, or lives in people's heads.",
        "Output quality varies wildly depending on who does the work and what day it is.",
      ],
      exampleQuotes: [
        {
          en: "We don't really have processes -- everyone just does things their own way. When someone is sick, everything falls apart.",
          ru: "У нас нет настоящих процессов -- каждый делает по-своему. Когда кто-то болеет, все разваливается.",
        },
        {
          en: "I spend most of my day fixing things that broke overnight.",
          ru: "Я провожу большую часть дня, исправляя то, что сломалось за ночь.",
        },
      ],
      scoreTriggers: [
        "no process", "no documentation", "everything manual", "chaos",
        "firefighting", "no system", "paper-based", "no tracking",
        "depends on one person", "breaks daily", "constant errors",
        "we don't know", "never measured", "no idea how long",
      ],
      nextSteps: [
        {
          en: "Document your top 3 most repeated daily tasks step-by-step, even in a simple Google Doc.",
          ru: "Задокументируйте 3 самые повторяющиеся ежедневные задачи пошагово, хотя бы в простом Google Doc.",
        },
        {
          en: "Assign a single owner for each critical process so there is always one person accountable.",
          ru: "Назначьте одного ответственного за каждый критический процесс.",
        },
        {
          en: "Start tracking errors and delays in a simple spreadsheet -- you cannot fix what you cannot see.",
          ru: "Начните отслеживать ошибки и задержки в простой таблице -- нельзя исправить то, что не видно.",
        },
      ],
    },
    {
      level: 2,
      name: "Struggling",
      range: [21, 40],
      description: [
        "Some processes exist on paper or in someone's memory, but they are inconsistently followed.",
        "Recurring problems are known but patched reactively rather than fixed at root cause.",
        "Basic tools are used (spreadsheets, email) but not in a coordinated or systematic way.",
        "The team recognizes inefficiency but lacks time, budget, or knowledge to improve it.",
      ],
      exampleQuotes: [
        {
          en: "We have a spreadsheet for tracking orders, but half the team doesn't use it. Things fall through the cracks every week.",
          ru: "У нас есть таблица для отслеживания заказов, но половина команды ей не пользуется. Каждую неделю что-то проваливается.",
        },
        {
          en: "I know what's broken, I just don't have time to fix it because I'm too busy putting out fires.",
          ru: "Я знаю, что сломано, просто нет времени это починить, потому что все время тушу пожары.",
        },
      ],
      scoreTriggers: [
        "spreadsheet but messy", "we know the problems", "no time to fix",
        "inconsistent", "some tracking", "depends who does it",
        "weekly issues", "patching", "workarounds", "basic tools",
        "we try but", "not everyone follows", "falls through cracks",
      ],
      nextSteps: [
        {
          en: "Pick your single biggest bottleneck and map the full process end-to-end. Identify the exact step where things break.",
          ru: "Выберите самое большое узкое место и опишите полный процесс от начала до конца. Найдите конкретный шаг, на котором все ломается.",
        },
        {
          en: "Implement one simple automation: auto-reminders, form submissions, or template-based workflows.",
          ru: "Внедрите одну простую автоматизацию: авто-напоминания, формы или шаблонные рабочие процессы.",
        },
        {
          en: "Hold a weekly 15-minute process review to catch recurring problems before they escalate.",
          ru: "Проводите еженедельный 15-минутный обзор процессов, чтобы ловить повторяющиеся проблемы до их обострения.",
        },
      ],
    },
    {
      level: 3,
      name: "Stable",
      range: [41, 60],
      description: [
        "Core processes are documented and mostly followed; the business runs without constant crises.",
        "Some automation exists (CRM, basic workflow tools, templates) but it's patchy -- islands of efficiency surrounded by manual work.",
        "Errors happen monthly rather than daily; the team can handle normal volume but struggles with spikes.",
        "Management has visibility into key metrics but reporting is still partly manual or delayed.",
      ],
      exampleQuotes: [
        {
          en: "Things mostly work, but when we get busy, the cracks show. Our CRM is decent but a lot of follow-up is still manual.",
          ru: "В целом все работает, но когда загрузка растет, трещины проявляются. CRM неплохая, но много follow-up все еще вручную.",
        },
        {
          en: "We have processes, but I wouldn't say they're optimized. There's definitely room to improve.",
          ru: "У нас есть процессы, но не скажу, что они оптимизированы. Определенно есть куда расти.",
        },
      ],
      scoreTriggers: [
        "mostly works", "some automation", "CRM", "documented",
        "monthly issues", "room to improve", "handles normal volume",
        "basic reporting", "some metrics", "not optimized but functional",
        "we track", "standard procedures", "could be better",
      ],
      nextSteps: [
        {
          en: "Connect your existing tools -- integrate CRM with email, accounting with invoicing. Eliminate manual data transfer between systems.",
          ru: "Свяжите существующие инструменты -- интегрируйте CRM с почтой, бухгалтерию с выставлением счетов. Устраните ручной перенос данных между системами.",
        },
        {
          en: "Automate your reporting: set up dashboards that update in real-time instead of manual weekly reports.",
          ru: "Автоматизируйте отчетность: настройте дашборды, обновляющиеся в реальном времени вместо ручных еженедельных отчетов.",
        },
        {
          en: "Identify your top 3 remaining manual handoffs and create automation workflows (Zapier, Make, or native integrations).",
          ru: "Определите 3 главных оставшихся ручных передачи данных и создайте автоматизированные рабочие процессы (Zapier, Make или нативные интеграции).",
        },
      ],
    },
    {
      level: 4,
      name: "Efficient",
      range: [61, 80],
      description: [
        "Most core processes are automated end-to-end; manual intervention is the exception, not the rule.",
        "Systems are integrated -- data flows between CRM, accounting, project management, and communication tools automatically.",
        "The team operates from dashboards and real-time metrics; decisions are data-informed rather than gut-driven.",
        "Process improvements are proactive: the team identifies optimization opportunities before they become problems.",
      ],
      exampleQuotes: [
        {
          en: "When a new lead comes in, it automatically gets assigned, scored, and the first email goes out. My team focuses on closing, not admin.",
          ru: "Когда приходит новый лид, он автоматически назначается, оценивается, и первое письмо уходит. Команда фокусируется на закрытии сделок, а не на администрировании.",
        },
        {
          en: "I can see our pipeline, cash flow, and team utilization on one dashboard. We review weekly and adjust.",
          ru: "Я вижу нашу воронку, денежный поток и загрузку команды на одном дашборде. Мы просматриваем еженедельно и корректируем.",
        },
      ],
      scoreTriggers: [
        "automated", "integrated systems", "dashboard", "real-time",
        "data-driven", "proactive", "optimized", "pipeline managed",
        "KPIs tracked", "continuous improvement", "exception-based",
        "we measure", "automated workflows", "low error rate",
      ],
      nextSteps: [
        {
          en: "Introduce predictive analytics: use historical data to forecast demand, churn, or cash flow gaps before they happen.",
          ru: "Внедрите предиктивную аналитику: используйте исторические данные для прогнозирования спроса, оттока или кассовых разрывов до их возникновения.",
        },
        {
          en: "Explore AI-assisted decision making for repetitive judgment calls (lead scoring, pricing, resource allocation).",
          ru: "Исследуйте AI-поддержку решений для повторяющихся оценок (скоринг лидов, ценообразование, распределение ресурсов).",
        },
        {
          en: "Build a process excellence culture: empower team members to propose and implement process improvements autonomously.",
          ru: "Формируйте культуру процессного совершенства: дайте сотрудникам возможность самостоятельно предлагать и внедрять улучшения процессов.",
        },
      ],
    },
    {
      level: 5,
      name: "Optimized",
      range: [81, 100],
      description: [
        "Processes are self-optimizing: AI and automation continuously identify and implement improvements with minimal human input.",
        "The organization runs on predictive and prescriptive analytics -- problems are anticipated and resolved before they manifest.",
        "Full digital twin of operations: every process is measurable, every bottleneck is visible, every improvement is quantified.",
        "The company is a benchmark in its industry; competitors study its operational efficiency.",
      ],
      exampleQuotes: [
        {
          en: "Our system flagged a supplier delay risk three days before it would have affected production. We rerouted automatically.",
          ru: "Наша система отметила риск задержки поставщика за три дня до того, как это повлияло бы на производство. Мы автоматически перенаправили.",
        },
        {
          en: "We don't have a process improvement team. Every team member is empowered to optimize their workflows, and our tools surface the opportunities.",
          ru: "У нас нет отдельной команды улучшения процессов. Каждый сотрудник оптимизирует свои рабочие процессы, а инструменты подсвечивают возможности.",
        },
      ],
      scoreTriggers: [
        "AI-driven", "self-optimizing", "predictive", "prescriptive",
        "autonomous", "digital twin", "benchmark", "industry-leading",
        "continuous optimization", "AI suggests improvements",
        "zero manual intervention", "fully autonomous workflows",
      ],
      nextSteps: [
        {
          en: "Share your operational excellence as a competitive advantage: publish case studies, speak at conferences, attract talent through reputation.",
          ru: "Используйте операционное совершенство как конкурентное преимущество: публикуйте кейсы, выступайте на конференциях, привлекайте таланты через репутацию.",
        },
        {
          en: "Explore cutting-edge: agentic AI workflows, autonomous decision systems, and cross-company process orchestration.",
          ru: "Исследуйте передовые технологии: агентные AI-процессы, автономные системы принятия решений и межкорпоративную оркестрацию процессов.",
        },
        {
          en: "Mentor other businesses in your ecosystem -- your suppliers and partners' efficiency directly affects yours.",
          ru: "Наставляйте другие бизнесы в вашей экосистеме -- эффективность ваших поставщиков и партнеров напрямую влияет на вашу.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 2. Sales & Customers
// ---------------------------------------------------------------------------

const salesRubric: DimensionRubric = {
  dimension: "sales",
  dimensionLabel: {
    en: "Sales & Customers",
    ru: "Продажи и клиенты",
  },
  levels: [
    {
      level: 1,
      name: "Critical",
      range: [0, 20],
      description: [
        "No systematic customer acquisition; business depends on word-of-mouth or a single channel with no predictability.",
        "No CRM or lead tracking; customer interactions are unrecorded, forgotten, or scattered across personal notebooks and inboxes.",
        "No understanding of customer lifecycle, churn reasons, or acquisition costs.",
        "Revenue is unpredictable month to month; the founder is often the only salesperson.",
      ],
      exampleQuotes: [
        {
          en: "Customers find us somehow -- mostly referrals. I honestly can't tell you how many leads we get or what our conversion rate is.",
          ru: "Клиенты находят нас как-то -- в основном по рекомендациям. Честно не могу сказать, сколько лидов мы получаем и какая у нас конверсия.",
        },
        {
          en: "I'm basically the entire sales department. If I don't sell, nobody sells.",
          ru: "Я по сути весь отдел продаж. Если я не продаю, никто не продает.",
        },
      ],
      scoreTriggers: [
        "no CRM", "referrals only", "no tracking", "I am the salesperson",
        "no pipeline", "unpredictable revenue", "don't know our numbers",
        "no website", "no marketing", "word of mouth only",
        "no idea about conversion", "customers just come somehow",
      ],
      nextSteps: [
        {
          en: "Set up a free CRM (HubSpot, Bitrix24) and start logging every customer interaction -- even retroactively for the last month.",
          ru: "Настройте бесплатную CRM (HubSpot, Bitrix24) и начните записывать каждое взаимодействие с клиентом -- даже ретроспективно за последний месяц.",
        },
        {
          en: "Define your ideal customer profile: who buys, why they buy, how much they spend, and how they found you.",
          ru: "Определите профиль идеального клиента: кто покупает, почему, сколько тратит и как вас нашел.",
        },
        {
          en: "Create one additional acquisition channel beyond referrals (basic website, social media presence, or local directory listing).",
          ru: "Создайте хотя бы один дополнительный канал привлечения помимо рекомендаций (простой сайт, присутствие в соцсетях или каталог).",
        },
      ],
    },
    {
      level: 2,
      name: "Struggling",
      range: [21, 40],
      description: [
        "Basic CRM or spreadsheet exists but is poorly maintained; data is incomplete, outdated, or duplicated.",
        "Some marketing exists (website, social media) but with no clear strategy, targeting, or measurement.",
        "Sales process is informal: no defined stages, no follow-up cadence, no win/loss analysis.",
        "Customer retention is reactive -- problems are addressed only when customers complain or leave.",
      ],
      exampleQuotes: [
        {
          en: "We have a CRM but it's a mess. Half the leads don't have notes, and nobody updates it after calls.",
          ru: "CRM есть, но там беспорядок. У половины лидов нет заметок, и никто не обновляет после звонков.",
        },
        {
          en: "We post on social media sometimes, but I can't tell you if it actually brings in customers.",
          ru: "Мы иногда постим в соцсетях, но не могу сказать, приводит ли это клиентов.",
        },
      ],
      scoreTriggers: [
        "CRM but messy", "basic website", "no follow-up process",
        "some marketing", "don't track conversion", "lose customers at proposal",
        "no win/loss analysis", "reactive retention", "inconsistent outreach",
        "post sometimes", "spreadsheet for leads", "sales happen organically",
      ],
      nextSteps: [
        {
          en: "Clean your CRM data: deduplicate contacts, fill in missing fields for your top 50 accounts, and set a team rule that every interaction gets logged.",
          ru: "Очистите данные CRM: удалите дубли, заполните пропуски для топ-50 аккаунтов и установите правило, что каждое взаимодействие логируется.",
        },
        {
          en: "Define 3-5 pipeline stages (Lead -> Qualified -> Proposal -> Negotiation -> Closed) and move every deal through them.",
          ru: "Определите 3-5 стадий воронки (Лид -> Квалификация -> Предложение -> Переговоры -> Закрытие) и проводите каждую сделку через них.",
        },
        {
          en: "Set up automated follow-up sequences for new leads -- even a simple 3-email drip campaign dramatically reduces drop-off.",
          ru: "Настройте автоматические follow-up последовательности для новых лидов -- даже простая серия из 3 писем существенно снижает потери.",
        },
      ],
    },
    {
      level: 3,
      name: "Stable",
      range: [41, 60],
      description: [
        "CRM is actively used with defined pipeline stages; most deals are tracked from lead to close.",
        "Multiple acquisition channels exist and produce leads, though attribution is imprecise.",
        "Basic customer segmentation and some personalized outreach; customer satisfaction is measured but not systematically.",
        "Revenue is relatively predictable; the team can forecast within a reasonable margin for the next quarter.",
      ],
      exampleQuotes: [
        {
          en: "We track leads and deals, and our pipeline gives us a decent picture. But our conversion from proposal to close could definitely be better.",
          ru: "Мы отслеживаем лиды и сделки, и воронка дает нам неплохую картину. Но конверсия от предложения до закрытия определенно могла бы быть лучше.",
        },
        {
          en: "We get leads from our website, events, and some ads. I know roughly what works but can't pinpoint exactly.",
          ru: "Мы получаем лиды с сайта, мероприятий и некоторой рекламы. Примерно знаю, что работает, но не могу точно определить.",
        },
      ],
      scoreTriggers: [
        "pipeline stages defined", "track leads and deals", "multiple channels",
        "some personalization", "decent CRM usage", "quarterly forecast",
        "conversion could be better", "customer feedback collected",
        "know roughly what works", "repeat customers exist",
      ],
      nextSteps: [
        {
          en: "Implement lead scoring to prioritize high-value prospects and focus sales effort where it matters most.",
          ru: "Внедрите скоринг лидов для приоритизации наиболее ценных перспектив и фокуса продаж там, где это важнее всего.",
        },
        {
          en: "Set up proper attribution tracking (UTM parameters, CRM source fields) to know exactly which channels drive revenue.",
          ru: "Настройте корректное отслеживание атрибуции (UTM-параметры, поля источника в CRM), чтобы точно знать, какие каналы приносят выручку.",
        },
        {
          en: "Build a structured customer feedback loop: NPS or CSAT surveys after key touchpoints, with automated alerts for detractors.",
          ru: "Постройте структурированный цикл обратной связи: NPS или CSAT опросы после ключевых точек контакта с автоматическими уведомлениями о недовольных.",
        },
      ],
    },
    {
      level: 4,
      name: "Efficient",
      range: [61, 80],
      description: [
        "Sales process is well-oiled: lead scoring, automated nurturing sequences, clear handoffs between marketing and sales.",
        "Customer data is rich and actionable: lifetime value, churn prediction signals, and upsell opportunities are tracked.",
        "Multi-channel attribution is in place; marketing spend is allocated based on measured ROI per channel.",
        "Customer success function exists: proactive outreach, health scores, and structured retention programs.",
      ],
      exampleQuotes: [
        {
          en: "Our CRM scores every lead automatically. My sales team only talks to prospects above a threshold, and our close rate went from 15% to 35%.",
          ru: "Наша CRM автоматически оценивает каждого лида. Отдел продаж работает только с перспективами выше порога, и наш close rate вырос с 15% до 35%.",
        },
        {
          en: "We know that a customer who doesn't log in for 14 days is at risk. Our system alerts the account manager before they churn.",
          ru: "Мы знаем, что клиент, который не заходит 14 дней -- в зоне риска. Система предупреждает менеджера до того, как клиент уйдет.",
        },
      ],
      scoreTriggers: [
        "lead scoring", "automated nurturing", "multi-channel attribution",
        "customer health score", "churn prediction", "LTV tracked",
        "close rate improved", "proactive retention", "upsell tracking",
        "marketing ROI measured", "structured handoffs", "customer success team",
      ],
      nextSteps: [
        {
          en: "Deploy AI-powered personalization: dynamic pricing, personalized product recommendations, and context-aware communication.",
          ru: "Внедрите AI-персонализацию: динамическое ценообразование, персональные рекомендации продуктов и контекстную коммуникацию.",
        },
        {
          en: "Build predictive models for customer lifetime value and allocate acquisition budgets to highest-LTV segments.",
          ru: "Постройте предиктивные модели пожизненной ценности клиента и направьте бюджеты на привлечение сегментов с наивысшим LTV.",
        },
        {
          en: "Create a voice-of-customer program: systematically turn feedback into product/service improvements with closed-loop tracking.",
          ru: "Создайте программу 'голос клиента': систематически превращайте обратную связь в улучшения продукта/сервиса с отслеживанием замкнутого цикла.",
        },
      ],
    },
    {
      level: 5,
      name: "Optimized",
      range: [81, 100],
      description: [
        "Fully personalized customer journeys powered by AI: right message, right channel, right time, automatically.",
        "Predictive and prescriptive analytics drive every sales and marketing decision: what to sell, to whom, when, and at what price.",
        "Customer experience is a competitive moat: Net Promoter Scores in the top quartile, customers actively refer others.",
        "Revenue engine is self-improving: ML models continuously optimize conversion, retention, and expansion.",
      ],
      exampleQuotes: [
        {
          en: "Our AI identifies which existing customers are ready for an upsell, generates a personalized offer, and routes it to the right channel. Our team handles exceptions.",
          ru: "Наш AI определяет, какие клиенты готовы к апселлу, генерирует персональное предложение и направляет его в нужный канал. Команда обрабатывает исключения.",
        },
        {
          en: "Our churn rate is under 3% annually. Customers don't leave because the experience keeps getting better automatically.",
          ru: "Наш churn rate менее 3% в год. Клиенты не уходят, потому что опыт автоматически становится лучше.",
        },
      ],
      scoreTriggers: [
        "AI personalization", "predictive sales", "self-optimizing funnel",
        "sub-5% churn", "NPS above 70", "fully automated customer journey",
        "ML-driven pricing", "customers refer actively",
        "revenue engine self-improving", "prescriptive analytics",
      ],
      nextSteps: [
        {
          en: "Explore ecosystem plays: become a platform that your customers' businesses depend on, creating switching costs through value, not lock-in.",
          ru: "Исследуйте экосистемные стратегии: станьте платформой, от которой зависят бизнесы ваших клиентов, создавая переключательные затраты через ценность.",
        },
        {
          en: "Invest in community and advocacy: turn your best customers into a growth engine through referral programs, case studies, and co-creation.",
          ru: "Инвестируйте в сообщество и адвокатов бренда: превратите лучших клиентов в двигатель роста через реферальные программы, кейсы и совместное создание.",
        },
        {
          en: "Pioneer AI-native customer experiences (conversational commerce, predictive service, autonomous personalization at scale).",
          ru: "Развивайте AI-нативный клиентский опыт (диалоговая коммерция, предиктивный сервис, автономная персонализация в масштабе).",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 3. Finance & Resources
// ---------------------------------------------------------------------------

const financeRubric: DimensionRubric = {
  dimension: "finance",
  dimensionLabel: {
    en: "Finance & Resources",
    ru: "Финансы и ресурсы",
  },
  levels: [
    {
      level: 1,
      name: "Critical",
      range: [0, 20],
      description: [
        "No financial visibility: the owner checks the bank account to see if there's money, no forecasting, no budgeting.",
        "Invoicing is manual and inconsistent; payments are often late because nobody tracks receivables systematically.",
        "No distinction between business and personal finances; accounting is done once a year for tax purposes only.",
        "Cash flow crises are frequent and always a surprise; no runway visibility beyond the current month.",
      ],
      exampleQuotes: [
        {
          en: "I check my bank balance to know how the business is doing. Invoices go out whenever I remember.",
          ru: "Я проверяю баланс на счету, чтобы понять, как дела в бизнесе. Счета выставляю, когда вспомню.",
        },
        {
          en: "We ran out of money last month and I had no idea it was coming. It's always a surprise.",
          ru: "В прошлом месяце у нас закончились деньги, и я понятия не имел, что это произойдет. Это всегда сюрприз.",
        },
      ],
      scoreTriggers: [
        "check bank balance", "no budget", "no forecast", "manual invoicing",
        "cash surprises", "mix personal and business", "no accounting software",
        "late invoices", "no receivables tracking", "tax-time only accounting",
        "don't know our margins", "money disappears",
      ],
      nextSteps: [
        {
          en: "Separate business and personal finances completely. Open a dedicated business account if you haven't already.",
          ru: "Полностью разделите личные и бизнес-финансы. Откройте отдельный бизнес-счет, если еще не сделали.",
        },
        {
          en: "Set up basic accounting software (QuickBooks, Xero, 1C) and commit to recording every transaction within 48 hours.",
          ru: "Настройте базовую бухгалтерскую программу (QuickBooks, Xero, 1С) и записывайте каждую транзакцию в течение 48 часов.",
        },
        {
          en: "Create a simple 13-week cash flow forecast in a spreadsheet. Update it weekly. This single practice prevents most cash crises.",
          ru: "Создайте простой 13-недельный прогноз денежного потока в таблице. Обновляйте еженедельно. Это одно действие предотвращает большинство кассовых кризисов.",
        },
      ],
    },
    {
      level: 2,
      name: "Struggling",
      range: [21, 40],
      description: [
        "Basic accounting software is in use but data entry is behind, incomplete, or done by an outside bookkeeper with limited access.",
        "Invoicing happens but collection is manual and slow; average days-sales-outstanding is high.",
        "Some cost awareness exists but no formal budget; spending decisions are gut-based.",
        "Financial reports are produced monthly or quarterly but are backward-looking only -- no forecasting.",
      ],
      exampleQuotes: [
        {
          en: "Our bookkeeper does the books once a month, but by the time I see the numbers they're already old. I make decisions based on gut.",
          ru: "Бухгалтер делает книги раз в месяц, но к моменту, когда я вижу цифры, они уже устарели. Решения принимаю на интуиции.",
        },
        {
          en: "We send invoices on time, but chasing payments is a nightmare. Some clients pay 60, 90 days late.",
          ru: "Счета выставляем вовремя, но гонять платежи -- кошмар. Некоторые клиенты платят через 60, 90 дней.",
        },
      ],
      scoreTriggers: [
        "bookkeeper does it", "numbers are old", "gut decisions",
        "late payments from clients", "no budget", "high DSO",
        "backward-looking reports", "expenses growing faster than revenue",
        "some accounting software", "don't forecast", "monthly books only",
      ],
      nextSteps: [
        {
          en: "Automate invoice reminders: set up automatic payment follow-ups at 7, 14, and 30 days past due.",
          ru: "Автоматизируйте напоминания о счетах: настройте автоматические follow-up платежей на 7, 14 и 30 дней просрочки.",
        },
        {
          en: "Build a monthly budget with top-line categories and track actual vs. planned. Start simple -- 5-7 categories is enough.",
          ru: "Постройте ежемесячный бюджет с основными категориями и отслеживайте факт vs. план. Начните просто -- 5-7 категорий достаточно.",
        },
        {
          en: "Move bookkeeping to real-time: connect bank feeds to your accounting software so transactions flow in automatically.",
          ru: "Переведите бухгалтерию в реальное время: подключите банковские фиды к бухгалтерской программе для автоматического потока транзакций.",
        },
      ],
    },
    {
      level: 3,
      name: "Stable",
      range: [41, 60],
      description: [
        "Accounting is current and reasonably accurate; the owner can see P&L and balance sheet within a week of month-end.",
        "Budgets exist and are reviewed regularly; major variances are caught and discussed.",
        "Invoicing is partially automated; collection processes are defined but still require manual follow-up for exceptions.",
        "Cash flow is manageable but not optimized; the business can survive a moderate downturn but has limited reserves.",
      ],
      exampleQuotes: [
        {
          en: "We have a budget and review it monthly. I know our margins by product line, but I wish I could see it in real time.",
          ru: "У нас есть бюджет, мы пересматриваем его ежемесячно. Я знаю маржу по линейкам продуктов, но хотел бы видеть это в реальном времени.",
        },
        {
          en: "Cash flow is okay most months, but a big unexpected expense can still cause stress.",
          ru: "Денежный поток в порядке большинство месяцев, но большие непредвиденные расходы все еще вызывают стресс.",
        },
      ],
      scoreTriggers: [
        "monthly P&L review", "budget exists", "margins known",
        "invoicing partially automated", "decent collections",
        "wish for real-time", "manageable cash flow",
        "some financial planning", "know unit economics roughly",
        "accounting is current", "review variances",
      ],
      nextSteps: [
        {
          en: "Integrate accounting with CRM and project management for real-time revenue and cost visibility at the deal/project level.",
          ru: "Интегрируйте бухгалтерию с CRM и управлением проектами для видимости выручки и затрат в реальном времени на уровне сделки/проекта.",
        },
        {
          en: "Implement rolling 12-month financial forecasting using historical trends and pipeline data.",
          ru: "Внедрите скользящее 12-месячное финансовое прогнозирование на основе исторических трендов и данных воронки продаж.",
        },
        {
          en: "Automate expense management: digital receipt capture, automated categorization, and approval workflows.",
          ru: "Автоматизируйте управление расходами: цифровой захват чеков, автоматическая категоризация и процессы утверждения.",
        },
      ],
    },
    {
      level: 4,
      name: "Efficient",
      range: [61, 80],
      description: [
        "Real-time financial dashboards: revenue, costs, margins, and cash position are visible at any moment.",
        "Automated invoicing, payment collection, expense management, and reconciliation. Minimal manual financial admin.",
        "Scenario planning and rolling forecasts inform strategic decisions; 'what-if' analysis is routine.",
        "Unit economics are deeply understood: CAC, LTV, payback period, and contribution margins by segment.",
      ],
      exampleQuotes: [
        {
          en: "I can tell you our blended CAC, LTV by segment, and 90-day cash forecast any time you ask. Our finance stack is fully integrated.",
          ru: "Я могу назвать наш средний CAC, LTV по сегментам и 90-дневный прогноз денежного потока в любой момент. Наш финансовый стек полностью интегрирован.",
        },
        {
          en: "Before we make any big decision, we run three scenarios. It takes minutes, not days, because the data is already there.",
          ru: "Перед любым крупным решением мы прогоняем три сценария. Это занимает минуты, а не дни, потому что данные уже есть.",
        },
      ],
      scoreTriggers: [
        "real-time financial dashboard", "automated invoicing end-to-end",
        "scenario planning", "unit economics tracked", "CAC and LTV known",
        "rolling forecasts", "integrated finance stack",
        "what-if analysis routine", "automated reconciliation",
        "contribution margins by segment", "finance team strategic not clerical",
      ],
      nextSteps: [
        {
          en: "Deploy AI for financial anomaly detection: automatically flag unusual transactions, cost spikes, or margin erosion.",
          ru: "Внедрите AI для обнаружения финансовых аномалий: автоматически отмечайте необычные транзакции, скачки затрат или снижение маржи.",
        },
        {
          en: "Build predictive cash flow models that incorporate seasonality, pipeline probability, and macroeconomic indicators.",
          ru: "Постройте предиктивные модели денежного потока, учитывающие сезонность, вероятность сделок в воронке и макроэкономические индикаторы.",
        },
        {
          en: "Explore dynamic resource allocation: AI-assisted budgeting that shifts resources to highest-ROI activities automatically.",
          ru: "Исследуйте динамическое распределение ресурсов: AI-бюджетирование, автоматически перенаправляющее ресурсы на действия с наивысшим ROI.",
        },
      ],
    },
    {
      level: 5,
      name: "Optimized",
      range: [81, 100],
      description: [
        "Finance operates as a strategic intelligence function: AI continuously optimizes pricing, spending, and investment allocation.",
        "Predictive models anticipate cash flow needs, market shifts, and profitability changes weeks or months ahead.",
        "Autonomous financial operations: invoicing, collections, reconciliation, compliance reporting run with near-zero human touch.",
        "The CFO function is strategic, not operational: time is spent on growth opportunities, M&A analysis, and market positioning.",
      ],
      exampleQuotes: [
        {
          en: "Our AI adjusted pricing for 200 SKUs last quarter based on demand elasticity. Revenue went up 12% with no manual intervention.",
          ru: "Наш AI скорректировал цены для 200 SKU в прошлом квартале на основе эластичности спроса. Выручка выросла на 12% без ручного вмешательства.",
        },
        {
          en: "I haven't processed an invoice manually in two years. Our system handles everything from PO to payment to reconciliation.",
          ru: "Я не обрабатывал счет вручную два года. Наша система обрабатывает все от заказа до оплаты до сверки.",
        },
      ],
      scoreTriggers: [
        "AI-driven pricing", "autonomous finance operations",
        "predictive cash flow", "strategic CFO function",
        "dynamic resource allocation", "zero-touch invoicing",
        "AI anomaly detection active", "continuous financial optimization",
      ],
      nextSteps: [
        {
          en: "Develop proprietary financial intelligence models that create competitive advantages in pricing, timing, and market response.",
          ru: "Разработайте собственные модели финансовой аналитики, создающие конкурентные преимущества в ценообразовании, тайминге и реакции на рынок.",
        },
        {
          en: "Explore decentralized finance (DeFi) and blockchain for supply chain finance, smart contracts, and automated compliance.",
          ru: "Исследуйте DeFi и блокчейн для финансирования цепочки поставок, смарт-контрактов и автоматизированного соответствия.",
        },
        {
          en: "Build financial models that incorporate ESG metrics and sustainability scoring into investment decisions.",
          ru: "Постройте финансовые модели, включающие ESG-метрики и оценку устойчивости в инвестиционные решения.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 4. Team & HR
// ---------------------------------------------------------------------------

const teamRubric: DimensionRubric = {
  dimension: "team",
  dimensionLabel: {
    en: "Team & HR",
    ru: "Команда и кадры",
  },
  levels: [
    {
      level: 1,
      name: "Critical",
      range: [0, 20],
      description: [
        "No HR processes: hiring is ad-hoc, onboarding is 'figure it out', and there are no job descriptions or performance criteria.",
        "Critical knowledge lives in one or two people's heads; if they leave, the business is in serious trouble.",
        "High turnover or inability to hire; the team is overworked, under-skilled, or both.",
        "No training, no development paths, no feedback systems. People burn out and leave without warning.",
      ],
      exampleQuotes: [
        {
          en: "We hire whoever we can find, show them the ropes for a day, and hope they figure it out. Most leave within 3 months.",
          ru: "Нанимаем кого найдем, показываем за день, и надеемся, что разберутся. Большинство уходит в течение 3 месяцев.",
        },
        {
          en: "If our lead developer quit tomorrow, I honestly don't know what we'd do. Everything is in his head.",
          ru: "Если наш ведущий разработчик уволится завтра, я честно не знаю, что мы будем делать. Все у него в голове.",
        },
      ],
      scoreTriggers: [
        "high turnover", "no onboarding", "figure it out",
        "everything in one person's head", "can't find people",
        "no training", "people burn out", "no job descriptions",
        "no performance reviews", "key person dependency critical",
        "hire whoever we can", "leave within months",
      ],
      nextSteps: [
        {
          en: "Write down the top 5 roles in your company with clear responsibilities, must-have skills, and success metrics.",
          ru: "Опишите топ-5 ролей в компании с четкими обязанностями, необходимыми навыками и метриками успеха.",
        },
        {
          en: "Create a basic onboarding checklist (even 1 page) for new hires: what they need to know by Day 1, Week 1, Month 1.",
          ru: "Создайте базовый чеклист адаптации (хотя бы 1 страница): что новый сотрудник должен знать к Дню 1, Неделе 1, Месяцу 1.",
        },
        {
          en: "Start documenting critical knowledge from key people NOW, before it walks out the door. Even recorded video explanations help.",
          ru: "Начните документировать критические знания ключевых сотрудников СЕЙЧАС, пока они не ушли. Даже записанные видео-объяснения помогут.",
        },
      ],
    },
    {
      level: 2,
      name: "Struggling",
      range: [21, 40],
      description: [
        "Basic hiring process exists but it's slow, unstructured, and heavily reliant on the founder's network.",
        "Onboarding is informal; new hires take 2-3 months to become productive because knowledge transfer is ad-hoc.",
        "Some attempt at team structure but roles overlap, responsibilities are unclear, and conflicts arise.",
        "Employee satisfaction is low but unmeasured; people leave for preventable reasons (unclear growth, poor communication).",
      ],
      exampleQuotes: [
        {
          en: "Hiring takes forever. We post a job, get bad candidates, interview for weeks, and then the person we pick takes months to ramp up.",
          ru: "Найм занимает вечность. Размещаем вакансию, получаем слабых кандидатов, собеседуем неделями, и потом выбранный человек месяцами входит в курс.",
        },
        {
          en: "People don't really know where they can grow here. We don't have career paths and I know that frustrates some of them.",
          ru: "Люди не очень понимают, куда расти здесь. У нас нет карьерных путей, и я знаю, что некоторых это расстраивает.",
        },
      ],
      scoreTriggers: [
        "hiring takes forever", "slow onboarding", "roles overlap",
        "no career paths", "rely on founder's network", "informal mentoring",
        "people don't know expectations", "conflicts about responsibilities",
        "training is informal", "no satisfaction surveys", "preventable turnover",
      ],
      nextSteps: [
        {
          en: "Implement structured interviews: define 5-7 questions per role, use a scorecard, and involve at least 2 interviewers.",
          ru: "Внедрите структурированные собеседования: определите 5-7 вопросов по роли, используйте оценочную карту, привлекайте минимум 2 интервьюеров.",
        },
        {
          en: "Create a 30-60-90 day onboarding plan with clear milestones, assigned buddies, and check-in meetings.",
          ru: "Создайте план адаптации на 30-60-90 дней с четкими вехами, назначенными наставниками и встречами для обратной связи.",
        },
        {
          en: "Run a simple anonymous team survey (5-10 questions) to understand what people value, what frustrates them, and what would keep them.",
          ru: "Проведите простой анонимный опрос команды (5-10 вопросов), чтобы понять, что ценят люди, что их раздражает и что их удержит.",
        },
      ],
    },
    {
      level: 3,
      name: "Stable",
      range: [41, 60],
      description: [
        "Hiring is structured with defined processes, job descriptions, and reasonable time-to-fill metrics.",
        "Onboarding programs exist and new hires reach productivity within 4-6 weeks.",
        "Regular performance reviews happen (annually or semi-annually); some development opportunities are provided.",
        "Team communication is organized (Slack, Teams, regular standups) but coordination overhead is still high.",
      ],
      exampleQuotes: [
        {
          en: "We have a decent hiring process and people generally like working here. But I'd say our training is still hit-or-miss.",
          ru: "У нас неплохой процесс найма, и людям в целом нравится работать здесь. Но обучение все еще бессистемное.",
        },
        {
          en: "Performance reviews happen once a year, but they feel like a formality rather than something that drives improvement.",
          ru: "Обзоры производительности проходят раз в год, но ощущаются как формальность, а не как то, что двигает улучшения.",
        },
      ],
      scoreTriggers: [
        "structured hiring", "onboarding exists", "performance reviews annual",
        "reasonable time-to-fill", "people like working here",
        "training hit-or-miss", "Slack or Teams", "regular standups",
        "some development programs", "turnover manageable",
        "reviews feel like formality", "decent but not great",
      ],
      nextSteps: [
        {
          en: "Shift to continuous feedback: quarterly development conversations instead of annual reviews, with real-time recognition tools.",
          ru: "Перейдите на непрерывную обратную связь: квартальные разговоры о развитии вместо годовых обзоров, с инструментами признания в реальном времени.",
        },
        {
          en: "Build individual development plans for each team member aligned with both their aspirations and business needs.",
          ru: "Постройте индивидуальные планы развития для каждого сотрудника, согласованные с их стремлениями и потребностями бизнеса.",
        },
        {
          en: "Implement an HR information system (HRIS) to centralize employee data, track training, and automate routine HR tasks.",
          ru: "Внедрите HR информационную систему (HRIS) для централизации данных сотрудников, отслеживания обучения и автоматизации рутинных HR-задач.",
        },
      ],
    },
    {
      level: 4,
      name: "Efficient",
      range: [61, 80],
      description: [
        "Talent acquisition is data-driven: sourcing channels measured by quality-of-hire, structured competency assessments, employer branding.",
        "Continuous learning culture with dedicated budgets, mentorship programs, and skill gap analysis.",
        "Employee engagement is measured and acted upon; eNPS is tracked, and action plans follow each survey.",
        "HR operations are largely automated: digital onboarding, self-service portals, automated payroll and benefits administration.",
      ],
      exampleQuotes: [
        {
          en: "We know exactly which sourcing channel produces our best hires. Our onboarding is fully digital and new people are productive in 2 weeks.",
          ru: "Мы точно знаем, какой канал подбора дает лучших сотрудников. Адаптация полностью цифровая, и новые люди продуктивны через 2 недели.",
        },
        {
          en: "Every team member has a personal development plan with a learning budget. Our eNPS went from 20 to 55 in one year.",
          ru: "У каждого сотрудника есть личный план развития с бюджетом на обучение. Наш eNPS вырос с 20 до 55 за год.",
        },
      ],
      scoreTriggers: [
        "data-driven hiring", "employer branding", "quality-of-hire tracked",
        "continuous learning culture", "eNPS measured", "engagement surveys actioned",
        "digital onboarding", "self-service HR portal", "skill gap analysis",
        "mentorship programs", "learning budgets", "automated payroll",
      ],
      nextSteps: [
        {
          en: "Deploy AI in talent management: predictive attrition models, AI-assisted skill matching, and personalized learning recommendations.",
          ru: "Внедрите AI в управление талантами: предиктивные модели оттока, AI-подбор навыков и персональные рекомендации обучения.",
        },
        {
          en: "Build an internal talent marketplace where employees can find projects, mentors, and growth opportunities across the organization.",
          ru: "Создайте внутренний рынок талантов, где сотрудники могут находить проекты, наставников и возможности роста по всей организации.",
        },
        {
          en: "Implement workforce planning models that project skill needs 12-18 months ahead based on business strategy.",
          ru: "Внедрите модели планирования рабочей силы, прогнозирующие потребности в навыках на 12-18 месяцев вперед на основе бизнес-стратегии.",
        },
      ],
    },
    {
      level: 5,
      name: "Optimized",
      range: [81, 100],
      description: [
        "The organization is a talent magnet: employer brand is strong, top candidates seek it out, referral rates are high.",
        "AI-augmented workforce: routine tasks are automated, people focus on creative, strategic, and interpersonal work.",
        "Adaptive organization: team structures flex based on projects and priorities; skills, not titles, drive assignments.",
        "Culture of continuous reinvention: the team actively upskills for emerging technologies and evolving business needs.",
      ],
      exampleQuotes: [
        {
          en: "Our best hires come from employee referrals and inbound applications. We rarely need to headhunt -- people want to work here.",
          ru: "Лучшие сотрудники приходят по рекомендациям и входящим заявкам. Нам редко нужно хантить -- люди хотят работать здесь.",
        },
        {
          en: "Every employee spends at least 10% of their time on learning and experimentation. It's not a perk, it's how we stay ahead.",
          ru: "Каждый сотрудник тратит минимум 10% времени на обучение и эксперименты. Это не бонус, а то, как мы остаемся впереди.",
        },
      ],
      scoreTriggers: [
        "talent magnet", "strong employer brand", "AI-augmented workforce",
        "adaptive organization", "skills-based assignments",
        "continuous reinvention", "10%+ time on learning",
        "high referral rate", "culture of experimentation",
        "people want to work here", "autonomous teams",
      ],
      nextSteps: [
        {
          en: "Lead industry conversations on the future of work: publish your organizational innovations, host talent summits, mentor other companies.",
          ru: "Лидируйте в отраслевых обсуждениях будущего работы: публикуйте организационные инновации, проводите саммиты, наставляйте другие компании.",
        },
        {
          en: "Explore emerging models: 4-day work weeks, async-first, global talent pools, and AI copilots for every role.",
          ru: "Исследуйте новые модели: 4-дневная рабочая неделя, async-first, глобальные пулы талантов и AI-копилоты для каждой роли.",
        },
        {
          en: "Build organizational resilience through radical knowledge sharing: every process, decision, and lesson learned is captured and accessible.",
          ru: "Стройте организационную устойчивость через радикальный обмен знаниями: каждый процесс, решение и урок фиксируется и доступен.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 5. Data & Technology
// ---------------------------------------------------------------------------

const dataTechRubric: DimensionRubric = {
  dimension: "data_technology",
  dimensionLabel: {
    en: "Data & Technology",
    ru: "Данные и технологии",
  },
  levels: [
    {
      level: 1,
      name: "Critical",
      range: [0, 20],
      description: [
        "No centralized data: information lives in spreadsheets, emails, paper files, and people's heads across disconnected silos.",
        "No IT strategy; technology is adopted reactively ('we bought it because someone saw an ad').",
        "Data quality is unknown or poor; duplicate records, missing fields, and conflicting versions are the norm.",
        "No data security practices; no backups, no access controls, passwords shared openly.",
      ],
      exampleQuotes: [
        {
          en: "Our data is everywhere -- spreadsheets, emails, notebooks. If you ask me how many active customers we have, I'd give you a different number each time.",
          ru: "Наши данные повсюду -- таблицы, почта, блокноты. Если спросите, сколько у нас активных клиентов, каждый раз дам разное число.",
        },
        {
          en: "We don't back anything up. I know we should but we just haven't gotten around to it.",
          ru: "У нас нет резервного копирования. Знаю, что надо, но просто руки не дошли.",
        },
      ],
      scoreTriggers: [
        "data everywhere", "no backups", "no IT strategy",
        "spreadsheets and email", "don't know our data",
        "no security", "shared passwords", "paper files",
        "no database", "bought random tools", "nothing connects",
        "different numbers each time", "no data governance",
      ],
      nextSteps: [
        {
          en: "Audit your tools: list every software, spreadsheet, and data source your business uses. Identify overlap and gaps.",
          ru: "Проведите аудит инструментов: перечислите все ПО, таблицы и источники данных в бизнесе. Найдите пересечения и пробелы.",
        },
        {
          en: "Set up automated cloud backups for all business-critical data TODAY. Use Google Workspace, Microsoft 365, or a simple cloud backup service.",
          ru: "Настройте автоматическое облачное резервное копирование для всех критических данных СЕГОДНЯ. Используйте Google Workspace, Microsoft 365 или простой облачный бэкап.",
        },
        {
          en: "Consolidate customer data into a single source of truth (even a well-structured spreadsheet is better than scattered data).",
          ru: "Консолидируйте данные клиентов в единый источник истины (даже хорошо структурированная таблица лучше разрозненных данных).",
        },
      ],
    },
    {
      level: 2,
      name: "Struggling",
      range: [21, 40],
      description: [
        "Some core systems exist (accounting, basic CRM) but they don't talk to each other; manual data transfer between systems.",
        "Data is collected but rarely analyzed; reports are created manually and infrequently.",
        "Technology decisions are made without a plan; tools are adopted by individuals rather than the organization.",
        "Basic security is in place (passwords, antivirus) but no formal security policy or incident response plan.",
      ],
      exampleQuotes: [
        {
          en: "We have a CRM and accounting software, but I export from one and import into the other manually. It takes hours every week.",
          ru: "У нас есть CRM и бухгалтерия, но я экспортирую из одной и вручную импортирую в другую. Это занимает часы каждую неделю.",
        },
        {
          en: "Everyone on the team uses different tools for the same thing. Some use Notion, some use Google Docs, some use Trello.",
          ru: "Все в команде используют разные инструменты для одного и того же. Кто-то Notion, кто-то Google Docs, кто-то Trello.",
        },
      ],
      scoreTriggers: [
        "systems don't connect", "manual data transfer", "export import",
        "tools not standardized", "everyone uses different tools",
        "basic security only", "data collected but not analyzed",
        "reports created manually", "no integration", "tech debt growing",
        "fragmented tool landscape", "no IT person",
      ],
      nextSteps: [
        {
          en: "Standardize your tool stack: pick ONE project management, ONE communication, and ONE document tool. Migrate everyone within 30 days.",
          ru: "Стандартизируйте стек инструментов: выберите ОДНО решение для проектов, ОДНО для коммуникации, ОДНО для документов. Мигрируйте всех за 30 дней.",
        },
        {
          en: "Connect your top 2-3 systems using integration platforms (Zapier, Make, native integrations). Start with CRM-to-accounting.",
          ru: "Свяжите 2-3 основные системы через интеграционные платформы (Zapier, Make, нативные интеграции). Начните с CRM-бухгалтерия.",
        },
        {
          en: "Create a basic IT security policy: unique passwords (use a password manager), 2FA on all business accounts, regular backup verification.",
          ru: "Создайте базовую политику ИТ-безопасности: уникальные пароли (менеджер паролей), 2FA на всех бизнес-аккаунтах, регулярная проверка бэкапов.",
        },
      ],
    },
    {
      level: 3,
      name: "Stable",
      range: [41, 60],
      description: [
        "Core systems are integrated; most key data flows automatically between CRM, accounting, and operational tools.",
        "Some analytics capabilities: dashboards for key metrics, regular reporting cadence, basic data-driven decisions.",
        "Standardized tool stack with organization-wide adoption; IT decisions follow a basic evaluation process.",
        "Cloud-based infrastructure with automated backups, access controls, and basic security monitoring.",
      ],
      exampleQuotes: [
        {
          en: "Our CRM syncs with our accounting and we have a decent dashboard. But advanced analytics? We're not there yet.",
          ru: "Наша CRM синхронизирована с бухгалтерией, и у нас неплохой дашборд. Но продвинутая аналитика? До этого мы еще не дошли.",
        },
        {
          en: "We standardized on Google Workspace and HubSpot. Everyone uses the same tools now, which made a huge difference.",
          ru: "Мы стандартизировались на Google Workspace и HubSpot. Теперь все используют одни инструменты, и это сильно помогло.",
        },
      ],
      scoreTriggers: [
        "systems integrated", "some analytics", "dashboard exists",
        "standardized tools", "cloud-based", "automated backups",
        "basic data-driven decisions", "regular reporting",
        "CRM synced", "not advanced analytics yet",
        "tool evaluation process", "access controls in place",
      ],
      nextSteps: [
        {
          en: "Build a data warehouse or unified analytics layer: bring all your data sources into one place for cross-functional analysis.",
          ru: "Постройте хранилище данных или единый аналитический слой: объедините все источники данных в одном месте для кросс-функционального анализа.",
        },
        {
          en: "Invest in data literacy: train key team members on interpreting dashboards, asking data questions, and basic self-service analytics.",
          ru: "Инвестируйте в дата-грамотность: обучите ключевых сотрудников интерпретации дашбордов, формулированию вопросов к данным и базовой самостоятельной аналитике.",
        },
        {
          en: "Implement a formal IT security framework: regular vulnerability assessments, incident response plan, employee security training.",
          ru: "Внедрите формальную систему ИТ-безопасности: регулярные оценки уязвимостей, план реагирования на инциденты, обучение сотрудников безопасности.",
        },
      ],
    },
    {
      level: 4,
      name: "Efficient",
      range: [61, 80],
      description: [
        "Unified data platform: single source of truth across the organization with real-time data pipelines and governed data quality.",
        "Advanced analytics in regular use: cohort analysis, predictive models, A/B testing inform business decisions.",
        "Technology is a strategic enabler: IT roadmap aligned with business strategy, build-vs-buy decisions are deliberate.",
        "Robust cybersecurity: regular penetration testing, employee security training, compliance certifications (SOC2, ISO 27001).",
      ],
      exampleQuotes: [
        {
          en: "We have a data warehouse that everyone queries. Our product team runs A/B tests weekly and our marketing uses predictive models for targeting.",
          ru: "У нас есть хранилище данных, к которому все обращаются. Продуктовая команда проводит A/B-тесты еженедельно, а маркетинг использует предиктивные модели.",
        },
        {
          en: "Our IT roadmap is part of our business strategy. Every major initiative has a tech component planned from the start.",
          ru: "Наш IT-роадмап -- часть бизнес-стратегии. У каждой крупной инициативы технологический компонент запланирован с самого начала.",
        },
      ],
      scoreTriggers: [
        "data warehouse", "single source of truth", "predictive models",
        "A/B testing", "IT roadmap aligned", "build vs buy deliberate",
        "penetration testing", "compliance certifications",
        "data quality governance", "real-time data pipelines",
        "advanced analytics regular use", "security training",
      ],
      nextSteps: [
        {
          en: "Deploy AI/ML across the organization: from customer-facing (chatbots, recommendations) to internal (process mining, anomaly detection).",
          ru: "Разверните AI/ML по всей организации: от клиентских (чатботы, рекомендации) до внутренних (процесс-майнинг, обнаружение аномалий).",
        },
        {
          en: "Build a data mesh or federated data architecture: enable each team to own and share their data as a product.",
          ru: "Постройте data mesh или федеративную архитектуру данных: дайте каждой команде владеть и делиться своими данными как продуктом.",
        },
        {
          en: "Implement AI governance: model monitoring, bias detection, explainability frameworks, and responsible AI policies.",
          ru: "Внедрите управление AI: мониторинг моделей, обнаружение предвзятости, фреймворки объяснимости и политики ответственного AI.",
        },
      ],
    },
    {
      level: 5,
      name: "Optimized",
      range: [81, 100],
      description: [
        "AI-first organization: machine learning and AI are embedded in every major business process, product, and decision.",
        "Data is a strategic asset and competitive moat: proprietary datasets, unique data products, and data-driven innovation.",
        "Technology infrastructure is self-healing, auto-scaling, and continuously optimized through AI-driven operations (AIOps).",
        "The company creates technology and data advantages that competitors cannot easily replicate.",
      ],
      exampleQuotes: [
        {
          en: "Our data is our moat. We've built proprietary models trained on years of industry-specific data that no competitor can replicate quickly.",
          ru: "Наши данные -- наш ров. Мы построили проприетарные модели, обученные на годах отраслевых данных, которые конкуренты не смогут быстро повторить.",
        },
        {
          en: "Our infrastructure scales automatically based on demand. We haven't had a manual infrastructure intervention in months.",
          ru: "Наша инфраструктура масштабируется автоматически по спросу. У нас не было ручного вмешательства в инфраструктуру уже месяцы.",
        },
      ],
      scoreTriggers: [
        "AI-first", "data as moat", "proprietary models",
        "AIOps", "self-healing infrastructure", "data products",
        "ML in every process", "AI governance mature",
        "technology competitive advantage", "auto-scaling",
      ],
      nextSteps: [
        {
          en: "Explore frontier technologies: large language models for domain-specific applications, agentic AI systems, and autonomous operations.",
          ru: "Исследуйте передовые технологии: большие языковые модели для отраслевых приложений, агентные AI-системы и автономные операции.",
        },
        {
          en: "Monetize your data and technology capabilities: offer data products, APIs, or technology services to your ecosystem.",
          ru: "Монетизируйте данные и технологические возможности: предлагайте дата-продукты, API или технологические сервисы вашей экосистеме.",
        },
        {
          en: "Contribute to open-source and industry standards: shape the future of technology in your industry while attracting top talent.",
          ru: "Вносите вклад в открытый код и отраслевые стандарты: формируйте будущее технологий в вашей отрасли, привлекая лучших специалистов.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 6. Culture & Change Readiness
// ---------------------------------------------------------------------------

const cultureRubric: DimensionRubric = {
  dimension: "culture_change",
  dimensionLabel: {
    en: "Culture & Change Readiness",
    ru: "Культура и готовность к изменениям",
  },
  levels: [
    {
      level: 1,
      name: "Critical",
      range: [0, 20],
      description: [
        "Deep resistance to change: 'we've always done it this way' is the dominant mindset across the organization.",
        "No innovation culture; new ideas are dismissed, and experimentation is seen as wasteful or risky.",
        "Leadership is not digitally literate and does not see technology as relevant to the business.",
        "Siloed departments that do not collaborate; information hoarding is common.",
      ],
      exampleQuotes: [
        {
          en: "My team pushes back on every new tool or process change. They say 'if it ain't broke, don't fix it.'",
          ru: "Моя команда сопротивляется каждому новому инструменту или изменению процесса. Говорят: 'работает -- не трогай.'",
        },
        {
          en: "I don't really understand AI or digital tools, and honestly I'm not sure we need them.",
          ru: "Я не очень понимаю AI или цифровые инструменты, и честно не уверен, что они нам нужны.",
        },
      ],
      scoreTriggers: [
        "always done it this way", "resist change", "don't need technology",
        "pushback on new tools", "leadership not digital",
        "silos", "no collaboration", "afraid of technology",
        "don't see the point", "if it ain't broke", "waste of money",
        "team won't adopt", "no innovation",
      ],
      nextSteps: [
        {
          en: "Start with a small, visible quick win: automate one painful task and show the team the time saved. Seeing is believing.",
          ru: "Начните с маленькой, видимой быстрой победы: автоматизируйте одну болезненную задачу и покажите команде сэкономленное время. Увидеть -- значит поверить.",
        },
        {
          en: "Invest in digital literacy for leadership first: a half-day workshop on how AI and automation work, focused on business outcomes not technology.",
          ru: "Инвестируйте в цифровую грамотность руководства: полудневный воркшоп о том, как работают AI и автоматизация, с фокусом на бизнес-результаты, а не технологии.",
        },
        {
          en: "Find your internal champions: identify 1-2 team members who are naturally curious about technology and empower them to pilot small improvements.",
          ru: "Найдите внутренних чемпионов: определите 1-2 сотрудников, которые по натуре любопытны к технологиям, и дайте им возможность пилотировать небольшие улучшения.",
        },
      ],
    },
    {
      level: 2,
      name: "Struggling",
      range: [21, 40],
      description: [
        "Leadership recognizes the need for change but struggles to drive it; change initiatives stall or revert.",
        "Some team members are open to digital tools but adoption is uneven; early adopters vs. resisters create friction.",
        "No formal change management approach: new tools are rolled out with minimal training or communication.",
        "Failure is punished rather than treated as a learning opportunity; fear of mistakes stifles experimentation.",
      ],
      exampleQuotes: [
        {
          en: "I know we need to modernize, but every time we try to introduce something new, half the team ignores it after a week.",
          ru: "Я знаю, что нам нужно модернизироваться, но каждый раз, когда пытаемся ввести что-то новое, половина команды игнорирует через неделю.",
        },
        {
          en: "We tried implementing a new tool last year. It was a disaster -- no training, no buy-in, everyone went back to the old way.",
          ru: "Мы пытались внедрить новый инструмент в прошлом году. Это был провал -- никакого обучения, никакого buy-in, все вернулись к старому.",
        },
      ],
      scoreTriggers: [
        "know we need to change", "adoption is uneven", "initiatives stall",
        "no training on new tools", "half the team ignores",
        "tried and failed", "fear of mistakes", "no change management",
        "revert to old ways", "some are open some resist",
        "leadership wants change but", "change fatigue",
      ],
      nextSteps: [
        {
          en: "Adopt a structured change approach: for every new tool, define Why (problem it solves), What (changes needed), How (training plan), and Who (champion).",
          ru: "Примените структурированный подход: для каждого нового инструмента определите Зачем (проблема), Что (изменения), Как (план обучения) и Кто (чемпион).",
        },
        {
          en: "Celebrate and publicize small wins: when a new process saves time, share the numbers with the whole team.",
          ru: "Празднуйте и публикуйте маленькие победы: когда новый процесс экономит время, поделитесь цифрами со всей командой.",
        },
        {
          en: "Introduce 'safe-to-fail' experiments: small, low-risk pilots where the team can try new approaches without fear of punishment.",
          ru: "Введите 'безопасные для провала' эксперименты: маленькие, низкорисковые пилоты, где команда может пробовать новое без страха наказания.",
        },
      ],
    },
    {
      level: 3,
      name: "Stable",
      range: [41, 60],
      description: [
        "Leadership actively supports digital transformation and communicates its importance consistently.",
        "Most of the team is open to change; new tools are adopted with some training and reasonable ramp-up time.",
        "Some cross-functional collaboration exists; departments share information but coordination is still effort.",
        "Basic change management practices: communication plans, training sessions, designated tool champions.",
      ],
      exampleQuotes: [
        {
          en: "We're getting better at rolling out new tools. We assign a champion, do training sessions, and most people adopt it. But it's still hard work.",
          ru: "Мы становимся лучше во внедрении новых инструментов. Назначаем чемпиона, проводим тренинги, и большинство принимает. Но это все еще трудно.",
        },
        {
          en: "Our leadership talks about digital transformation regularly. The team gets it in principle, but execution is inconsistent.",
          ru: "Руководство регулярно говорит о цифровой трансформации. Команда понимает в принципе, но исполнение непоследовательно.",
        },
      ],
      scoreTriggers: [
        "leadership supports change", "most team is open",
        "assign champions", "training sessions", "getting better at rollouts",
        "some cross-functional collaboration", "communication plans",
        "hard work but improving", "understand digital importance",
        "execution inconsistent", "change management basics",
      ],
      nextSteps: [
        {
          en: "Formalize innovation time: dedicate 1-2 hours per week for teams to explore new tools, processes, or ideas without pressure.",
          ru: "Формализуйте время на инновации: выделите 1-2 часа в неделю для команд, чтобы исследовать новые инструменты, процессы или идеи без давления.",
        },
        {
          en: "Create a 'digital transformation scoreboard': track adoption metrics, time saved, and improvements publicly.",
          ru: "Создайте 'табло цифровой трансформации': публично отслеживайте метрики принятия, сэкономленное время и улучшения.",
        },
        {
          en: "Build cross-functional improvement teams: pair people from different departments to solve shared problems together.",
          ru: "Создайте кросс-функциональные команды улучшений: объедините людей из разных отделов для совместного решения общих проблем.",
        },
      ],
    },
    {
      level: 4,
      name: "Efficient",
      range: [61, 80],
      description: [
        "Innovation is expected, not exceptional: teams regularly propose and implement improvements autonomously.",
        "Strong change management capability: structured rollouts, measured adoption, continuous feedback loops.",
        "Psychological safety is high: people experiment, fail, learn, and share openly without fear.",
        "Cross-functional collaboration is natural; projects routinely involve multiple departments working together seamlessly.",
      ],
      exampleQuotes: [
        {
          en: "My team doesn't wait for me to suggest improvements. Last month, three different people proposed process changes and implemented them within a week.",
          ru: "Моя команда не ждет, пока я предложу улучшения. В прошлом месяце три разных человека предложили изменения процессов и внедрили их за неделю.",
        },
        {
          en: "When we roll out something new, we have a playbook: communicate why, train early adopters, measure adoption, iterate. It just works now.",
          ru: "Когда мы внедряем что-то новое, у нас есть плейбук: объяснить зачем, обучить ранних последователей, измерить принятие, итерировать. Это просто работает.",
        },
      ],
      scoreTriggers: [
        "teams propose improvements autonomously", "structured change management",
        "psychological safety high", "cross-functional natural",
        "experimentation encouraged", "fail and learn openly",
        "change playbook exists", "measured adoption",
        "improvement is expected", "innovation bottom-up",
      ],
      nextSteps: [
        {
          en: "Scale the innovation culture: create internal hackathons, innovation challenges, or idea marketplaces with real follow-through.",
          ru: "Масштабируйте культуру инноваций: создайте внутренние хакатоны, инновационные челленджи или рынки идей с реальной реализацией.",
        },
        {
          en: "Develop change leadership capabilities deeper into the organization: train team leads, not just senior management.",
          ru: "Развивайте навыки лидерства изменений глубже в организации: обучайте руководителей команд, а не только топ-менеджмент.",
        },
        {
          en: "Build external innovation connections: partner with startups, universities, or industry groups to bring outside perspectives in.",
          ru: "Стройте внешние инновационные связи: партнерствуйте со стартапами, университетами или отраслевыми группами для привлечения внешних перспектив.",
        },
      ],
    },
    {
      level: 5,
      name: "Optimized",
      range: [81, 100],
      description: [
        "Continuous reinvention is the organizational DNA: the company proactively disrupts itself before competitors do.",
        "Every employee is a change agent: digital fluency, experimental mindset, and improvement orientation are universal.",
        "The organization learns at the speed of the market: new insights are rapidly turned into new capabilities.",
        "External recognition as an innovative, forward-thinking organization that attracts talent and partnerships.",
      ],
      exampleQuotes: [
        {
          en: "We don't have a 'digital transformation initiative' because transformation is just how we work. Everyone is always looking for a better way.",
          ru: "У нас нет 'инициативы цифровой трансформации', потому что трансформация -- это просто наш способ работы. Каждый всегда ищет лучший путь.",
        },
        {
          en: "Last quarter we pivoted our entire service delivery model in two weeks because the team had the mindset and tools to move fast.",
          ru: "В прошлом квартале мы перестроили всю модель предоставления услуг за две недели, потому что у команды был правильный майндсет и инструменты для быстрого движения.",
        },
      ],
      scoreTriggers: [
        "transformation is how we work", "self-disruption",
        "every employee change agent", "organization learns fast",
        "externally recognized innovative", "continuous reinvention",
        "pivot quickly", "digital fluency universal",
        "attract talent through culture", "industry thought leader",
      ],
      nextSteps: [
        {
          en: "Shape your industry: lead standards bodies, publish thought leadership, mentor ecosystem partners on change readiness.",
          ru: "Формируйте свою отрасль: лидируйте в стандартах, публикуйте мысли-лидерство, наставляйте партнеров в готовности к изменениям.",
        },
        {
          en: "Build organizational ambidexterity: maintain operational excellence while simultaneously exploring radically new business models.",
          ru: "Постройте организационную амбидекстрию: поддерживайте операционное совершенство, одновременно исследуя радикально новые бизнес-модели.",
        },
        {
          en: "Invest in future-sensing capabilities: scenario planning, trend analysis, and strategic foresight to anticipate disruptions 3-5 years ahead.",
          ru: "Инвестируйте в способности прогнозирования: сценарное планирование, анализ трендов и стратегическое предвидение для предвосхищения перемен на 3-5 лет вперед.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 7. Risks & Compliance
// ---------------------------------------------------------------------------

const risksRubric: DimensionRubric = {
  dimension: "risks",
  dimensionLabel: {
    en: "Risks & Compliance",
    ru: "Риски и соответствие",
  },
  levels: [
    {
      level: 1,
      name: "Critical",
      range: [0, 20],
      description: [
        "No risk awareness: the business operates blind to its vulnerabilities until a crisis hits.",
        "No compliance tracking: regulatory requirements are unknown, ignored, or addressed only when penalized.",
        "No business continuity planning: a single point of failure (key person, single supplier, one client) could shut the business down.",
        "No data protection: customer data, financial records, and intellectual property are unprotected and disorganized.",
      ],
      exampleQuotes: [
        {
          en: "I don't really think about risks until something goes wrong. We've been lucky so far.",
          ru: "Я не думаю о рисках, пока что-то не идет не так. Нам пока везло.",
        },
        {
          en: "If our biggest client left tomorrow, I honestly don't know how we'd survive. They're 60% of our revenue.",
          ru: "Если наш крупнейший клиент уйдет завтра, честно не знаю, как мы выживем. Это 60% нашей выручки.",
        },
      ],
      scoreTriggers: [
        "don't think about risks", "been lucky", "no plan",
        "one client is majority revenue", "no backup plan",
        "no compliance", "no data protection", "single point of failure",
        "would be devastated if", "no insurance", "never thought about it",
        "probably should worry about", "hope it doesn't happen",
      ],
      nextSteps: [
        {
          en: "List your top 5 business risks RIGHT NOW: what could put you out of business tomorrow? Single-client dependency, key-person risk, data loss, regulatory fines, supply chain disruption.",
          ru: "Составьте список топ-5 бизнес-рисков ПРЯМО СЕЙЧАС: что может закрыть ваш бизнес завтра? Зависимость от одного клиента, риск ключевого сотрудника, потеря данных, штрафы, срыв поставок.",
        },
        {
          en: "If one client is >30% of revenue, start actively diversifying immediately. This is an existential risk.",
          ru: "Если один клиент -- более 30% выручки, начните активно диверсифицировать немедленно. Это экзистенциальный риск.",
        },
        {
          en: "Check your basic compliance requirements: GDPR/data protection, industry-specific regulations, tax obligations, employment law basics.",
          ru: "Проверьте базовые требования по соответствию: GDPR/защита данных, отраслевые регуляции, налоговые обязательства, основы трудового права.",
        },
      ],
    },
    {
      level: 2,
      name: "Struggling",
      range: [21, 40],
      description: [
        "Some risk awareness but no systematic approach; risks are discussed informally but not documented or monitored.",
        "Basic compliance is handled (tax filings, essential licenses) but it's reactive and stressful.",
        "Known single points of failure exist but mitigation is 'on the to-do list'; no disaster recovery plan.",
        "Insurance exists but may be inadequate; coverage hasn't been reviewed against current business reality.",
      ],
      exampleQuotes: [
        {
          en: "I know our risks -- key person dependency, client concentration -- but we just haven't had time to address them properly.",
          ru: "Я знаю наши риски -- зависимость от ключевых людей, концентрация клиентов -- но просто не хватило времени на их решение.",
        },
        {
          en: "Compliance is stressful. We handle the basics but I'm never sure we're fully covered. We had a scare last year.",
          ru: "Комплаенс -- это стресс. Мы справляемся с основами, но никогда не уверен, что все покрыто. В прошлом году была паника.",
        },
      ],
      scoreTriggers: [
        "know the risks but", "no time to address", "on the to-do list",
        "basic compliance only", "stressful", "had a scare",
        "insurance might be outdated", "no disaster recovery",
        "informal risk discussion", "haven't addressed",
        "single points of failure known", "reactive compliance",
      ],
      nextSteps: [
        {
          en: "Create a simple risk register: 5-10 rows listing risk, likelihood (H/M/L), impact (H/M/L), current mitigation, and owner. Review monthly.",
          ru: "Создайте простой реестр рисков: 5-10 строк с риском, вероятностью (В/С/Н), влиянием (В/С/Н), текущей митигацией и ответственным. Пересматривайте ежемесячно.",
        },
        {
          en: "Write a basic business continuity plan: what happens if your office is unavailable, your server crashes, or a key person is suddenly absent?",
          ru: "Напишите базовый план непрерывности бизнеса: что произойдет, если офис недоступен, сервер упал или ключевой сотрудник внезапно отсутствует?",
        },
        {
          en: "Review insurance coverage with a broker who understands your industry. Ensure cyber liability is included.",
          ru: "Пересмотрите страховое покрытие с брокером, который понимает вашу отрасль. Убедитесь, что киберстрахование включено.",
        },
      ],
    },
    {
      level: 3,
      name: "Stable",
      range: [41, 60],
      description: [
        "Risk register exists and is reviewed periodically; major risks are identified with basic mitigation plans.",
        "Compliance processes are defined and generally followed; deadlines are tracked but some manual effort remains.",
        "Business continuity plan exists for major scenarios; some redundancy in critical systems and roles.",
        "Data protection basics are covered: privacy policy, data handling procedures, basic access controls.",
      ],
      exampleQuotes: [
        {
          en: "We have a risk register that we review quarterly. Our compliance is handled but it takes too much manual effort.",
          ru: "У нас есть реестр рисков, который мы пересматриваем ежеквартально. Комплаенс обеспечен, но требует слишком много ручных усилий.",
        },
        {
          en: "We have a business continuity plan, but I'm not 100% sure it would work if we actually needed it. We've never tested it.",
          ru: "У нас есть план непрерывности бизнеса, но я не на 100% уверен, что он сработает. Мы никогда его не тестировали.",
        },
      ],
      scoreTriggers: [
        "risk register exists", "quarterly review", "compliance processes defined",
        "business continuity plan exists", "never tested BCP",
        "too much manual compliance effort", "privacy policy in place",
        "basic mitigation plans", "some redundancy",
        "managed but could be better", "compliance deadlines tracked",
      ],
      nextSteps: [
        {
          en: "Test your business continuity plan: run a tabletop exercise simulating your top 3 risks. You'll find gaps you didn't know existed.",
          ru: "Протестируйте план непрерывности: проведите настольное упражнение, имитирующее топ-3 риска. Вы обнаружите пробелы, о которых не знали.",
        },
        {
          en: "Automate compliance monitoring: use tools that track regulatory changes, flag deadlines, and auto-generate required reports.",
          ru: "Автоматизируйте мониторинг комплаенса: используйте инструменты, отслеживающие регуляторные изменения, дедлайны и автогенерацию отчетов.",
        },
        {
          en: "Implement vendor risk management: assess your key suppliers and technology providers for their own resilience and security.",
          ru: "Внедрите управление рисками поставщиков: оцените ваших ключевых поставщиков и технологических провайдеров на их устойчивость и безопасность.",
        },
      ],
    },
    {
      level: 4,
      name: "Efficient",
      range: [61, 80],
      description: [
        "Proactive risk management: risks are anticipated, monitored continuously, and mitigation is pre-planned.",
        "Compliance is largely automated: regulatory tracking tools, automated reporting, and audit trail systems.",
        "Business continuity is tested regularly; failover systems, backup suppliers, and succession plans are documented and drilled.",
        "Cybersecurity is mature: regular assessments, incident response team, employee training, and compliance certifications.",
      ],
      exampleQuotes: [
        {
          en: "We run quarterly BCP drills and our compliance reporting is 90% automated. I sleep better knowing we're prepared.",
          ru: "Мы проводим квартальные учения BCP, и наша отчетность по комплаенсу автоматизирована на 90%. Сплю спокойнее, зная, что мы готовы.",
        },
        {
          en: "Our risk dashboard updates in real-time. When a new regulation drops, our system flags affected processes within hours.",
          ru: "Наш дашборд рисков обновляется в реальном времени. Когда выходит новое регулирование, система отмечает затронутые процессы в течение часов.",
        },
      ],
      scoreTriggers: [
        "proactive risk management", "compliance automated",
        "BCP tested regularly", "failover systems", "succession plans",
        "cybersecurity mature", "incident response team",
        "risk dashboard real-time", "regulatory tracking automated",
        "audit trail systems", "quarterly drills", "prepared",
      ],
      nextSteps: [
        {
          en: "Deploy AI for risk prediction: use machine learning to identify emerging risks from market data, news, and operational patterns.",
          ru: "Разверните AI для предсказания рисков: используйте ML для выявления новых рисков из рыночных данных, новостей и операционных паттернов.",
        },
        {
          en: "Build a risk-aware culture: embed risk thinking into project planning, product development, and strategic decision-making at every level.",
          ru: "Стройте риск-ориентированную культуру: встройте мышление о рисках в планирование проектов, разработку продуктов и стратегические решения на каждом уровне.",
        },
        {
          en: "Pursue advanced certifications (ISO 27001, SOC2 Type II) that demonstrate maturity to enterprise clients and partners.",
          ru: "Получите продвинутые сертификации (ISO 27001, SOC2 Type II), демонстрирующие зрелость для корпоративных клиентов и партнеров.",
        },
      ],
    },
    {
      level: 5,
      name: "Optimized",
      range: [81, 100],
      description: [
        "Risk intelligence is a competitive advantage: the organization anticipates and adapts to threats faster than peers.",
        "Fully automated compliance: regulatory changes are detected, impact-assessed, and operationalized with minimal human intervention.",
        "Organizational resilience is tested and proven: the company has successfully navigated major disruptions and emerged stronger.",
        "Zero-trust security architecture with AI-driven threat detection, automated response, and continuous compliance validation.",
      ],
      exampleQuotes: [
        {
          en: "When the pandemic hit, we were fully operational within 24 hours because our BCP was designed for exactly this kind of disruption.",
          ru: "Когда началась пандемия, мы были полностью операционны в течение 24 часов, потому что наш BCP был спроектирован именно для такого типа перебоев.",
        },
        {
          en: "Our AI monitors regulatory changes across 12 jurisdictions and automatically adjusts our compliance workflows. What used to take a team of 5 now runs on autopilot.",
          ru: "Наш AI мониторит регуляторные изменения в 12 юрисдикциях и автоматически корректирует наши комплаенс-процессы. То, что требовало команды из 5 человек, теперь на автопилоте.",
        },
      ],
      scoreTriggers: [
        "risk intelligence competitive advantage", "fully automated compliance",
        "proven resilience", "zero-trust security", "AI threat detection",
        "navigated major disruption", "regulatory AI monitoring",
        "compliance on autopilot", "tested and proven BCP",
        "organizational antifragility",
      ],
      nextSteps: [
        {
          en: "Share resilience capabilities as a differentiator: publish your approach, offer consulting to partners, and leverage certifications in sales.",
          ru: "Используйте устойчивость как отличие: публикуйте подход, предлагайте консалтинг партнерам и используйте сертификации в продажах.",
        },
        {
          en: "Explore emerging risk domains: AI ethics and governance, climate risk, geopolitical supply chain risks, and quantum computing threats.",
          ru: "Исследуйте новые области рисков: этика AI и управление, климатические риски, геополитические риски цепочек поставок и угрозы квантовых вычислений.",
        },
        {
          en: "Build ecosystem resilience: help your suppliers, partners, and clients improve their risk management -- their weaknesses are your vulnerabilities.",
          ru: "Стройте устойчивость экосистемы: помогите поставщикам, партнерам и клиентам улучшить управление рисками -- их слабости -- ваши уязвимости.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/**
 * All dimension rubrics indexed by dimension key.
 * Covers 7 dimensions for comprehensive SMB AI/digital maturity assessment.
 *
 * Current assessment maps (5 active dimensions):
 * - operations -> operationsRubric
 * - sales -> salesRubric
 * - finance -> financeRubric
 * - team -> teamRubric
 * - risks -> risksRubric
 *
 * Future dimensions (ready for expansion):
 * - data_technology -> dataTechRubric
 * - culture_change -> cultureRubric
 */
export const MATURITY_RUBRICS: Record<string, DimensionRubric> = {
  operations: operationsRubric,
  sales: salesRubric,
  finance: financeRubric,
  team: teamRubric,
  data_technology: dataTechRubric,
  culture_change: cultureRubric,
  risks: risksRubric,
};

/**
 * Get the rubric for a specific dimension.
 */
export function getRubric(dimension: string): DimensionRubric | undefined {
  return MATURITY_RUBRICS[dimension];
}

/**
 * Get the maturity level details for a given dimension and score.
 */
export function getMaturityLevel(dimension: string, score: number): MaturityLevel | undefined {
  const rubric = MATURITY_RUBRICS[dimension];
  if (!rubric) return undefined;

  for (const level of rubric.levels) {
    if (score >= level.range[0] && score <= level.range[1]) {
      return level;
    }
  }
  return undefined;
}

/**
 * Get the next maturity level (for "level up" recommendations).
 * Returns undefined if already at level 5.
 */
export function getNextMaturityLevel(dimension: string, score: number): MaturityLevel | undefined {
  const rubric = MATURITY_RUBRICS[dimension];
  if (!rubric) return undefined;

  for (let i = 0; i < rubric.levels.length; i++) {
    const level = rubric.levels[i];
    if (score >= level.range[0] && score <= level.range[1]) {
      return i < rubric.levels.length - 1 ? rubric.levels[i + 1] : undefined;
    }
  }
  return undefined;
}

/**
 * Generate a scoring calibration prompt fragment for AI scoring.
 * This tells Claude exactly what each score range means for a dimension.
 */
export function buildScoringCalibrationPrompt(dimension: string, locale: string): string {
  const rubric = MATURITY_RUBRICS[dimension];
  if (!rubric) return "";

  const lang = locale === "ru" ? "ru" : "en";
  const lines: string[] = [
    `Scoring calibration for ${rubric.dimensionLabel[lang]}:`,
    "",
  ];

  for (const level of rubric.levels) {
    lines.push(`Score ${level.range[0]}-${level.range[1]} (${level.name}):`);
    for (const desc of level.description) {
      lines.push(`  - ${desc}`);
    }
    lines.push(`  Score triggers (keywords/patterns that indicate this level): ${level.scoreTriggers.join(", ")}`);
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Generate a full scoring calibration prompt for all dimensions.
 * Designed to be injected into the AI scoring system prompt.
 */
export function buildFullScoringCalibrationPrompt(locale: string): string {
  const sections: string[] = [
    "=== MATURITY LEVEL CALIBRATION GUIDE ===",
    "",
    "Use the following rubrics to calibrate your scores. Each dimension has 5 maturity levels.",
    "Match the user's answers against the score triggers and descriptions to determine the appropriate score.",
    "A score of 30 means STRUGGLING (basic tools, inconsistent processes, known problems not addressed).",
    "A score of 50 means STABLE (processes work, some automation, decent but not optimized).",
    "A score of 70 means EFFICIENT (data-driven, automated, proactive, integrated systems).",
    "Do NOT inflate scores. Most SMBs score 25-55. Scores above 70 are rare and require strong evidence.",
    "",
  ];

  for (const dimension of Object.keys(MATURITY_RUBRICS)) {
    sections.push(buildScoringCalibrationPrompt(dimension, locale));
    sections.push("---");
    sections.push("");
  }

  return sections.join("\n");
}

/**
 * Generate a human-readable explanation of a score for a given dimension.
 * Used in assessment results to explain what the score means.
 */
export function generateScoreExplanation(
  dimension: string,
  score: number,
  locale: string
): { levelName: string; explanation: string; nextSteps: string[] } | undefined {
  const rubric = MATURITY_RUBRICS[dimension];
  if (!rubric) return undefined;

  const lang = locale === "ru" ? "ru" : "en";
  const level = getMaturityLevel(dimension, score);
  const nextLevel = getNextMaturityLevel(dimension, score);

  if (!level) return undefined;

  const explanation = level.description.join(" ");
  const nextSteps = level.nextSteps.map(ns => ns[lang]);

  return {
    levelName: level.name,
    explanation,
    nextSteps,
  };
}

// ---------------------------------------------------------------------------
// JSON-exportable format for external consumption
// ---------------------------------------------------------------------------

/**
 * Export all rubrics as a plain JSON-serializable object.
 * Useful for:
 * - Storing in a database
 * - Sending to frontend
 * - Including in AI prompts
 * - External system integration
 */
export function exportRubricsAsJSON(): Record<string, unknown> {
  return JSON.parse(JSON.stringify(MATURITY_RUBRICS));
}
