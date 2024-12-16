const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');  // Adjust the path to your model

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });  // Load environment variables
const adminUser = {
  fullname: 'Admin',
  email: 'admin12@gmail.com',
  phone: '9896123211',
  role: 'admin',
  password: 'admin12',
  address: 'india',
};

const adminSeed = async () => {
  try {
    // Check if the MONGO_URI is loaded correctly
    console.log(process.env.MONGO_URI);  // Debugging line to check if MONGO_URI is loaded
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Check if the admin user already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminUser.password, 10);

    // Create the admin user
    const user = new User({
      ...adminUser,
      password: hashedPassword,
    });

    // Save the admin user to the database
    await user.save();
    console.log('Admin user created successfully');

  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

// Call the seed function
adminSeed();
