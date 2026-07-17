import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  try {
    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: "Reply only with: Hello from OpenAI API"
    });

    console.log("\n===== AI RESPONSE =====\n");
    console.log(response.output_text);
  } catch (err) {
    console.error(err);
  }
}

test();