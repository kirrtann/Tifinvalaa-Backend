const { query } = require('express');
const pool = require('../config/db');

// Function to create a new user
const createUser = async (email, passwordHash, name, mobile_number, address, role) => {
  const query = `INSERT INTO users (email, password,name,mobile_number,address,role) VALUES ($1, $2,$3,$4,$5,$6) RETURNING id, email`;
  const values = [email, passwordHash, name, mobile_number, address, role];
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

const getprofileData = async (email) => {

  const query = 'SELECT  email, mobile_number, role, address ,name FROM users WHERE email= $1';
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0];

}

const updateUserData = async (email, name, mobile_number, address) => {
  const query = 'UPDATE users SET name = $2, mobile_number = $3, address = $4 WHERE email = $1  RETURNING  email, name, mobile_number, address';
  console.log("data qury", query);

  const values = [email, name, mobile_number, address];
  try {
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      throw new Error("No user found with the provided email.");
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

const deleteusers = async (email) => {


  const query = 'DELETE  FROM users WHERE email = $1'
  const values = [email]
  try {
    const result = await pool.query(query, values);
    return result.rows[0];

  }
   catch (error) {
console.log("geterror",error);

  }

}

module.exports = { getprofileData, createUser, getUserByemail, updateUserData, deleteusers };
