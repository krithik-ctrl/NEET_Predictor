import { SYSTEM_PROMPT } from "./systemPrompt.js";

const COURSE_MAPPING = `
6a4b4c469099adfe25f97c59 = MBBS
6a4b4c469099adfe25f97c5b = BAMS
6a4b4c469099adfe25f97c5a = BDS
6a4b4c469099adfe25f97c5c = BHMS
6a4b4c469099adfe25f97c5d = BUMS
6a4b4c469099adfe25f97c5e = BSMS
6a4b4c469099adfe25f97c5f = BNYS
6a4b4c469099adfe25f97c60 = BPT
6a4b4c469099adfe25f97c61 = B.Sc Nursing
6a4b4c469099adfe25f97c62 = MD
6a4b4c469099adfe25f97c63 = MS
6a4b4c469099adfe25f97c64 = MDS
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