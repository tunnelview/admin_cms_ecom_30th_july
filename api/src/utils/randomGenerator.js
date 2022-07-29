export const randomNumberGenerator = (length) => {
  let numb = "";
  for (let i = 0; i < length; i++) {
    numb += Math.floor(Math.random() * 10); // 0. -0.99999
  }
  return numb;
};
