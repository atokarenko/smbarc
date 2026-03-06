import { z } from "zod";

// ── Follow-Up Schema ──
// Used for AI-generated follow-up questions after each section

export const followUpSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z.string().describe("The follow-up question to ask"),
        context: z
          .string()
          .describe("Why the AI is asking this -- shown to user for transparency"),
        suggestedAnswers: z
          .array(z.string())
          .describe("2-3 pre-filled answer chips for the user"),
      })
    )
    .describe("1-3 follow-up questions based on user answers"),
  comprehensionLevel: z
    .enum(["beginner", "intermediate", "advanced"])
    .describe(
      "Detected user comprehension level -- affects question difficulty in subsequent sections"
    ),
});

export type FollowUpOutput = z.infer<typeof followUpSchema>;

// ── Score + Roadmap Schema ──
// AI Call 1: Maturity scores and automation roadmap

const roadmapItemSchema = z.object({
  name: z.string().describe("Name of the automation initiative"),
  description: z.string().describe("What to automate and why"),
  priority: z.enum(["high", "medium", "low"]),
  expectedImpact: z.string().describe("Expected business impact"),
  timeline: z.string().describe("Implementation timeline estimate"),
});

export const scoreAndRoadmapSchema = z.object({
  maturityScore: z.object({
    overall: z.number().describe("Overall business health score 0-100"),
    dimensions: z.object({
      operations: z.number().describe("Operations and Processes score 0-100"),
      sales: z.number().describe("Sales and Customers score 0-100"),
      finance: z.number().describe("Finance and Resources score 0-100"),
      team: z.number().describe("Team and HR score 0-100"),
      risks: z.number().describe("Risks and Compliance score 0-100"),
    }),
  }),
  automationRoadmap: z
    .array(roadmapItemSchema)
    .describe("3-5 prioritized automation recommendations"),
});

export type ScoreAndRoadmapOutput = z.infer<typeof scoreAndRoadmapSchema>;

// ── Risk + ROI Schema ──
// AI Call 2: Risk map and ROI forecast

const riskItemSchema = z.object({
  category: z.string().describe("Risk category name"),
  level: z.enum(["high", "medium", "low"]),
  description: z.string().describe("Risk description"),
  mitigation: z.string().describe("Mitigation strategy"),
});

const roiItemSchema = z.object({
  area: z.string().describe("Business area"),
  currentCost: z.number().describe("Estimated current annual cost"),
  projectedSaving: z
    .number()
    .describe("Projected annual saving with AI automation"),
  confidence: z.enum(["high", "medium", "low"]),
});

export const riskAndRoiSchema = z.object({
  riskMap: z
    .array(riskItemSchema)
    .describe(
      "3-5 risks covering legal, financial, reputational, operational, and data categories"
    ),
  roiForecast: z.object({
    totalSavings: z.number().describe("Total projected annual savings"),
    timeframe: z.string().describe("Forecast timeframe"),
    items: z
      .array(roiItemSchema)
      .describe("3-5 ROI areas with savings projections"),
  }),
});

export type RiskAndRoiOutput = z.infer<typeof riskAndRoiSchema>;
