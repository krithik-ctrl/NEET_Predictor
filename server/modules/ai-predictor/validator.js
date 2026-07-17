const VALID_PREDICTIONS = [
  "SAFE",
  "MODERATE",
  "RISKY",
];

export const validatePrediction = (response) => {
  if (!response || typeof response !== "object") {
    throw new Error("Invalid AI response.");
  }

  const { safe, moderate, risky } = response;

  if (!Array.isArray(safe)) {
    throw new Error("Invalid safe predictions.");
  }

  if (!Array.isArray(moderate)) {
    throw new Error("Invalid moderate predictions.");
  }

  if (!Array.isArray(risky)) {
    throw new Error("Invalid risky predictions.");
  }

  const allPredictions = [
    ...safe,
    ...moderate,
    ...risky,
  ];

  if (allPredictions.length === 0) {
    throw new Error("No predictions returned by AI.");
  }

  const collegeNames = new Set();

  for (const college of allPredictions) {
    if (!college.college) {
      throw new Error("College object is missing.");
    }

    if (!college.college.name) {
      throw new Error("College name is missing.");
    }

    if (!college.college.state) {
      throw new Error("College state is missing.");
    }

    if (!VALID_PREDICTIONS.includes(college.prediction)) {
      throw new Error(
        `Invalid prediction type: ${college.prediction}`
      );
    }

    const key = college.college.name
      .trim()
      .toLowerCase();

    if (collegeNames.has(key)) {
      throw new Error(
        `Duplicate college found: ${college.college.name}`
      );
    }

    collegeNames.add(key);
  }

  return true;
};