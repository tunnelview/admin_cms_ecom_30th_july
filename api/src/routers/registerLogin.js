import express from "express";
import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js";
import {
  adminRegistrationValidation,
  loginValidation,
  resetPasswordValidation,
} from "../middlewares/validationMiddleware.js";
import {
  crateNewAdmin,
  getOneAdmin,
  updateAdmin,
} from "../models/adminUser/AdminUserModel.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import {
  emailPasswordResetOTP,
  profileUpdateNotification,
  sendAdminUserVerificationMail,
} from "../helpers/emailHelper.js";
import { randomNumberGenerator } from "../utils/randomGenerator.js";
import {
  deleteSession,
  insertSession,
} from "../models/session/SessionModel.js";
import e from "express";

router.post("/", adminRegistrationValidation, async (req, res, next) => {
  try {
    //1. encrypt password
    req.body.password = hashPassword(req.body.password);

    const verificationCode = uuidv4();
    req.body.verificationCode = verificationCode;
    //2. call model to run save query
    const result = await crateNewAdmin(req.body);

    if (result?._id) {
      //3. unique url endpoint and sent that to customer.
      sendAdminUserVerificationMail(result);
      return res.json({
        status: "success",
        message:
          "We have sent you an email, please check email and follow the instruction to activate your account.",
      });
    }

    res.json({
      status: "error",
      message: "Unable to craete an user, please try again later.",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message =
        "There is already a register user with this email, pelase login with this email or use different emal.";
    }
    next(error);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const { email, verificationCode } = req.body;
    if (email && verificationCode) {
      const filter = { email, verificationCode };
      const obj = {
        status: "active",
        verificationCode: "",
      };

      const result = await updateAdmin(filter, obj);

      if (result?._id) {
        return res.json({
          status: "success",
          message: "You account has been activated, you may sing in now!",
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid or expired link",
    });
  } catch (error) {
    next(error);
  }
});

//admin user login
router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await getOneAdmin({ email });

    if (result?._id) {
      // check if the passowd from databas end the password that client sent matches
      const isMatched = comparePassword(password, result.password);

      result.password = undefined;

      if (isMatched) {
        return result.status === "active"
          ? res.json({
              status: "success",
              message: "Login success",
              result,
            })
          : res.json({
              status: "error",
              message:
                "Your account is inactive, Please check your email and follow the instruction to very the accout.",
            });
      }
    }

    res.json({
      status: "error",
      message: "Invalid login credientials",
    });
  } catch (error) {
    next(error);
  }
});

//request OTP for password rest
router.post("/otp-request", async (req, res, next) => {
  try {
    const { email } = req.body;

    if (email.length > 4 && email.length < 50) {
      // find if user exist for the given email
      const user = await getOneAdmin({ email });
      if (user?._id) {
        //generate randmon 6 digit OTP
        const otpLength = 6;
        const otp = randomNumberGenerator(otpLength);
        const obj = {
          token: otp,
          associate: email,
          type: "updatePassword",
        };
        const result = await insertSession(obj);
        if (result?._id) {
          //send opt to the user email
          const mailInfo = {
            fName: user.fName,
            email: user.email,
            otp,
          };
          emailPasswordResetOTP(mailInfo);
        }
      }
    }

    res.json({
      status: "success",
      message:
        "If this email exist in our system, we will send you and OTP, Please check your email and follow the instruction.",
    });
  } catch (error) {
    next(error);
  }
});

//reset new password

router.patch("/password", resetPasswordValidation, async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    const filter = {
      token: otp,
      associate: email,
      type: "updatePassword",
    };
    //first check if otp and email combination exist in the session table and delet it
    const isDeleted = await deleteSession(filter);
    if (isDeleted?._id) {
      // ecrypt password
      const obj = {
        password: hashPassword(password),
      };

      // update password in the admin user table
      const result = await updateAdmin({ email }, obj);
      if (result?._id) {
        // send email notification of account update
        profileUpdateNotification(result);
        return res.json({
          status: "success",
          message: "Your password has been updated, You may login now",
        });
      }
    }

    res.json({
      status: "error",
      message: "Unable to rest your password, try again later",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
