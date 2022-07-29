import PyamentMethodSchema from "./PaymentMethodSchema.js";

// CRUD

export const createPaymentMethod = (obj) => {
  return PyamentMethodSchema(obj).save();
};

export const getPaymentMethods = () => {
  return PyamentMethodSchema.find();
};

//@filter must be an Object
export const getSinglePaymentMethod = (filter) => {
  return PyamentMethodSchema.findOne(filter);
};

//both  @update must be an object
export const updatePaymentMethodByID = ({ _id, ...update }) => {
  return PyamentMethodSchema.findByIdAndUpdate(_id, update, { new: true });
};

export const deletePaymentMethodById = (_id) => {
  return PyamentMethodSchema.findByIdAndDelete(_id); //"jhkhg4khkl3"
};
