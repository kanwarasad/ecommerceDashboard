require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  if (!process.env.TOKEN_KEY) {
    throw new Error("TOKEN_KEY environment variable is not set");
  }
  
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60, // Token expires in 3 days
  });
};
