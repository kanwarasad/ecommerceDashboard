const Product = require('../models/product');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const createProduct = async (req, res) => {
  try {
    const { name, category, subcategory, description, price, size, color, stock, brand, isFeatured, isNewArrival, images } = req.body;
    const product = new Product({ name, category, subcategory, description, price, size, color, stock, brand, isFeatured, isNewArrival, images });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    updates.updatedAt = Date.now();

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const softDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.isActive = false;
    await product.save();
    res.status(200).json({ message: 'Product Deleted Successfully (deactivated)' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changeNewArrivalToFeatured = async () => {
  try {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    await Product.updateMany(
      { isNewArrival: true, createdAt: { $lt: twoMonthsAgo } },
      { $set: { isNewArrival: false, isFeatured: true } }
    );

    console.log('New arrivals older than two months have been updated to featured products');
  } catch (error) {
    console.error('Error updating new arrivals to featured products:', error);
  }
};

// Schedule the changeNewArrivalToFeatured function to run daily
setInterval(changeNewArrivalToFeatured, 24 * 60 * 60 * 1000);

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  getAllProducts,
  softDeleteProduct,
  changeNewArrivalToFeatured
};





















// const Product = require('../models/product');

// // Create a new product
// const createProduct = async (req, res) => {
//   try {
//     const { category, subCategory, type, color, name, price, imageUrl, description } = req.body;

//     // Validate category and subCategory ObjectIds
//     if (!mongoose.Types.ObjectId.isValid(category) || !mongoose.Types.ObjectId.isValid(subCategory)) {
//     return res.status(400).json({ error: 'Invalid category or subCategory ID format' });
//     }

//     const newProduct = new Product({
//       category,
//       subCategory,
//       type,
//       color,
//       name,
//       price,
//       imageUrl,
//       description
//     });

//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get all products
// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find().populate('category').populate('subCategory');
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get a single product by ID
// const getProductById = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findById(productId).populate('category').populate('subCategory');

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update a product
// const updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true }).populate('category').populate('subCategory');

//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete a product
// const deleteProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const deletedProduct = await Product.findByIdAndDelete(productId);

//     if (!deletedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   createProduct,
//   getAllProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct
// };
