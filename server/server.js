#Server configeruations
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/api/message", (req, res) => {
  res.json({ message: "back end response👋" });
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



