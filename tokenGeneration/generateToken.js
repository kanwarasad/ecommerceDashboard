require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  if (!process.env.TOKEN_KEY) {
    throw new Error("TOKEN_KEY environment variable is not set");
  }
  
  return jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.TOKEN_KEY, {
    expiresIn: 1 * 24 * 60 * 60, // Token expires in 3 days
    // expiresIn: 30 * 60, // Token expires in 30 minutes
  });
};
