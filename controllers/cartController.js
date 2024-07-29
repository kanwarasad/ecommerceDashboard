const Cart = require('../models/cart');
const Product = require('../models/product');
const { getSocket } = require('../config/socket');

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    const cartItem = cart.items.find(item => item.product.equals(productId));
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    cart.totalPrice += product.price * quantity;
    await cart.save();

    const io = getSocket();
    io.emit('cartUpdated', cart);

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToCart,
  getCart
};
