import express from "express";
import {
  paymentMethodValidation,
  updatePaymentMethodValidation,
} from "../middlewares/validationMiddleware.js";
import {
  createPaymentMethod,
  deletePaymentMethodById,
  getPaymentMethods,
  updatePaymentMethodByID,
} from "../models/paymentMethod/PaymentMethodModel.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getPaymentMethods();
    res.json({
      status: "success",
      message: "todo get method",
      result,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.post("/", paymentMethodValidation, async (req, res, next) => {
  try {
    const result = await createPaymentMethod(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "The new payment method has been added!",
        })
      : res.json({
          status: "error",
          message:
            "Error, Unable to add the payment method, please try again later!",
        });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.put("/", updatePaymentMethodValidation, async (req, res, next) => {
  try {
    const result = await updatePaymentMethodByID(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "The payment method has been updated!",
        })
      : res.json({
          status: "error",
          message: "Error, unable to update the payment method!",
        });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const result = await deletePaymentMethodById(_id);

    result?._id
      ? res.json({
          status: "success",
          message: "The payment method has been deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to delete the payment method, try again later",
        });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

export default router;
