// controllers/reviewController.js
const Review = require('../models/review');
const Product = require('../models/product');
const { getSocket } = require('./../config/socket');


const createReview = async (req, res) => {
  try {
    const { productId, comment, rating } = req.body;
    const userId = req.user._id;

    const review = new Review({ user: userId, product: productId, comment, rating });
    await review.save();


    const io = getSocket();
    io.emit('createReview', review); // Emit real-time event

    // Update product ratings and number of reviews
    const product = await Product.findById(productId);
    product.numberOfReviews += 1;
    product.ratings = ((product.ratings * (product.numberOfReviews - 1)) + rating) / product.numberOfReviews;
    await product.save();

    // io.emit('createReview', product); // Emit real-time event

    
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate('user', 'name');

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByProduct
};
