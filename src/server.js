
const express = require("express");
const os = require("node:os");
require("dotenv").config();

const connectDB = require("./config/database");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.use("/api/tasks", taskRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "KubeScale API is running",
  });
});

// Identify which instance handles the request
app.get("/api/info", (req, res) => {
  res.json({
    application: "KubeScale",
    hostname: os.hostname(),
    version: process.env.APP_VERSION || "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting the API
const startServer = async () => {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`KubeScale API running on port ${PORT}`);
  });
};

startServer();