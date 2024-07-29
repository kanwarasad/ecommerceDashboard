// models/product.js
// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],
  subcategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true }],
  review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review', required: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  size: { type: [String], required: true }, // e.g., ['S', 'M', 'L', 'XL']
  color: { type: [String], required: true }, // e.g., ['Red', 'Blue', 'Green']
  stock: { type: Number, required: true },
  images: { type: [String], required: true }, // Array of Cloudinary image URLs
  brand: { type: String, required: true, trim: true },
  ratings: { type: Number, default: 5 },
  numberOfReviews: { type: Number, default: 17 },
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;























// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   // category: { type: String, required: true },
//   // subcategory: { type: String, required: true },
//   category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],
//   subcategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true }],
//   review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review', required: true },

//   description: { type: String, required: true, trim: true },
//   price: { type: Number, required: true },
//   size: { type: [String], required: true }, // e.g., ['S', 'M', 'L', 'XL']
//   color: { type: [String], required: true }, // e.g., ['Red', 'Blue', 'Green']
//   stock: { type: Number, required: true },
//   images: { type: [String], required: true }, // Array of Cloudinary image URLs
//   brand: { type: String, required: true, trim: true },
//   ratings: { type: Number, default: 0 },
//   numberOfReviews: { type: Number, default: 0 },
//   isFeatured: { type: Boolean, default: false },
//   isNewArrival: { type: Boolean, default: false },
//   isActive: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });
// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;


















// const mongoose = require('mongoose');
// const category = require('./category');
// const subCategory = require('./subCategory');

// const productSchema = new mongoose.Schema({
//   // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
//   // subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
//   category: { type: string, required: true},
//   subCategory: { type: string, required: true},
//   type: { type: String, required: true }, // E.g., 'Shirts', 'T-shirts'
//   color: { type: String, required: true },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   imageUrl: { type: [String], required: true },
//   description: { type: String, required: true },
//   size: { type: String, required: true },
//   color: { type: String, required: true },
//   brand: { type: String, required: true },
//   rating:{ type:Number, require: true, min:1, max:5 },
//   review:{}
//   isFeatured: { type: Boolean, default: false },
//   isNewArrival: { type: Boolean, default: false },
//   isActive:{ type: Boolean, default: false },
//   isInactive:{ type: Boolean, default: false },
//   Stock:{ type: Number, required: true },
  

// });

// module.exports = mongoose.model('Product', productSchema);
