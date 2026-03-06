import type { AssessmentSection } from "./types";

/**
 * Static questionnaire definitions for the 5-dimension business health assessment.
 * Each section maps to a business dimension and contains 3-4 bilingual questions.
 * Questions are conversational in tone, designed for SMB owners and executives.
 */
export const ASSESSMENT_SECTIONS: AssessmentSection[] = [
  // -- Section 0: Operations and Processes --
  {
    id: "operations",
    name: {
      en: "Operations & Processes",
      ru: "Операции и процессы",
    },
    dimension: "operations",
    questions: [
      {
        id: "ops_time_sink",
        text: {
          en: "What tasks or processes eat up the most time in your company? Think about things your team does every day that feel repetitive or manual.",
          ru: "Какие задачи или процессы отнимают больше всего времени в вашей компании? Подумайте о том, что ваша команда делает каждый день и что кажется рутинным или ручным.",
        },
        type: "open-text",
        weight: 3,
      },
      {
        id: "ops_bottleneck",
        text: {
          en: "Where do things get stuck in your workflows? What slows your team down the most?",
          ru: "Где в ваших рабочих процессах возникают заторы? Что больше всего замедляет вашу команду?",
        },
        type: "open-text",
        weight: 3,
      },
      {
        id: "ops_breaks",
        text: {
          en: "How often do your core business processes break or produce errors?",
          ru: "Как часто ваши основные бизнес-процессы дают сбои или приводят к ошибкам?",
        },
        type: "single-choice",
        options: [
          { en: "Daily -- it's a constant firefight", ru: "Ежедневно -- постоянное тушение пожаров" },
          { en: "Weekly -- recurring issues we patch as they come", ru: "Еженедельно -- повторяющиеся проблемы, латаем по мере появления" },
          { en: "Monthly -- things mostly run, but surprises happen", ru: "Ежемесячно -- в целом работает, но сюрпризы бывают" },
          { en: "Rarely -- our processes are well-documented and stable", ru: "Редко -- наши процессы хорошо задокументированы и стабильны" },
        ],
        weight: 2,
      },
      {
        id: "ops_automate_wish",
        text: {
          en: "If you could wave a magic wand and automate one thing in your business tomorrow, what would it be?",
          ru: "Если бы вы могли взмахнуть волшебной палочкой и автоматизировать одну вещь в бизнесе прямо завтра -- что бы это было?",
        },
        type: "open-text",
        weight: 2,
      },
    ],
  },

  // -- Section 1: Sales and Customers --
  {
    id: "sales",
    name: {
      en: "Sales & Customers",
      ru: "Продажи и клиенты",
    },
    dimension: "sales",
    questions: [
      {
        id: "sal_find_customers",
        text: {
          en: "How do you find and attract new customers today? What channels work best for you?",
          ru: "Как вы сейчас находите и привлекаете новых клиентов? Какие каналы работают лучше всего?",
        },
        type: "open-text",
        weight: 2,
      },
      {
        id: "sal_lose_customers",
        text: {
          en: "Where do you lose customers in your sales process? At what point do they drop off or choose a competitor?",
          ru: "Где вы теряете клиентов в процессе продаж? В какой момент они уходят или выбирают конкурента?",
        },
        type: "open-text",
        weight: 3,
      },
      {
        id: "sal_pipeline",
        text: {
          en: "How would you describe the state of your sales pipeline?",
          ru: "Как бы вы описали состояние вашей воронки продаж?",
        },
        type: "single-choice",
        options: [
          { en: "We don't really track it -- sales happen organically", ru: "Мы особо не отслеживаем -- продажи происходят сами собой" },
          { en: "We have a basic spreadsheet or CRM, but it's messy", ru: "Есть базовая таблица или CRM, но там беспорядок" },
          { en: "We track leads and deals, but conversion could be better", ru: "Отслеживаем лиды и сделки, но конверсия могла бы быть лучше" },
          { en: "Our pipeline is well-managed with clear stages and metrics", ru: "Наша воронка хорошо управляется с четкими этапами и метриками" },
        ],
        weight: 2,
      },
      {
        id: "sal_complaints",
        text: {
          en: "What do your customers complain about the most? How do you currently handle their feedback?",
          ru: "На что ваши клиенты жалуются чаще всего? Как вы сейчас работаете с их обратной связью?",
        },
        type: "open-text",
        weight: 2,
      },
    ],
  },

  // -- Section 2: Finance and Resources --
  {
    id: "finance",
    name: {
      en: "Finance & Resources",
      ru: "Финансы и ресурсы",
    },
    dimension: "finance",
    questions: [
      {
        id: "fin_growing_costs",
        text: {
          en: "What costs are growing the fastest in your business right now? Where does money seem to disappear?",
          ru: "Какие расходы растут быстрее всего в вашем бизнесе прямо сейчас? Куда, кажется, утекают деньги?",
        },
        type: "open-text",
        weight: 3,
      },
      {
        id: "fin_reporting",
        text: {
          en: "How much of your financial reporting and invoicing is done manually (spreadsheets, email, paper)?",
          ru: "Какая часть вашей финансовой отчетности и выставления счетов делается вручную (таблицы, почта, бумага)?",
        },
        type: "single-choice",
        options: [
          { en: "Almost everything is manual", ru: "Почти все делается вручную" },
          { en: "Mix of manual and automated -- depends on the task", ru: "Смесь ручного и автоматизированного -- зависит от задачи" },
          { en: "Mostly automated with some manual exceptions", ru: "В основном автоматизировано с некоторыми ручными исключениями" },
          { en: "Fully automated -- integrated accounting and invoicing systems", ru: "Полностью автоматизировано -- интегрированные системы учета и выставления счетов" },
        ],
        weight: 2,
      },
      {
        id: "fin_cash_flow",
        text: {
          en: "What are your biggest cash flow pain points? Late payments, unexpected expenses, seasonal dips?",
          ru: "Какие основные проблемы с денежным потоком? Поздние платежи, непредвиденные расходы, сезонные спады?",
        },
        type: "open-text",
        weight: 2,
      },
    ],
  },

  // -- Section 3: Team and HR --
  {
    id: "team-hr",
    name: {
      en: "Team & HR",
      ru: "Команда и кадры",
    },
    dimension: "team",
    questions: [
      {
        id: "thr_hiring",
        text: {
          en: "What's the hardest part about hiring for your company? How long does it take to fill a typical position?",
          ru: "Что самое сложное в найме для вашей компании? Сколько времени уходит на закрытие типичной вакансии?",
        },
        type: "open-text",
        weight: 2,
      },
      {
        id: "thr_turnover",
        text: {
          en: "What makes good employees leave? What would keep them longer?",
          ru: "Почему хорошие сотрудники уходят? Что могло бы удержать их дольше?",
        },
        type: "open-text",
        weight: 3,
      },
      {
        id: "thr_training",
        text: {
          en: "How does your team learn new skills or processes? Is there a structured approach?",
          ru: "Как ваша команда осваивает новые навыки или процессы? Есть ли системный подход?",
        },
        type: "single-choice",
        options: [
          { en: "Sink or swim -- people figure it out on their own", ru: "Как получится -- люди разбираются сами" },
          { en: "Informal mentoring from colleagues", ru: "Неформальное наставничество от коллег" },
          { en: "Some training programs, but not consistent", ru: "Есть некоторые программы обучения, но не системно" },
          { en: "Structured onboarding and ongoing development programs", ru: "Структурированная адаптация и постоянные программы развития" },
        ],
        weight: 2,
      },
      {
        id: "thr_communication",
        text: {
          en: "How much time does your team spend in meetings, chats, and emails coordinating work instead of doing it?",
          ru: "Сколько времени ваша команда тратит на совещания, переписки и координацию работы вместо самой работы?",
        },
        type: "open-text",
        weight: 1,
      },
    ],
  },

  // -- Section 4: Risks and Compliance --
  {
    id: "risks-compliance",
    name: {
      en: "Risks & Compliance",
      ru: "Риски и соответствие",
    },
    dimension: "risks",
    questions: [
      {
        id: "rsk_keeps_up",
        text: {
          en: "What keeps you up at night about your business? What's the one thing that could seriously hurt you if it went wrong?",
          ru: "Что не дает вам спать по ночам, когда вы думаете о бизнесе? Что могло бы серьезно навредить, если бы пошло не так?",
        },
        type: "open-text",
        weight: 3,
      },
      {
        id: "rsk_key_person",
        text: {
          en: "What would happen to your business if a key person left tomorrow? How dependent are you on specific individuals?",
          ru: "Что случится с вашим бизнесом, если ключевой сотрудник уйдет завтра? Насколько вы зависите от конкретных людей?",
        },
        type: "open-text",
        weight: 3,
      },
      {
        id: "rsk_regulatory",
        text: {
          en: "How much of a burden is regulatory compliance for your business?",
          ru: "Насколько обременительно для вашего бизнеса соблюдение нормативных требований?",
        },
        type: "single-choice",
        options: [
          { en: "We don't really think about it -- probably should", ru: "Мы об этом особо не задумываемся -- наверное, стоило бы" },
          { en: "We handle the basics but it's stressful", ru: "Справляемся с основами, но это напрягает" },
          { en: "We have processes in place, but they're time-consuming", ru: "Процессы выстроены, но отнимают много времени" },
          { en: "We manage it efficiently with dedicated resources", ru: "Управляем эффективно с выделенными ресурсами" },
        ],
        weight: 2,
      },
      {
        id: "rsk_data_security",
        text: {
          en: "How confident are you in your data security? What happens if you lose customer data or face a breach?",
          ru: "Насколько вы уверены в безопасности своих данных? Что произойдет, если вы потеряете данные клиентов или столкнетесь со взломом?",
        },
        type: "open-text",
        weight: 2,
      },
    ],
  },
];

/**
 * Get questions for a specific section by index.
 * Returns empty array if index is out of bounds.
 */
export function getQuestionsForSection(sectionIndex: number) {
  const section = ASSESSMENT_SECTIONS[sectionIndex];
  return section ? section.questions : [];
}

/**
 * Get total number of questions across all sections.
 */
export function getTotalQuestionCount(): number {
  return ASSESSMENT_SECTIONS.reduce(
    (total, section) => total + section.questions.length,
    0
  );
}
