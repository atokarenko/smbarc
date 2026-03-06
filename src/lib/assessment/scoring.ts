import type { AssessmentSection } from "./types";

/**
 * Calculate dimension scores from user answers.
 *
 * Scoring heuristic:
 * - Open-text: answer length as baseline signal, adjusted with keyword detection
 * - Single-choice: option index mapped to score (0-based index / (options.length - 1) * 100)
 * - Weights from question definitions are applied
 *
 * @returns Record with dimension keys and scores 0-100
 */
export function calculateDimensionScores(
  answers: Record<string, string>,
  sections: AssessmentSection[]
): Record<string, number> {
  const scores: Record<string, number> = {};

  for (const section of sections) {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    for (const question of section.questions) {
      const answer = answers[question.id];
      let questionScore: number;

      if (!answer || answer.trim() === "") {
        questionScore = 0;
      } else if (question.type === "single-choice" && question.options) {
        // Single-choice: map option index to 0-100
        const choiceIndex = parseInt(answer, 10);
        if (isNaN(choiceIndex) || choiceIndex < 0) {
          questionScore = 0;
        } else {
          const maxIndex = question.options.length - 1;
          questionScore =
            maxIndex > 0
              ? Math.min(choiceIndex, maxIndex) / maxIndex * 100
              : 0;
        }
      } else {
        // Open-text: length-based heuristic with keyword bonus
        questionScore = scoreOpenText(answer);
      }

      totalWeightedScore += questionScore * question.weight;
      totalWeight += question.weight;
    }

    scores[section.dimension] =
      totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : 0;
  }

  return scores;
}

/**
 * Score an open-text answer based on length and keyword presence.
 * Returns 0-100.
 */
function scoreOpenText(answer: string): number {
  const trimmed = answer.trim();
  const length = trimmed.length;

  // Length-based baseline
  let score: number;
  if (length === 0) {
    score = 0;
  } else if (length < 20) {
    score = 15;
  } else if (length < 50) {
    score = 25;
  } else if (length < 100) {
    score = 40;
  } else if (length < 200) {
    score = 55;
  } else if (length < 400) {
    score = 70;
  } else {
    score = 85;
  }

  // Keyword bonus: domain-relevant terms suggest deeper understanding
  const keywords = [
    "strategy",
    "roadmap",
    "kpi",
    "metrics",
    "automation",
    "ai",
    "machine learning",
    "data",
    "governance",
    "compliance",
    "roi",
    "investment",
    "risk",
    "policy",
    "framework",
    "team",
    "process",
    "integration",
    "deployment",
    "monitoring",
  ];

  const lowerAnswer = trimmed.toLowerCase();
  let keywordHits = 0;
  for (const kw of keywords) {
    if (lowerAnswer.includes(kw)) {
      keywordHits++;
    }
  }

  // Up to +15 bonus for keyword presence (3 points per keyword, max 5 keywords counted)
  const keywordBonus = Math.min(keywordHits, 5) * 3;
  score = Math.min(100, score + keywordBonus);

  return score;
}

/**
 * Calculate overall maturity score as weighted average of dimensions.
 */
export function calculateOverallScore(
  dimensionScores: Record<string, number>
): number {
  const values = Object.values(dimensionScores);
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, v) => acc + v, 0);
  return Math.round(sum / values.length);
}

/**
 * Map a score (0-100) to a CMMI-inspired maturity level.
 */
export function getMaturityLevel(score: number): {
  level: string;
  range: string;
} {
  if (score <= 20) {
    return { level: "Beginner", range: "0-20" };
  } else if (score <= 40) {
    return { level: "Developing", range: "21-40" };
  } else if (score <= 60) {
    return { level: "Intermediate", range: "41-60" };
  } else if (score <= 80) {
    return { level: "Advanced", range: "61-80" };
  } else {
    return { level: "Leader", range: "81-100" };
  }
}

/**
 * Calculate assessment completion progress as a percentage.
 *
 * @param answers - Regular question answers (keyed by question id)
 * @param followUpAnswers - Follow-up question answers
 * @param totalQuestions - Total number of regular questions
 * @param totalFollowUps - Total number of follow-up questions expected
 * @returns Progress percentage 0-100
 */
export function calculateProgress(
  answers: Record<string, string>,
  followUpAnswers: Record<string, string>,
  totalQuestions: number,
  totalFollowUps: number
): number {
  const answeredRegular = Object.keys(answers).filter(
    (k) => answers[k] && answers[k].trim() !== ""
  ).length;
  const answeredFollowUps = Object.keys(followUpAnswers).filter(
    (k) => followUpAnswers[k] && followUpAnswers[k].trim() !== ""
  ).length;

  const totalExpected = totalQuestions + totalFollowUps;
  if (totalExpected === 0) return 0;

  const totalAnswered = answeredRegular + answeredFollowUps;
  const progress = Math.round((totalAnswered / totalExpected) * 100);
  return Math.min(100, progress);
}
