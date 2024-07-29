const Product = require('../models/product');
// const mongoose = require('mongoose');
const { getSocket } = require('./../config/socket');
const cloudinary = require('./../config/cloudinaryConfig'); // Import Cloudinary configuration



const createProduct = async (req, res) => {
  try {
    const { name, category, subcategory, description, price, size, color, stock, brand, isFeatured, isNewArrival } = req.body;
   
      //  // Upload images to Cloudinary
       const imageUploadPromises = req.files.map(file => cloudinary.uploader.upload(file.path));
       const imageUploadResults = await Promise.all(imageUploadPromises);
       const images = imageUploadResults.map(result => result.secure_url);
   
   
      // Get the uploaded images' URLs
    // const images = req.files.map(file => file.path);
   
    const product = new Product({ 
      name, 
      category, 
      subcategory, 
      description, 
      price, 
      size, 
      color, 
      stock, 
      brand, 
      images,
      isFeatured, 
      isNewArrival 
    });

    console.log(JSON.stringify(product)); // Logs 
    console.log("User info: " + JSON.stringify(product)); // 
    document.body.innerHTML = JSON.stringify(product); // Renders
    


    await product.save();
    
    const io = getSocket();
    io.emit('productCreated', product); // Emit real-time event



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

    const io = getSocket();
    io.emit('updateProduct', product); // Emit real-time event

    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    // .populate('category').populate('subcategory').populate('review');
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
    const products = await Product.find({ isActive: true });
    res.status(200).json(products);
    // .populate('category').populate('subcategory');
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

    const io = getSocket();
    io.emit('softDeleteProduct', product); // Emit real-time event



    res.status(200).json({ message: 'Product deleted successfully (deactivated)' });
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

    const io = getSocket();
    io.emit('changeNewArrivalToFeatured'); // Emit real-time event


    res.status(200).json({ message: 'New arrivals older than two months have been updated to featured products' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true, isActive: true });
    // .populate('category').populate('subcategory');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNewArrivalProducts = async (req, res) => {
  try {
    const products = await Product.find({ isNewArrival: true, isActive: true });
    // .populate('category').populate('subcategory');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  changeNewArrivalToFeatured,
  getFeaturedProducts,
  getNewArrivalProducts
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
