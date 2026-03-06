import type { AssessmentSection } from "./types";

/**
 * Static questionnaire definitions for the 5-dimension AI maturity assessment.
 * Each section maps to a maturity dimension and contains 3-4 bilingual questions.
 * Questions are conversational in tone, designed for SMB executives.
 */
export const ASSESSMENT_SECTIONS: AssessmentSection[] = [
  // ── Section 0: Strategy ──
  {
    id: "strategy",
    name: {
      en: "AI Strategy",
      ru: "Стратегия ИИ",
    },
    dimension: "strategy",
    questions: [
      {
        id: "str_vision",
        text: {
          en: "How would you describe your company's vision for using AI in the next 1-3 years?",
          ru: "Как бы вы описали видение вашей компании по использованию ИИ в ближайшие 1-3 года?",
        },
        type: "open-text",
        weight: 3,
      },
      {
        id: "str_alignment",
        text: {
          en: "How closely is your AI strategy tied to your overall business goals?",
          ru: "Насколько тесно ваша стратегия ИИ связана с общими бизнес-целями компании?",
        },
        type: "single-choice",
        options: [
          { en: "No AI strategy exists yet", ru: "Стратегии ИИ пока нет" },
          { en: "We have ideas but nothing formal", ru: "Есть идеи, но ничего формального" },
          { en: "AI strategy exists but loosely connected to business goals", ru: "Стратегия ИИ есть, но слабо связана с бизнес-целями" },
          { en: "AI strategy is directly tied to key business objectives", ru: "Стратегия ИИ напрямую привязана к ключевым бизнес-целям" },
        ],
        weight: 2,
      },
      {
        id: "str_leadership",
        text: {
          en: "How does your leadership team view AI -- as a priority investment or an experiment to explore?",
          ru: "Как ваше руководство относится к ИИ -- как к приоритетной инвестиции или эксперименту?",
        },
        type: "open-text",
        weight: 2,
      },
      {
        id: "str_competitive",
        text: {
          en: "What competitive advantages do you expect AI to bring to your business?",
          ru: "Какие конкурентные преимущества вы ожидаете от ИИ для вашего бизнеса?",
        },
        type: "open-text",
        weight: 1,
      },
    ],
  },

  // ── Section 1: Adoption ──
  {
    id: "adoption",
    name: {
      en: "AI Adoption",
      ru: "Внедрение ИИ",
    },
    dimension: "adoption",
    questions: [
      {
        id: "adp_tools",
        text: {
          en: "How many AI-powered tools or systems does your company currently use?",
          ru: "Сколько инструментов или систем на основе ИИ сейчас использует ваша компания?",
        },
        type: "single-choice",
        options: [
          { en: "None", ru: "Ни одного" },
          { en: "1-2 tools (e.g., chatbot, analytics)", ru: "1-2 инструмента (например, чат-бот, аналитика)" },
          { en: "3-5 tools across different areas", ru: "3-5 инструментов в разных областях" },
          { en: "6+ integrated AI systems", ru: "6+ интегрированных систем ИИ" },
        ],
        weight: 3,
      },
      {
        id: "adp_scope",
        text: {
          en: "Where are you currently using AI in your business processes? Tell us about any ongoing projects.",
          ru: "Где вы сейчас используете ИИ в бизнес-процессах? Расскажите о текущих проектах.",
        },
        type: "open-text",
        weight: 2,
      },
      {
        id: "adp_integration",
        text: {
          en: "How well are your AI tools integrated with the rest of your business systems?",
          ru: "Насколько хорошо ваши инструменты ИИ интегрированы с остальными бизнес-системами?",
        },
        type: "open-text",
        weight: 2,
      },
      {
        id: "adp_capability",
        text: {
          en: "Does your team have the skills to work with AI tools, or do you rely on external help?",
          ru: "Есть ли у вашей команды навыки работы с инструментами ИИ, или вы полагаетесь на внешнюю помощь?",
        },
        type: "open-text",
        weight: 1,
      },
    ],
  },

  // ── Section 2: Risk Management ──
  {
    id: "risk-management",
    name: {
      en: "Risk Management",
      ru: "Управление рисками",
    },
    dimension: "riskManagement",
    questions: [
      {
        id: "rsk_awareness",
        text: {
          en: "What risks related to AI adoption concern you the most (e.g., data privacy, job displacement, vendor lock-in)?",
          ru: "Какие риски, связанные с внедрением ИИ, вас больше всего беспокоят (например, конфиденциальность данных, сокращение персонала, зависимость от вендора)?",
        },
        type: "open-text",
        weight: 3,
      },
      {
        id: "rsk_compliance",
        text: {
          en: "How does your company handle compliance requirements when deploying new technology?",
          ru: "Как ваша компания решает вопросы соответствия требованиям при внедрении новых технологий?",
        },
        type: "open-text",
        weight: 2,
      },
      {
        id: "rsk_data_gov",
        text: {
          en: "How would you rate your current data governance practices?",
          ru: "Как бы вы оценили ваши текущие практики управления данными?",
        },
        type: "single-choice",
        options: [
          { en: "We don't have formal data governance", ru: "У нас нет формального управления данными" },
          { en: "Basic policies exist but not consistently followed", ru: "Базовые политики есть, но не всегда соблюдаются" },
          { en: "Solid data governance with regular audits", ru: "Надежное управление данными с регулярными аудитами" },
          { en: "Comprehensive data governance program with dedicated team", ru: "Комплексная программа управления данными с выделенной командой" },
        ],
        weight: 2,
      },
      {
        id: "rsk_incident",
        text: {
          en: "If an AI system made an incorrect decision affecting your business, how would you handle it today?",
          ru: "Если бы система ИИ приняла некорректное решение, затрагивающее ваш бизнес, как бы вы с этим справились сейчас?",
        },
        type: "open-text",
        weight: 1,
      },
    ],
  },

  // ── Section 3: ROI Tracking ──
  {
    id: "roi-tracking",
    name: {
      en: "ROI Tracking",
      ru: "Отслеживание ROI",
    },
    dimension: "roiTracking",
    questions: [
      {
        id: "roi_measurement",
        text: {
          en: "How do you currently measure the success of technology investments in your company?",
          ru: "Как вы сейчас измеряете успешность технологических инвестиций в вашей компании?",
        },
        type: "open-text",
        weight: 3,
      },
      {
        id: "roi_tracking_level",
        text: {
          en: "Do you track the costs and returns of your AI initiatives?",
          ru: "Отслеживаете ли вы затраты и результаты ваших инициатив в области ИИ?",
        },
        type: "single-choice",
        options: [
          { en: "No tracking at all", ru: "Вообще не отслеживаем" },
          { en: "We track costs but not returns", ru: "Отслеживаем затраты, но не результаты" },
          { en: "We track both costs and estimated returns", ru: "Отслеживаем и затраты, и примерные результаты" },
          { en: "Full ROI measurement with KPIs and dashboards", ru: "Полное измерение ROI с KPI и дашбордами" },
        ],
        weight: 2,
      },
      {
        id: "roi_attribution",
        text: {
          en: "When an AI tool saves time or money, how do you attribute that value back to the tool?",
          ru: "Когда инструмент ИИ экономит время или деньги, как вы атрибутируете эту ценность обратно инструменту?",
        },
        type: "open-text",
        weight: 2,
      },
    ],
  },

  // ── Section 4: Governance ──
  {
    id: "governance",
    name: {
      en: "AI Governance",
      ru: "Управление ИИ",
    },
    dimension: "governance",
    questions: [
      {
        id: "gov_policies",
        text: {
          en: "Does your company have any policies or guidelines specifically for AI use?",
          ru: "Есть ли у вашей компании какие-либо политики или руководства специально для использования ИИ?",
        },
        type: "open-text",
        weight: 3,
      },
      {
        id: "gov_accountability",
        text: {
          en: "Who is responsible for AI-related decisions in your organization?",
          ru: "Кто отвечает за решения, связанные с ИИ, в вашей организации?",
        },
        type: "single-choice",
        options: [
          { en: "No one specific -- it's ad hoc", ru: "Никто конкретно -- решается по ситуации" },
          { en: "IT department handles it alongside other tech", ru: "IT-отдел занимается этим наряду с другими технологиями" },
          { en: "A designated person or small team", ru: "Назначенный сотрудник или небольшая команда" },
          { en: "Dedicated AI/ML team with clear ownership", ru: "Выделенная команда ИИ/ML с чётким распределением ответственности" },
        ],
        weight: 2,
      },
      {
        id: "gov_ethics",
        text: {
          en: "How does your company think about ethical considerations around AI (bias, fairness, transparency)?",
          ru: "Как ваша компания относится к этическим вопросам ИИ (предвзятость, справедливость, прозрачность)?",
        },
        type: "open-text",
        weight: 2,
      },
      {
        id: "gov_review",
        text: {
          en: "How often do you review and update your approach to AI?",
          ru: "Как часто вы пересматриваете и обновляете свой подход к ИИ?",
        },
        type: "open-text",
        weight: 1,
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
