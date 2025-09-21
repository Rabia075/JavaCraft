const pool = require('../config/db');

// Utility: Email format validator
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// =========================
// CREATE Instructor
exports.createInstructor = async (req, res) => {
  try {
    const { full_name, email, phone, department_id } = req.body;

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check duplicate email
    const existing = await pool.query('SELECT * FROM Instructors WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Instructor with this email already exists' });
    }

    // Insert new instructor
    const result = await pool.query(
      `INSERT INTO Instructors (full_name, email, phone, department_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [full_name, email, phone, department_id]
    );

    res.status(201).json({ message: 'Instructor created successfully', data: result.rows[0] });

  } catch (error) {
    console.error('Error creating instructor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// =========================
// GET All Instructors
exports.getAllInstructors = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Instructors');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// =========================
// GET Instructor by ID
exports.getInstructorById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM Instructors WHERE instructor_id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Instructor not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error retrieving instructor by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// =========================
// GET Instructor by dynamic column & value
exports.getInstructorByColumn = async (req, res) => {
  const { column, value } = req.query;

  // Validate only allowed column names
  const allowedColumns = ['instructor_id', 'full_name', 'email', 'phone', 'department_id'];
  if (!allowedColumns.includes(column)) {
    return res.status(400).json({ error: 'Invalid column name' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM Instructors WHERE ${column} = $1`,
      [value]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No instructor found for given filter' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error filtering instructor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// =========================
// GET Specific Column from Instructors by filter
exports.getColumnByColumn = async (req, res) => {
  const { filter_by, filter_value, select } = req.query;

  const allowedColumns = ['instructor_id', 'full_name', 'email', 'phone', 'department_id'];
  if (!allowedColumns.includes(filter_by) || !allowedColumns.includes(select)) {
    return res.status(400).json({ error: 'Invalid column name' });
  }

  try {
    const result = await pool.query(
      `SELECT ${select} FROM Instructors WHERE ${filter_by} = $1`,
      [filter_value]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No instructor found for given filter' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error getting column by column:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// =========================
// UPDATE Instructor by ID
exports.updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, phone, department_id } = req.body;

    // Validate email
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check duplicate email for other instructors
    const emailCheck = await pool.query(
      'SELECT * FROM Instructors WHERE email = $1 AND instructor_id != $2',
      [email, id]
    );
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Another instructor with this email already exists' });
    }

    // Update instructor
    const result = await pool.query(
      `UPDATE Instructors
       SET full_name = $1, email = $2, phone = $3, department_id = $4
       WHERE instructor_id = $5 RETURNING *`,
      [full_name, email, phone, department_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Instructor not found' });
    }

    res.status(200).json({ message: 'Instructor updated successfully', data: result.rows[0] });

  } catch (error) {
    console.error('Error updating instructor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// =========================
// DELETE Instructor by ID
exports.deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM Instructors WHERE instructor_id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Instructor not found' });
    }

    res.status(200).json({ message: 'Instructor deleted successfully' });
  } catch (error) {
    console.error('Error deleting instructor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};