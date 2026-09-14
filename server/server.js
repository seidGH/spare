//Server configeruations
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

//Liveness End Point
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// READINESS PROBE // 
//Checks whether the application can communicate with PostgreSQL.
 // If PostgreSQL is unavailable, the application is NOT ready
 // to receive traffic.

app.get("/ready", async (req, res) => {
  try {
    // Verify that the application can communicate with PostgreSQL
    await db.query("SELECT 1");

    // Database is reachable → application is ready
    res.status(200).send("READY");
  } catch (error) {
    // Database is unavailable → application is not ready
    console.error("Readiness check failed:", error.message);

    res.status(503).send("NOT READY");
  }
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



