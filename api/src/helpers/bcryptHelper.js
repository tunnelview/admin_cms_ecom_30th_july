import bcrypt from "bcryptjs";
const salt = 10;
const testArg = [];

export const hashPassword = (val) => {
  return bcrypt.hashSync(val, salt);
};
export const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
