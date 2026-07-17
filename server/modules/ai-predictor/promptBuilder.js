import { SYSTEM_PROMPT } from "./systemPrompt.js";

const COURSE_MAPPING = `
6a3a57c98831c74d27a415f1 = MBBS
6a4b4c469099adfe25f97c59 = MD
6a4b4c469099adfe25f97c60 = MS
6a4b4c469099adfe25f97c61 = MDS

// Add remaining courses
`;

export const buildPrompt = (payload) => {
  const systemPrompt = SYSTEM_PROMPT.replace(
    "{{COURSE_MAPPING}}",
    COURSE_MAPPING
  );

  const userPrompt = `
Student Profile

courseId: ${payload.courseId}

rank: ${payload.rank}

score: ${payload.score}

counsellingType: ${payload.counsellingType}

seatType: ${payload.seatType}

category: ${payload.category}

round: ${payload.round}

budget: ${payload.budget ?? "No Limit"}

predictorState: ${payload.predictorState ?? "N/A"}

domicileState: ${payload.domicileState ?? "N/A"}

Generate the prediction.
`;

  return {
    systemPrompt,
    userPrompt,
  };
};