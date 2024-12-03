const express = require("express");
const app = express();
const port = 3000; // You can choose any port

// Middleware to parse JSON requests
app.use(express.json());

// Example data
const items = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" },
];

// Routes
// Get all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// Get a single item by ID
app.get("/api/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Add a new item
app.post("/api/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an item
app.put("/api/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (item) {
    item.name = req.body.name || item.name;
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Delete an item
app.delete("/api/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index !== -1) {
    items.splice(index, 1);
    res.json({ message: "Item deleted successfully" });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
