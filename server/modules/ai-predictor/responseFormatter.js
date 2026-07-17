export const formatPredictionResponse = ({
  payload,
  historyId = null,
  safe = [],
  moderate = [],
  risky = [],
}) => {
  return {
    historyId,

    profile: {
      rank: payload.rank,
      category: payload.category,
      counsellingType: payload.counsellingType,
      predictorState: payload.predictorState ?? null,
      domicileState: payload.domicileState ?? null,
      seatType: payload.seatType,
      round: payload.round,
    },

    totalResults:
      safe.length +
      moderate.length +
      risky.length,

    safe,

    moderate,

    risky,
  };
};