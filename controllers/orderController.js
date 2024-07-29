const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');
const { getSocket } = require('../config/socket');

const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { paymentMethod, deliveryAddress } = req.body;

    // Fetch the cart for the user
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Prepare order items
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    // Create a new order
    const order = new Order({
      user: userId,
      items: orderItems,
      totalPrice: cart.totalPrice,
      paymentMethod,
      deliveryAddress
    });

    // Save the order
    await order.save();

    // Clear the cart
    await Cart.deleteOne({ user: userId });

    // Get the socket instance
    const io = getSocket();

    // Emit the 'orderCreated' event
    io.emit('orderCreated', order);

    // Check stock levels and update them
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      product.stock -= item.quantity;
      await product.save();

      // Emit 'lowStock' event if stock is low
      if (product.stock <= 10) {
        io.emit('lowStock', product);
      }
    }

    // Respond with the created order
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrder
};
