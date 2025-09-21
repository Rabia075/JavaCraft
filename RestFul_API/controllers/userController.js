const pool = require('../config/db');
const bcrypt = require('bcrypt');

// =======================================
// Create User (Register)
exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;

  // Password strength check
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    // Check for duplicate username
    const existingUser = await pool.query('SELECT * FROM Users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert into DB
    const result = await pool.query(
      'INSERT INTO Users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, role]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================================
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT user_id, username, role FROM Users');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================================
// Get user by any column
// Example: /api/users/filter?column=username&value=admin
exports.getUserByColumn = async (req, res) => {
  const { column, value } = req.query;

  try {
    const result = await pool.query(
      `SELECT * FROM Users WHERE ${column} = $1`,
      [value]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================================
// Get specific column by another column
// Example: /api/users/column?select=username&where=role&value=admin
exports.getColumnByColumn = async (req, res) => {
  const { select, where, value } = req.query;

  try {
    const result = await pool.query(
      `SELECT ${select} FROM Users WHERE ${where} = $1`,
      [value]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No matching records found' });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================================
// Get user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query('SELECT user_id, username, role FROM Users WHERE user_id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================================
// Update user by ID (with existence check)
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, password, role } = req.body;

  try {
    // Check if user exists
    const check = await pool.query('SELECT * FROM Users WHERE user_id = $1', [userId]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    let hashedPassword = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const result = await pool.query(
      `UPDATE Users SET 
        username = COALESCE($1, username), 
        password_hash = COALESCE($2, password_hash), 
        role = COALESCE($3, role)
      WHERE user_id = $4 RETURNING user_id, username, role`,
      [username || null, hashedPassword, role || null, userId]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================================
// Delete user by ID (with existence check)
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM Users WHERE user_id = $1 RETURNING *', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};