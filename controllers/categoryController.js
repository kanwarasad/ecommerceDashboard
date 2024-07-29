//categoryController
const mongoose = require('mongoose');
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');
const {getsocket} = require('../config/socket');
// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('subCategories');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('subCategories');
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new category with subcategories
const createCategory = async (req, res) => {
    const { name, slug, link, subCategoryIds } = req.body;

    try {
        const category = new Category({
            name,
            slug,
            link,
            subCategories: subCategoryIds
        });

        const newCategory = await category.save();

        const io = getSocket();
        io.emit('createCategory', category); // Emit real-time event
        
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a category with subcategories
const updateCategory = async (req, res) => {
    const { name, slug, link, subCategoryIds } = req.body;

    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (name != null) {
            category.name = name;
        }
        if (slug != null) {
            category.slug = slug;
        }
        if (link != null) {
            category.link = link;
        }
        if (subCategoryIds != null) {
            category.subCategories = subCategoryIds;
        }

        const updatedCategory = await category.save();

    const io = getSocket();
    io.emit('updatedCategory', category); // Emit real-time event



        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Soft delete a category
const softDeleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.isActive = false;
        await category.save();

    const io = getSocket();
    io.emit('softDeleteCategory', category); // Emit real-time event

        
        res.status(200).json({ message: 'Category deleted successfully (deactivated)' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    softDeleteCategory
};





























// const Category = require('../models/category');
// const SubCategory = require('../models/subCategory');
// const mongoose = require('mongoose');

// // Get all categories
// const getCategories = async (req, res) => {
//     try {
//         const categories = await Category.find().populate('subCategory');
//         res.status(200).json(categories);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get category by ID
// const getCategoryById = async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.id).populate('subCategory');
//         if (!category) {
//             return res.status(404).json({ message: 'Category not found' });
//         }
//         res.status(200).json(category);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Create a new category
// const createCategory = async (req, res) => {
//     const { name, slug, link, subCategoryIds } = req.body;

//     try {
//         const subCategory = await SubCategory.findById(subCategoryId);
//         if (!subCategory) {
//             console.log("sub---------->", subCategory);
//             return res.status(404).json({ message: 'SubCategory not found' });
//         }

//         const category = new Category({
//             name,
//             slug,
//             link,
//             subCategories: subCategoryIds
//         });


//         // const category = new Category({
//         //     subCategory: subCategoryId,
//         //     name,
//         //     slug,
//         //     link
//         // });

//         const newCategory = await category.save();
//         res.status(201).json(newCategory);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Update a category
// const updateCategory = async (req, res) => {
//     const { name, slug, link, subCategoryId } = req.body;

//     try {
//         const category = await Category.findById(req.params.id);
//         if (!category) {
//             return res.status(404).json({ message: 'Category not found' });
//         }

//         if (name != null) {
//             category.name = name;
//         }
//         if (slug != null) {
//             category.slug = slug;
//         }
//         if (link != null) {
//             category.link = link;
//         }
//         if (subCategoryId != null) {
//             const subCategory = await SubCategory.findById(subCategoryId);
//             if (!subCategory) {
//                 return res.status(404).json({ message: 'SubCategory not found' });
//             }
//             category.subCategory = subCategoryId;
//         }

//         const updatedCategory = await category.save();
//         res.status(200).json(updatedCategory);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Soft delete a category
// const softDeleteCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const category = await Category.findById(id);
//         if (!category) {
//             return res.status(404).json({ message: 'Category not found' });
//         }

//         category.isActive = false;
//         await category.save();
//         res.status(200).json({ message: 'Category deleted successfully (deactivated)' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = {
//     getCategories,
//     getCategoryById,
//     createCategory,
//     updateCategory,
//     softDeleteCategory
// };





























// const Category = require('../models/category');

// // Get all categories
// const getCategories = async (req, res) => {
//     try {
//         const categories = await Category.find();
//         res.status(200).json(categories);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get category by ID
// const getCategoryById = async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.id);
//         if (!category) {
//             return res.status(404).json({ message: 'Category not found' });
//         }
//         res.status(200).json(category);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Create a new category
// const createCategory = async (req, res) => {
//     const category = new Category({
//         name: req.body.name,
//         slug: req.body.slug,
//         link: req.body.link
//     });

//     try {
//         const newCategory = await category.save();
//         res.status(201).json(newCategory);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Update a category
// const updateCategory = async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.id);
//         if (!category) {
//             return res.status(404).json({ message: 'Category not found' });
//         }

//         if (req.body.name != null) {
//             category.name = req.body.name;
//         }
//         if (req.body.slug != null) {
//             category.slug = req.body.slug;
//         }
//         if (req.body.link != null) {
//             category.link = req.body.link;
//         }

//         const updatedCategory = await category.save();
//         res.status(200).json(updatedCategory);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Delete a category
// // const deleteCategory = async (req, res) => {
// //     try {
// //         let id = req.params.id
// //        let a = await Category.findByIdAndDelete(id)
// //                 console.log("Deleted : ", a); 
// //             // }
// //         // const category = await Category.findById(req.params.id);
// //         // if (!category) {
// //         //     return res.status(404).json({ message: 'Category not found' });
// //         // }

// //         // // await category.findByIdAndDelete(req.params.id);
// //         // await category.deleteOne({req.params.id});
// //         res.status(200).json({ message: 'Category deleted' });
// //         console.log("find and delete ----> ", category,req.params.id );
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// const softDeleteCategory = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const categories = await Category.findById(id);
//       if (!categories) {
//         return res.status(404).json({ message: 'Categories not found' });
//       }
  
//       categories.isActive = false;
//       await categories.save();
//       res.status(200).json({ message: 'Categories deleted successfully (deactivated)' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
// module.exports = {
//     getCategories,
//     getCategoryById,
//     createCategory,
//     updateCategory,
//     softDeleteCategory
// };
