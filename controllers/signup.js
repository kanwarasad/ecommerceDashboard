const User = require("../models/user");

const { createSecretToken } = require("../tokenGeneration/generateToken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {

    const { name, username, email, password } = req.body;
    
    if (!(name && username && email && password)) {
      return res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });
    
    // if (
    //   !(
    //       req.body.name &&
    //       req.body.username &&
    //       req.body.email &&
    //       req.body.password 
    //   )
    // ) {
    //   res.status(400).send("All input is required");
    // }

    // const oldUser = await User.findOne({ email: req.body.email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const salt = 10;
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      // name: req.body.name,

      // username: req.body.username,
      // email: req.body.email,
      name,
      username,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      path: "/", // Cookie is accessible from all paths
      expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      secure: true, // Cookie will only be sent over HTTPS
      httpOnly: true, // Cookie cannot be accessed via client-side scripts
      sameSite: "None",
    });

    console.log("cookie set succesfully");

    res.json(user);
  } catch (error) {
    console.log("Gott an error", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = createUser;