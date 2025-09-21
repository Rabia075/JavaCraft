const pool = require('../config/db');

// =======================================
// Create a new registration
exports.createRegistration = async (req, res) => {
  try {
    const { student_id, course_id, status } = req.body;

    // Check if already registered
    const existing = await pool.query(
      `SELECT * FROM Registrations WHERE student_id = $1 AND course_id = $2`,
      [student_id, course_id]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Student is already registered for this course' });
    }

    const result = await pool.query(
      `INSERT INTO Registrations (student_id, course_id, status)
       VALUES ($1, $2, $3) RETURNING *`,
      [student_id, course_id, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// =======================================
// Get all registrations
exports.getAllRegistrations = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Registrations');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// =======================================
// Get registration by ID
exports.getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM Registrations WHERE registration_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching registration by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// =======================================
// Get full record by any column
// Example: /api/registrations/filter?column=student_id&value=3
exports.getRegistrationByColumn = async (req, res) => {
  try {
    const { column, value } = req.query;

    const result = await pool.query(
      `SELECT * FROM Registrations WHERE ${column} = $1`,
      [value]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No records found for this filter' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error filtering registrations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// =======================================
// Get specific column by another column
// Example: /api/registrations/column?select=status&where=student_id&value=3
exports.getColumnByColumn = async (req, res) => {
  try {
    const { select, where, value } = req.query;

    const result = await pool.query(
      `SELECT ${select} FROM Registrations WHERE ${where} = $1`,
      [value]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No record found' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving specific column:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// =======================================
// Update registration by ID (with existence check)
exports.updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, course_id, status } = req.body;

    // Check existence first
    const check = await pool.query(
      `SELECT * FROM Registrations WHERE registration_id = $1`,
      [id]
    );
    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    const result = await pool.query(
      `UPDATE Registrations
       SET student_id = $1, course_id = $2, status = $3
       WHERE registration_id = $4 RETURNING *`,
      [student_id, course_id, status, id]
    );

    res.status(200).json({ message: 'Updated successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// =======================================
// Delete registration by ID (with existence check)
exports.deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM Registrations WHERE registration_id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.status(200).json({ message: 'Registration deleted successfully' });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};