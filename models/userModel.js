const pool = require('../config/db');

// Function to create a new user
const createUser = async (email, passwordHash,name,mobile_number,address,role) => {
  const query = `INSERT INTO users (email, password,name,mobile_number,address,role) VALUES ($1, $2,$3,$4,$5,$6) RETURNING id, email`;
  const values = [email, passwordHash,name,mobile_number,address,role];
  const result = await pool.query(query, values);
  return result.rows[0];
};


// Function to get user by email
const getUserByemail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { createUser, getUserByemail};
