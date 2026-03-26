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

/* const getListHandler = (tableName) => async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM ${tableName} ORDER BY id DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB read error" });
  }
};

app.get("/api/jf_list", getListHandler("jf_items"));
app.get("/api/others_list", getListHandler("others_items"));
app.get("/api/justin_list", getListHandler("justin_items")); */

const validTypes = {
  jf: "jf_items",
  others: "others_items",
  justin: "justin_items",
};

app.get("/api/items", async (req, res) => {
  const { type } = req.query;
  const tableName = validTypes[type];
  if (!tableName) return res.status(400).json({ error: "Invalid list type" });

  try {
    const result = await pool.query(
      `SELECT * FROM ${tableName} ORDER BY id DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB read error" });
  }
});

// API: Add item to list
app.post("/api/items", async (req, res) => {
  const { list, name, url, comment, price } = req.body;
  const tableName = validTypes[list];

  const normalizedUrl = normalizeUrl(url);
  try {
    const result = await pool.query(
      `INSERT INTO ${tableName} (name, url, comment, price) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name.trim(), normalizedUrl.trim(), comment.trim(), price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB insert error" });
  }
});

// API: Delete item by ID
app.delete("/api/list/:id", async (req, res) => {
  const { id } = req.params;
  const { type } = req.query;
  const tableName = validTypes[type];

  // Validate ID
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const result = await pool.query(
      `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`,
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
