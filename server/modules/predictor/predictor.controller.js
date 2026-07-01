import { predictColleges,getCategoriesType,getSeatTypes } from "./predictor.service.js";

export const predictCollegesController =
  async (req, res, next) => {
    try {

      const predictions =
        await predictColleges(
          req.user.userId,
          req.body
        );

      res.status(200).json({
        success: true,
        data: predictions,
      });

    } catch (error) {
      next(error);
    }
  };
  export const getSeatTypesController = async (
  req,
  res,
  next
) => {

  try {

    const seatTypes =
      await getSeatTypes(
        req.body
      );

    res.status(200).json({
      success: true,
      data: seatTypes,
    });

  } catch (error) {
    next(error);
  }

};


export const getCategoriesController = async (
  req,
  res,
  next
) => {

  try {

   const categories =
  await getCategoriesType({

    counsellingType:
      req.body.counsellingType,

    predictorState:
      req.body.predictorState,

    domicileState:
      req.body.domicileState,

    seatType:
      req.body.seatType,

  });

    res.status(200).json({
      success: true,
      data: categories,
    });

  } catch (error) {
    next(error);
  }

};