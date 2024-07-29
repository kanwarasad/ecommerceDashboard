// controllers/adminController.js
const Category = require('../models/category'); // Adjust the path according to your project structure

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
  dashboard,
  createCategory
};
