// controllers/adminController.js
// const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Category = require('../models/category'); // Adjust the path according to your project structure




const createSecretToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.TOKEN_KEY, { expiresIn: '1d' });
};

// const registerAdmin = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const oldAdmin = await Admin.findOne({ email });

//     if (oldAdmin) {
//       return res.status(409).json({ error: 'Admin already exists' });
//     }

//     const newAdmin = new Admin({ name, email, password });
//     await newAdmin.save();

//     res.status(201).json({ message: 'Admin registered successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = createSecretToken(admin._id);

    res.cookie('token', token, {
      path: '/',
      expires: new Date(Date.now() + 86400000),
      secure: true,
      httpOnly: true,
      sameSite: 'None'
    });

    res.json({ message: 'Admin logged in successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const dashboard = (req, res) => {
  res.send('Welcome to the admin dashboard.');
};


const createCategory = async (req, res) => {
  try {
    const { name, slug, link } = req.body;
    const category = new Category({ name, slug, link });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  // registerAdmin,
   loginAdmin,
   dashboard,
   createCategory
   };

