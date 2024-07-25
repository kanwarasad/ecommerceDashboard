const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const dbconnection = require("./database/db");
const authRoute = require("./routes/userRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategory");
const productRoutes = require("./routes/productRoutes");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 8000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use("/api", authRoute);
app.use("/api", categoryRoute);
app.use('/api', subCategoryRoutes);
app.use('/api', productRoutes);
// app.use('./api'), 
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
