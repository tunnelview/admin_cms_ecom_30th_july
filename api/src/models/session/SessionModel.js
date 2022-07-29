import SessionSchema from "./sessionSchema.js";

//create
export const insertSession = (obj) => {
  return SessionSchema(obj).save();
};

// read , @filter must be an object
export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};

// delete, @filter must be an object
export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};
