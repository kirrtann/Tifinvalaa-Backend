const bcrypt = require('bcryptjs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { createUser, getUserByemail, CreateBusiness } = require('../models/userModel');

const signup = async (req, res) => {
  const { email, password, name, mobile_number, address, role } = req.body;

  // Check if user already exists
  const existingUser = await getUserByemail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Exail already exists' });
  }
  // Hash the password
  // const salt = await bcrypt.genSalt(10);
  // const passwordHash = await bcrypt.hash(password, salt);
  // Create user in the database
  const newUser = await createUser(email, password, name, mobile_number, address, role);
  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({ message: 'User created successfully' });
};

const login = async (req, res) => {
  const { email, password, role } = req.body;

  // Find user by email
  const user = await getUserByemail(email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid Email ' });
  }

  // Compare passwords

  if (password !== user.password) {
    return res.status(400).json({ message: 'Invalid  PassWord' });
  }



  if (role !== user.role) {
    return res.status(400).json({ message: 'Invalid Role' });
  }
  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful', token });
};

const business = async (req, res) => {
  const { image, business_name, mobile_number, address } = res.body;
  const businessData = await CreateBusiness(image, business_name, mobile_number, address)
}
module.exports = { signup, login, business };
