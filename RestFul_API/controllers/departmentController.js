const pool = require('../config/db');

// ==========================
// Create a new department
exports.createDepartment = async (req, res) => {
  const { department_name, department_code } = req.body;

  if (!department_name || !department_code) {
    return res.status(400).send("Both department_name and department_code are required");
  }

  try {
    const result = await pool.query(
      'INSERT INTO departments (department_name, department_code) VALUES ($1, $2) RETURNING *',
      [department_name, department_code]
    );
    res.status(201).json({ message: "Department created", department: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating department");
  }
};

// ==========================
// Get all or filtered departments
exports.getDepartments = async (req, res) => {
  try {
    const filters = [];
    const values = [];
    let index = 1;

    for (let key in req.query) {
      filters.push(`${key} = $${index++}`);
      values.push(req.query[key]);
    }

    const query = filters.length
      ? `SELECT * FROM departments WHERE ${filters.join(" AND ")}`
      : `SELECT * FROM departments`;

    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving departments");
  }
};

// ==========================
// Get single department by ID
exports.getDepartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM departments WHERE department_id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Department not found");
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving department");
  }
};
// ==========================
// Get any specific column using any filter column
exports.getColumnByFilter = async (req, res) => {
  const { filter_by, filter_value, select } = req.query;

  // Validate input
  if (!filter_by || !filter_value || !select) {
    return res.status(400).send("Required query parameters: filter_by, filter_value, select");
  }

  try {
    // Avoid SQL injection — validate column names (whitelist method is safer)
    const validColumns = ['department_id', 'department_name', 'department_code'];
    
    if (!validColumns.includes(filter_by) || !validColumns.includes(select)) {
      return res.status(400).send("Invalid column name in query");
    }

    // Dynamic query
    const query = `SELECT ${select} FROM departments WHERE ${filter_by} = $1`;
    const result = await pool.query(query, [filter_value]);

    if (result.rows.length === 0) {
      return res.status(404).send("No data found");
    }

    res.status(200).json(result.rows[0]); // returns a single object
  } catch (err) {
  console.error("FULL ERROR:", err);
  res.status(500).json({ error: err.message }); // Send full error back to Postman
}
};

// ==========================
// Update department by ID (with missing field check)
exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { department_name, department_code } = req.body;

  try {
    // Step 1: Validate input — at least one field must be provided
    if (!department_name && !department_code) {
      return res.status(400).send("At least one field (department_name or department_code) is required to update");
    }

    // Step 2: Build dynamic update query
    const updates = [];
    const values = [];
    let index = 1;

    if (department_name) {
      updates.push(`department_name = $${index++}`);
      values.push(department_name);
    }

    if (department_code) {
      updates.push(`department_code = $${index++}`);
      values.push(department_code);
    }

    // Step 3: Add ID at the end for WHERE clause
    values.push(id);

    const updateQuery = `
      UPDATE departments
      SET ${updates.join(', ')}
      WHERE department_id = $${index}
      RETURNING *
    `;

    const result = await pool.query(updateQuery, values);

    // Step 4: Handle not found
    if (result.rows.length === 0) {
      return res.status(404).send("Department not found");
    }

    // Step 5: Success response
    res.status(200).json({ message: "Department updated", department: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating department");
  }
};

// ==========================
// Delete department by ID
exports.deleteDepartment = async (req, res) => {
  const { id } = req.params; // Extract the department ID from URL

  try {
    // Step 1: Attempt to delete the department and return the deleted row
    const result = await pool.query(
      'DELETE FROM departments WHERE department_id = $1 RETURNING *',
      [id]
    );

    // Step 2: If no row was returned, department doesn't exist
    if (result.rows.length === 0) {
      return res.status(404).send("Department not found"); // Not found error
    }

    // Step 3: If successful, send confirmation and the deleted department data
    res.status(200).json({
      message: "Department deleted successfully",
      department: result.rows[0]
    });

  } catch (err) {
    // Step 4: Handle unexpected errors
    console.error("Error deleting department:", err);
    res.status(500).send("Error deleting department");
  }
};