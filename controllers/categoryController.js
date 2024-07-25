const Category = require('../models/category');

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    const category = new Category({
        name: req.body.name,
        slug: req.body.slug,
        link: req.body.link
    });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (req.body.name != null) {
            category.name = req.body.name;
        }
        if (req.body.slug != null) {
            category.slug = req.body.slug;
        }
        if (req.body.link != null) {
            category.link = req.body.link;
        }

        const updatedCategory = await category.save();
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        let id = req.params.id
       let a = await Category.findByIdAndDelete(id)
                console.log("Deleted : ", a); 
            // }
        // const category = await Category.findById(req.params.id);
        // if (!category) {
        //     return res.status(404).json({ message: 'Category not found' });
        // }

        // // await category.findByIdAndDelete(req.params.id);
        // await category.deleteOne({req.params.id});
        res.status(200).json({ message: 'Category deleted' });
        console.log("find and delete ----> ", category,req.params.id );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
