const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

let list = [
  {
    name: "Luisa Sciolli",
    url: "https://luisasciolli.com/",
    comment: "designer",
    price: "3",
  },
  {
    name: "Namedcollective",
    url: "",
    comment: "hoodies, streetwear, tshirts",
    price: "1",
  },
];

// Serve static files from the Vue build directory
app.use(express.static(path.join(__dirname, "dist")));

// API: Get current list
app.get("/api/jf_list", (req, res) => {
  res.json(list);
});

// API: Add item to list
app.post("/api/jf_list", (req, res) => {
  const newItem = req.body.item;
  if (typeof newItem === "string" && newItem.trim()) {
    list.push(newItem.trim());
    res.status(201).json({ message: "Item added", list });
  } else {
    res.status(400).json({ error: "Invalid item" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
