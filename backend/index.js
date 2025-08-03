const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

//Get route
app.get("/todos", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id");
  res.json(result.rows);
});

//Post route
app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    `INSERT INTO todos (title) VALUES ($1) RETURNING *`,
    [title]
  );
  res.json(result.rows[0]);
});

// Delete route
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "To-do not found" });
    }
    res.json({ message: "To-do deleted", todo: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Put route
app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const { title, completed } = req.body;

  try {
    //Update title and/or completed status
    const result = await pool.query(
      "UPDATE todos SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *",
      [title, completed, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "To-do not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
