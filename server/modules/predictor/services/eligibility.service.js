import stateConfigs from "../configs/index.js";

export const getEligibility = ({
  counsellingType,
  predictorState,
  domicileState,
}) => {

  if (!counsellingType) {
    throw new Error(
      "Counselling Type is required."
    );
  }

  /*
  |--------------------------------------------------------------------------
  | AIQ Counselling
  |--------------------------------------------------------------------------
  */

  if (counsellingType === "AIQ") {

    const config =
      stateConfigs.aiq;

    return {

      config,

      eligibility: "AIQ",

      seatTypes:
        config.rules.seatTypes,

    };

  }

  /*
  |--------------------------------------------------------------------------
  | State Counselling
  |--------------------------------------------------------------------------
  */

  if (!predictorState) {
    throw new Error(
      "Predictor State is required."
    );
  }

  if (!domicileState) {
    throw new Error(
      "Domicile State is required."
    );
  }

  const config =
    stateConfigs[
      predictorState
    ];

  if (!config) {
    throw new Error(
      "Counselling configuration not found."
    );
  }

  const sameState =

    predictorState
      .trim()
      .toLowerCase() ===

    domicileState
      .trim()
      .toLowerCase();

  const eligibility =
    sameState
      ? "sameState"
      : "otherState";

  return {

    config,

    eligibility,

    seatTypes:
      config.rules[
        eligibility
      ].seatTypes,

  };

};