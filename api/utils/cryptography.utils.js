const md5 = require('md5');
const jwt = require('jsonwebtoken');
const md5HashSecret = process.env.MD5_SECRET;
const jwtHashSecret = process.env.JWT_SECRET;
const jwtTimeLimit = process.env.MD5_VALID_TIME;

const createHash = (senha) => {
  return md5(senha + md5HashSecret)
};

const createToken = (model) => {
  return jwt.sign({ ...model},jwtHashSecret, {
    expiresIn: `${jwtTimeLimit}ms`
  })
};

const validateToken = (token) => {
  try {
    return jwt.verify(token, jwtHashSecret);
  } catch (error) {
    return undefined;
  }
};

module.exports = {
  createHash,
  createToken,
  validateToken,
}