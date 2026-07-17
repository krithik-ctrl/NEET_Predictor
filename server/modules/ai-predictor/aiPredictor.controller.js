import { generateAIPrediction } from "./aiPredictor.service.js";

export const aiPredictor = async (
  req,
  res,
  next
) => {
  try {
console.log(req.user.userId)
    const result =
      await generateAIPrediction(
        req.user.userId,
        req.body
      );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};