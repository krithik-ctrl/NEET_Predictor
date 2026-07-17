import { buildPrompt } from "./promptBuilder.js";
import { OpenAIService } from "./openai.service.js";
import { validatePrediction } from "./validator.js";
import { formatPredictionResponse } from "./responseFormatter.js";

import {
  createPredictionHistory,
} from "../prediction-history/predictionHistory.service.js";

export const generateAIPrediction = async (
  userId,
  payload
) => {
  const {
    systemPrompt,
    userPrompt,
  } = buildPrompt(payload);
console.log(userId)
  // Call OpenAI
  const aiResponse =
    await OpenAIService.generatePrediction({
      systemPrompt,
      userPrompt,
    });
console.log(
  JSON.stringify(aiResponse, null, 2)
);
  // Validate AI response
  validatePrediction(aiResponse);

  const safe =
    aiResponse.safe || [];

  const moderate =
    aiResponse.moderate || [];

  const risky =
    aiResponse.risky || [];

  // Save prediction history
  
  const predictionHistory =
    await createPredictionHistory(userId, {
      ...payload,

      totalResults:
        safe.length +
        moderate.length +
        risky.length,

      safeCount:
        safe.length,

      moderateCount:
        moderate.length,

      riskyCount:
        risky.length,

      safe,
      moderate,
      risky,
    });

  // Return predictor response
  return formatPredictionResponse({
    payload,

    historyId:
      predictionHistory._id,

    safe,

    moderate,

    risky,
  });
};