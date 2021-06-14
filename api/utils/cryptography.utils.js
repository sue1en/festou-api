const md5 = require('md5');
const jwt = require('jsonwebtoken');
const md5HashSecret = process.env.MD5_SECRET;
const jwtHashSecret = process.env.JWT_SECRET;
const jwtTimeLimit = process.env.JWT_VALID_TIME;

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
    jwt.verify(token, jwtHashSecret);
    return true;
  } catch (error) {
    return false;
  }
};

const decodeToken = (token) => {
  return jwt.decode(token);
}

module.exports = {
  createHash,
  createToken,
  validateToken,
  decodeToken
}