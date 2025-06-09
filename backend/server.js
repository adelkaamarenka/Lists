const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the Vue build directory
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json());

function normalizeUrl(url) {
  if (!/^https?:\/\//i.test(url)) {
    return "https://" + url;
  }
  return url;
}

// API: Get current list
app.get("/api/jf_list", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jf_items ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB read error" });
  }
});

// API: Add item to list
app.post("/api/jf_list", async (req, res) => {
  const { name, url, comment, price } = req.body;

  const normalizedUrl = normalizeUrl(url);
  try {
    const result = await pool.query(
      "INSERT INTO jf_items (name, url, comment, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [name.trim(), normalizedUrl.trim(), comment.trim(), price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB insert error" });
  }
});

// API: Delete item by ID
app.delete("/api/jf_list/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ID
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM jf_items WHERE id = $1 RETURNING *",
      [parsedId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted", item: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB delete error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
