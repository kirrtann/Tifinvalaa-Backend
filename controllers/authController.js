const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByemail, getUserByMobile } = require('../models/userModel');

// Register a new user
const signup = async (req, res) => {
  const { email, password,name, mobile_number,address } = req.body;

  // Check if user already exists
  const existingUser = await getUserByemail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Exail already exists' });
  }
  // const mobile = await getUserByMobile(mobile_number)
  // if(mobile){
  //   return res.status(400).json({ message: 'Mobile Number  already exists' });
  // }

  // Hash the password
  // const salt = await bcrypt.genSalt(10);
  // const passwordHash = await bcrypt.hash(password, salt);

  // Create user in the database
  const newUser = await createUser(email, password,name,mobile_number,address);
  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({ message: 'User created successfully' });
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await getUserByemail(email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid Email Or PassWord' });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid Email Or PassWord' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful', token });
};
module.exports = { signup, login };
