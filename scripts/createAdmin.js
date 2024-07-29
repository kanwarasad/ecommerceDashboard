// scripts/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust the path according to your project structure

const createAdminUser = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/yourDatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const existingAdmin = await User.findOne({ email: 'asad@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('adminPassword', salt);

    const admin = new User({
      name: 'Admin',
      username: 'admin',
      email: 'asad@gmail.com',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();
