// models/category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  link: { type: String, required: true }
});

module.exports = mongoose.model('Category', categorySchema);
