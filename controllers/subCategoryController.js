// controllers/subCategoryController.js
const SubCategory = require('../models/subCategory');
const mongoose = require('mongoose');
const { getSocket } = require('../config/socket');


// Create a new subcategory
createSubCategory = async (req, res) => {
  try {
    const { name, slug, link, isFeatured, isNewArrival } = req.body;
    const newSubCategory = new SubCategory({
      name,
      slug,
      link,
      isFeatured,
      isNewArrival
    });
    await newSubCategory.save();

    const io = getSocket();
    io.emit('createSubCategory', subCategories); // Emit real-time event
    

    res.status(201).json(newSubCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Change new arrivals to featured subcategories
changeNewArrivalToFeatured = async (req, res) => {
  try {
    const { months = 2 } = req.body;
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - months);

    const updatedSubCategories = await SubCategory.updateMany(
      { isNewArrival: true, createdAt: { $lte: cutoffDate } },
      { $set: { isNewArrival: false, isFeatured: true } }
    );

    res.status(200).json({ message: "Updated new arrivals to featured", updatedSubCategories });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all featured subcategories
getFeaturedSubCategories = async (req, res) => {
  try {
    const featuredSubCategories = await SubCategory.find({ isFeatured: true });
    res.status(200).json(featuredSubCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all new arrival subcategories
getNewArrivalSubCategories = async (req, res) => {
  try {
    const newArrivalSubCategories = await SubCategory.find({ isNewArrival: true });
    res.status(200).json(newArrivalSubCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all subcategories
getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Soft delete a subcategory
// softDeleteSubCategories = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const subCategory = await SubCategory.findByIdAndUpdate(id, { $set: { isActive: false } }, { new: true });
//     if (!subCategory) {
//       return res.status(404).json({ error: "Subcategory not found" });
//     }
//     res.status(200).json(subCategory);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
const softDeleteSubCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategories = await SubCategory.findById(id);
    if (!subCategories) {
      return res.status(404).json({ message: 'SubCategories not found' });
    }

    subCategories.isActive = false;
    await subCategories.save();

  
    const io = getSocket();
    io.emit('softDeleteSubCategories', subCategories); // Emit real-time event

    res.status(200).json({ message: 'SubCategories deleted successfully (deactivated)' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 module.exports = {
  createSubCategory,
  changeNewArrivalToFeatured,
  getFeaturedSubCategories,
  getNewArrivalSubCategories,
  getAllSubCategories,
  softDeleteSubCategories
  };













// const mongoose = require('mongoose');
// const SubCategory = require('../models/subCategory');

// const createSubCategory = async (req, res) => {
//   try {
//     const { name, slug, link, isFeatured, isNewArrival } = req.body;

//     // Validate category ObjectId
//     if (!mongoose.Types.ObjectId.isValid(subcategory)) {
//       return res.status(400).json({ error: 'Invalid sub category ID format' });
//     }

//     const subCategory = new SubCategory({ name, slug, link, isFeatured, isNewArrival });
//     await subCategory.save();

//     res.status(201).json(subCategory);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const changeNewArrivalToFeatured = async (req, res) => {
//   try {
//     const subCategoryId = req.params.id;
//     const subCategory = await SubCategory.findById(subCategoryId);

//     if (!subCategory) {
//       return res.status(404).json({ message: 'SubCategory not found' });
//     }

//     subCategory.isNewArrival = false;
//     subCategory.isFeatured = true;
//     await subCategory.save();

//     res.status(200).json({ message: 'SubCategory changed from new arrival to featured' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getFeaturedSubCategories = async (req, res) => {
//   try {
//     const featuredSubCategories = await SubCategory.find({ isFeatured: true });
//     res.status(200).json(featuredSubCategories);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getNewArrivalSubCategories = async (req, res) => {
//   try {
//     const newArrivalSubCategories = await SubCategory.find({ isNewArrival: true });
//     res.status(200).json(newArrivalSubCategories);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // New function to get all subcategories
// const getAllSubCategories = async (req, res) => {
//   try {
//     const allSubCategories = await SubCategory.find();
//     res.status(200).json(allSubCategories);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// const softDeleteSubCategories = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const subCategories = await SubCategory.findById(id);
//     if (!subCategories) {
//       return res.status(404).json({ message: 'SubCategories not found' });
//     }

//     subCategories.isActive = false;
//     await subCategories.save();
//     res.status(200).json({ message: 'SubCategories deleted successfully (deactivated)' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// module.exports = {
//   createSubCategory,
//   changeNewArrivalToFeatured,
//   getFeaturedSubCategories,
//   getNewArrivalSubCategories,
//   getAllSubCategories,
//   softDeleteSubCategories
// };





















// // controllers/productController.js

// // const Product = require('../models/product');
// const mongoose = require('mongoose'); 
// // const Product = require('../models/product');
// const Product = require('./../models/product');
// // const FeaturedProduct = require('./../models/featuredProduct');
// // const NewArrivalProduct = require('./../models/newArrivalProduct');
// const createProduct = async (req, res) => {
//     try {
//       const productData = req.body;
//       const product = new Product(productData);
//       await product.save();
  
//       if (productData.isFeatured) {
//         const featuredProduct = new FeaturedProduct({ product });
//         await featuredProduct.save();
//       }
  
//       if (productData.isNewArrival) {
//         const newArrivalProduct = new NewArrivalProduct({ product });
//         await newArrivalProduct.save();
//       }
  
//       res.status(201).json(product);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   const changeNewArrivalToFeatured = async (req, res) => {
//     try {
//       const productId = req.params.id;
  
//       // Validate productId
//       if (!mongoose.Types.ObjectId.isValid(productId)) {
//         return res.status(400).json({ error: 'Invalid product ID format' });
//       }
  
//       const newArrivalProduct = await NewArrivalProduct.findOne({ 'product._id': productId });
  
//       if (newArrivalProduct) {
//         // Remove from New Arrival Products
//         await NewArrivalProduct.deleteOne({ 'product._id': productId });
  
//         // Add to Featured Products
//         const featuredProduct = new FeaturedProduct({ product: newArrivalProduct.product });
//         await featuredProduct.save();
  
//         res.status(200).json({ message: 'Product changed from new arrival to featured' });
//       } else {
//         res.status(404).json({ message: 'New arrival product not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   //   const changeNewArrivalToFeatured = async (req, res) => {
// //     try {
// //       const productId = new mongoose.Types.ObjectId(req.params.id); // Ensure productId is treated as ObjectId
// //       const newArrivalProduct = await NewArrivalProduct.findOne({ 'product._id': productId });
  
// //       if (newArrivalProduct) {
// //         // Remove from New Arrival Products
// //         await NewArrivalProduct.deleteOne({ 'product._id': productId });
  
// //         // Add to Featured Products
// //         const featuredProduct = new FeaturedProduct({ product: newArrivalProduct.product });
// //         await featuredProduct.save();
  
// //         res.status(200).json({ message: 'Product changed from new arrival to featured' });
// //       } else {
// //         res.status(404).json({ message: 'New arrival product not found' });
// //       }
// //     } catch (error) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   };






// //   const changeNewArrivalToFeatured = async (req, res) => {
// //     try {
// //       const productId = req.params.id;
// //       const newArrivalProduct = await NewArrivalProduct.findOne({ 'product._id': productId });
  
// //       if (newArrivalProduct) {
// //         // Remove from New Arrival Products
// //         await NewArrivalProduct.deleteOne({ 'product._id': productId });
  
// //         // Add to Featured Products
// //         const featuredProduct = new FeaturedProduct({ product: newArrivalProduct.product });
// //         await featuredProduct.save();
  
// //         res.status(200).json({ message: 'Product changed from new arrival to featured' });
// //       } else {
// //         res.status(404).json({ message: 'New arrival product not found' });
// //       }
// //     } catch (error) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   };
  
//   const getFeaturedProducts = async (req, res) => {
//     try {
//       const featuredProducts = await FeaturedProduct.find();
//       res.status(200).json(featuredProducts);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   const getNewArrivalProducts = async (req, res) => {
//     try {
//       const newArrivalProducts = await NewArrivalProduct.find();
//       res.status(200).json(newArrivalProducts);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   module.exports = {
//     createProduct,
//     changeNewArrivalToFeatured,
//     getFeaturedProducts,
//     getNewArrivalProducts
//   };
  











//  post  http://localhost:3000/api/products

// {
//     "name": "Sample Product",
//     "category": "60c72b2f9b1e8a5c887f51cd",  // Replace with a valid category ObjectId from your database
//     "isFeatured": true,
//     "isNewArrival": false
//   }
  

//   get http://localhost:3000/api/products/new-arrivals
//   get http://localhost:3000/api/products/featured


// put http://localhost:3000/api/products/{productId}/feature

//put http://localhost:3000/api/products/669e94dc20f20f16c3dec66b/feature
