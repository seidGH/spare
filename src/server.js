const express = require("express");
const app = express();

app.use(express.static("build"));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from backend 🚀" });
});

app.listen(1000, () => {
  console.log("Server running on port 1000");
});
