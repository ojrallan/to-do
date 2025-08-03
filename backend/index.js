const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

app.get("/todos", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id");
  res.json(result.rows);
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    `INSERT INTO todos (title) VALUES ($1) RETURNING *`,
    [title]
  );
  res.json(result.rows[0]);
});


//Add PUT and DELETE routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
