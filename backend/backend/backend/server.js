const express = require("express");
const cors = require("cors");
const connectDB = require("./couchbase");

const app = express();
app.use(cors());
app.use(express.json());

let collection;

connectDB().then((db) => {
  collection = db.collection;
});

app.post("/save-time", async (req, res) => {
  const { time } = req.body;

  const id = Date.now().toString();

  await collection.insert(id, { time });

  res.json({ message: "Time saved" });
});

app.get("/times", async (req, res) => {
  const result = await collection.getAll();

  res.json(result);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
