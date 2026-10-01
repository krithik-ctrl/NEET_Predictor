import { Plan } from "./plan.model.js";

/*
|--------------------------------------------------------------------------
| Plan tier — free vs paid is decided by PRICE, never by name.
| The client renames plans ("Free" → "Starter", ...), so name checks break.
|   free  → price === 0
|   paid  → price  >  0
|--------------------------------------------------------------------------
*/

export const isFreePlan = (plan) =>
  !!plan && Number(plan.price) === 0;

export const isPaidPlan = (plan) =>
  !!plan && Number(plan.price) > 0;

// The active price-0 plan. If several exist, pick deterministically
// (earliest created, then _id) so every caller gets the same one.
export const findFreePlan = () =>
  Plan.findOne({ price: 0, status: "active" })
    .sort({ createdAt: 1, _id: 1 });

// Same as findFreePlan, but fails loudly with a clear log + error.
export const getFreePlanOrThrow = async (context = "") => {
  const freePlan = await findFreePlan();

  if (!freePlan) {
    console.error(
      `[SUBSCRIPTION] CRITICAL: no active plan with price 0 found${context ? ` (${context})` : ""}. ` +
      "New users cannot be auto-subscribed. Create/activate a price-0 plan."
    );
    throw new Error("Free plan not found (no active plan with price 0)");
  }

  return freePlan;
};
