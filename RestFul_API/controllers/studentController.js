const pool = require('../config/db');
const validator = require('validator');

// ==========================
// Add New Student
exports.createStudent = async (req, res) => {
  const {
    full_name, email, phone, gender,
    date_of_birth, address, department_id
  } = req.body;

  try {
    // Email format validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const result = await pool.query(
      `INSERT INTO Students 
      (full_name, email, phone, gender, date_of_birth, address, department_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [full_name, email, phone, gender, date_of_birth, address, department_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    // Handle duplicate email
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }

    console.error(err);
    res.status(500).json({ error: 'Failed to add student' });
  }
};

// ==========================
// Get All Students
exports.getAllStudents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Students');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve students' });
  }
};

// ==========================
// Get Complete Student Record by Any Column
// Example: ?filter_by=email&filter_value=abc@gmail.com
exports.getStudentByColumn = async (req, res) => {
  const { filter_by, filter_value } = req.query;

  const validColumns = [
    'student_id', 'full_name', 'email', 'phone',
    'gender', 'date_of_birth', 'address', 'department_id'
  ];

  if (!filter_by || !filter_value) {
    return res.status(400).json({ error: 'filter_by and filter_value are required' });
  }

  if (!validColumns.includes(filter_by)) {
    return res.status(400).json({ error: 'Invalid column name' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM Students WHERE ${filter_by} = $1`,
      [filter_value]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No student found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving student' });
  }
};

// ==========================
// Get Specific Column by Any Column
// Example: ?filter_by=email&filter_value=abc@gmail.com&select=full_name
exports.getStudentColumnByColumn = async (req, res) => {
  const { filter_by, filter_value, select } = req.query;

  const validColumns = [
    'student_id', 'full_name', 'email', 'phone',
    'gender', 'date_of_birth', 'address', 'department_id'
  ];

  if (!filter_by || !filter_value || !select) {
    return res.status(400).json({ error: 'filter_by, filter_value and select are required' });
  }

  if (!validColumns.includes(filter_by) || !validColumns.includes(select)) {
    return res.status(400).json({ error: 'Invalid column name' });
  }

  try {
    const result = await pool.query(
      `SELECT ${select} FROM Students WHERE ${filter_by} = $1`,
      [filter_value]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving column' });
  }
};

// ==========================
// Get Student by ID
exports.getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM Students WHERE student_id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get student by ID' });
  }
};

// ==========================
// Update Student by ID (with record existence check)
exports.updateStudent = async (req, res) => {
  const id = req.params.id;
  const {
    full_name, email, phone, gender,
    date_of_birth, address, department_id
  } = req.body;

  try {
    // Email format validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const result = await pool.query(
      `UPDATE Students SET 
      full_name = $1,
      email = $2,
      phone = $3,
      gender = $4,
      date_of_birth = $5,
      address = $6,
      department_id = $7
      WHERE student_id = $8
      RETURNING *`,
      [full_name, email, phone, gender, date_of_birth, address, department_id, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    // Duplicate email check
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }

    console.error(err);
    res.status(500).json({ error: 'Failed to update student' });
  }
};

// ==========================
// Delete Student by ID (with record existence check)
exports.deleteStudent = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query(
      'DELETE FROM Students WHERE student_id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete student' });
  }
};