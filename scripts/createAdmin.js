const dotenv = require("dotenv");
const mongoose = require('mongoose');
const User = require('../models/user'); // Adjust the path as needed
const bcrypt = require('bcrypt');

// Load environment variables from .env file
dotenv.config();

const createAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error('Admin email or password is not set in the environment variables');
    }

    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      // const adminUser = new User({
      //   email: adminEmail,
      //   password: hashedPassword,
      //   role: 'admin' // Set the role to 'admin'
      // });

      // await adminUser.save();
      // console.log('Admin user created');
    } 
    // else {
    //   // console.log('Admin user already exists');
    // }
  } 
  catch (err) {
    // console.error('Error creating admin user:', err);
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected');
    createAdminUser().then(() => mongoose.disconnect());
  })
  .catch(err => console.error('Database connection error:', err));























// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const User = require('../models/user'); // Adjust the path according to your project structure

// const createAdminUser = async () => {
//   // try {
//   //   await mongoose.connect('mongodb://127.0.0.1:27017/yourDatabase', {
//   //     useNewUrlParser: true,
//   //     useUnifiedTopology: true
//   //   });

//     const existingAdmin = await User.findOne({ email: 'asad@gmail.com' });
//     if (existingAdmin) {
//       console.log('Admin user already exists.');
//       return;
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash('adminPassword', salt);

//     const admin = new User({
//       name: 'Admin',
//       username: 'admin',
//       email: 'asad@gmail.com',
//       password: hashedPassword,
//       role: 'admin'
//     });

//     await admin.save();
//     console.log('Admin user created successfully.');
//   } catch (error) {
//     console.error('Error creating admin user:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// };

// createAdminUser();
