//server.js
const dotenv = require("dotenv");
const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const dbconnection = require("./config/db");

const categoryRoute = require("./routes/categoryRoutes");
// const subCategoryRoutes = require("./routes/subCategoryRoutes");
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { initSocket } = require('./config/socket');

const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// console.log("categoryRoute:", categoryRoute);
// console.log("subCategoryRoutes:", subCategoryRoutes);
// console.log("productRoutes:", productRoutes);
// console.log("reviewRoutes:", reviewRoutes);
// console.log("userRoutes:", userRoutes);

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 8000;
const server = http.createServer(app);
const io = initSocket(server); //this can replace with another variable by assigning app to another veriable


// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json()); // Add this line to handle JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve static files
app.use(cookieParser());


// Set CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // Replace with your frontend domain
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, etc.)
  next();
});

// Define routes
app.use("/api/categories", categoryRoute);
// app.use('/api/subcategories', subCategoryRoutes);

app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Call the dbconnection function and log the connection status
dbconnection("Database")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });


  // module.exports = { app, io };























// const dotenv = require("dotenv");
// const express = require("express");
// const cookieParser = require("cookie-parser");
// const dbconnection = require("./database/db");
// const categoryRoute = require("./routes/categoryRoutes");
// const subCategoryRoutes = require("./routes/subCategoryRoutes"); // Correct path
// const productRoutes = require("./routes/productRoutes");
// const reviewRoutes = require('./routes/reviewRoutes');
// const userRoutes = require('./routes/userRoutes');
// const bodyParser = require('body-parser');

// // Load environment variables from .env file
// dotenv.config();

// const app = express();
// const PORT = 8000;

// // Middleware to parse JSON and URL-encoded data
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use(cookieParser());

// app.use(bodyParser.json()); // Add this line to handle JSON payloads
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());


// // Set CORS headers
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // Replace with your frontend domain
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, etc.)
//   next();
// });

// // Define routes
// app.use("/api/categories", categoryRoute);
// app.use('/api/subcategories', subCategoryRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/reviews', reviewRoutes);
// app.use('/api/users', userRoutes);

// // app.use("/api", authRoute);
// // app.use("/api", categoryRoute);
// // app.use('/api', subCategoryRoutes);
// // app.use('/api', productRoutes);
// // app.use('/api', reviewRoutes);
// // app.use('/api', userRoutes);
// // app.use('./api'), 
// // Call the dbconnection function and log the connection status
// dbconnection("Database")
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running on PORT ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Failed to connect to the database", err);
//   });













// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const categoryRoutes = require('./routes/categoryRoutes');
// const productRoutes = require('./routes/productRoutes');

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api', categoryRoutes);
// app.use('/api', productRoutes);

// // MongoDB Connection
// mongoose.connect('mongodb://127.0.0.1:27017/ecommerce').then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Failed to connect to MongoDB', err);
// });

// // Start Server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
