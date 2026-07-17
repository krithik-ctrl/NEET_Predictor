import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAIService {
  /**
   * Generate structured JSON response from OpenAI.
   *
   * @param {Object} params
   * @param {string} params.systemPrompt
   * @param {string} params.userPrompt
   * @param {string} [params.model]
   * @returns {Promise<Object>}
   */
  static async generatePrediction({
    systemPrompt,
    userPrompt,
    model = process.env.OPENAI_MODEL || "gpt-5-mini",
  }) {
    try {
      const response = await client.responses.create({
        model,

        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: systemPrompt,
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: userPrompt,
              },
            ],
          },
        ],

        text: {
          format: {
            type: "json_object",
          },
        },
      });

      const output = response.output_text;

      if (!output) {
        throw new Error("Empty response received from OpenAI.");
      }

      return JSON.parse(output);
    } catch (error) {
      console.error("OpenAI Error:", error);

      throw new Error(
        error?.message || "Failed to generate AI prediction."
      );
    }
  }
}