const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// Example root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Hello from Render API!" });
});

// Example additional endpoint
app.get("/status", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

const server = app.listen(port, () => {
  console.log(`API server listening on port ${port}!`);
});

// Keep-alive settings (optional, same as before)
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
