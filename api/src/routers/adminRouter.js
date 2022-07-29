import express from "express";
import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js";
import { profileUpdateNotification } from "../helpers/emailHelper.js";
import {
  updateAdminProfileValidation,
  updatePasswordValidation,
} from "../middlewares/validationMiddleware.js";
import {
  getOneAdmin,
  updateAdmin,
} from "../models/adminUser/AdminUserModel.js";
const router = express.Router();

// get admin info TODO
router.get("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "todo get method",
    });
  } catch (error) {
    next(error);
  }
});

// update admin profile info
router.put("/", updateAdminProfileValidation, async (req, res, next) => {
  try {
    const { currentPassword, email, ...rest } = req.body;

    //check if user exit for the give email
    const user = await getOneAdmin({ email });
    if (user?._id) {
      // if so, check if the password sotred in the db matches the password sent
      const isMatched = comparePassword(currentPassword, user.password);

      console.log(isMatched);
      if (isMatched) {
        // update password in the database
        const filter = { _id: user._id };

        const updatedAdmin = await updateAdmin(filter, rest);
        if (updatedAdmin?._id) {
          user.password = undefined;
          res.json({
            status: "success",
            message: "Your profile has been updated successfully",
            user,
          });

          // finally, send the email notification
          profileUpdateNotification(user);
          return;
        }
      }
    }

    res.json({
      status: "error",
      message: "Undable to update your profile, try again latere",
    });
  } catch (error) {
    next(error);
  }
});

//update admin password as loggined in user
router.patch("/", updatePasswordValidation, async (req, res, next) => {
  try {
    const { currentPassword, password, email } = req.body;
    //check if user exit for the give email
    const user = await getOneAdmin({ email });
    if (user?._id) {
      // if so, check if the password sotred in the db matches the password sent
      const isMatched = comparePassword(currentPassword, user.password);
      if (isMatched) {
        // encrypt the new password
        const hashsPass = hashPassword(password);

        // update password in the database
        const filter = { _id: user._id };
        const obj = {
          password: hashsPass,
        };
        const updatedAdmin = await updateAdmin(filter, obj);
        if (updatedAdmin?._id) {
          res.json({
            status: "success",
            message: "New password has been updated",
          });

          // finally, send the email notification
          profileUpdateNotification(user);
          return;
        }
      }
    }

    res.json({
      status: "error",
      message: "Invalid current password",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
