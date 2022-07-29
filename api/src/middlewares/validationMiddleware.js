import Joi from "joi";
import {
  ADDRESS,
  DOB,
  EMAIL,
  FNAME,
  joiValidator,
  LNAME,
  LONGSTR,
  PASSWORD,
  PHONE,
  SHORTSTR,
  STATUS,
  OTP,
} from "./validationCosntant.js";

export const adminRegistrationValidation = (req, res, next) => {
  const schema = Joi.object({
    fName: FNAME,
    lName: LNAME,
    dob: DOB,
    phone: PHONE,
    email: EMAIL,
    password: PASSWORD,
    address: ADDRESS,
  });
  joiValidator(schema, req, res, next);
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL,
    password: PASSWORD,
  });

  joiValidator(schema, req, res, next);
};

export const newcategoryValidation = (req, res, next) => {
  req.body.parentCatId = req.body.parentCatId ? req.body.parentCatId : null;
  const schema = Joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    parentCatId: SHORTSTR.allow(null),
  });

  joiValidator(schema, req, res, next);
};

export const updateCategoryValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: SHORTSTR.required(),
    status: STATUS,
    name: SHORTSTR.required(),
    parentCatId: SHORTSTR.allow(null, ""),
  });

  joiValidator(schema, req, res, next);
};

export const paymentMethodValidation = (req, res, next) => {
  const schema = Joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    description: LONGSTR.allow(null, ""),
  });

  joiValidator(schema, req, res, next);
};
export const updatePaymentMethodValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: SHORTSTR.required(),
    status: STATUS,
    name: SHORTSTR.required(),
    description: LONGSTR.allow(null, ""),
  });

  joiValidator(schema, req, res, next);
};

// ===== admin profile

export const updatePasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL,
    currentPassword: PASSWORD,
    password: PASSWORD,
  });

  joiValidator(schema, req, res, next);
};

export const updateAdminProfileValidation = (req, res, next) => {
  const schema = Joi.object({
    fName: FNAME,
    lName: LNAME,
    dob: DOB,
    phone: PHONE,
    email: EMAIL,
    currentPassword: PASSWORD,
    address: ADDRESS,
  });

  joiValidator(schema, req, res, next);
};

export const resetPasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL,
    otp: OTP.required(),
    password: PASSWORD,
  });

  joiValidator(schema, req, res, next);
};
