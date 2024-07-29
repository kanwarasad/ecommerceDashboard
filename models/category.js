// models/category.js
// models/category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  link: { type: String, required: true },
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categorySchema);
























// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   // subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  
//   name: { type: String, required: true },
//   slug: { type: String, required: true },
//   link: { type: String, required: true },
//   isActive: { type: Boolean, default: true }
// });

// module.exports = mongoose.model('Category', categorySchema);












// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
//   name: { type: String, required: true },
//   slug: { type: String, required: true },
//   link: { type: String, required: true }
// });

// module.exports = mongoose.model('Category', categorySchema);
