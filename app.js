const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or restrict to your domain
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Max-Age", "7200");
  next();
});


app.get("/", (req, res) => {
  res.json({ message: "Hello from Render API!" });
});

app.get("/status", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

const server = app.listen(port, () => {
  console.log(`API server listening on port ${port}!`);
});

app.get("/ip", async (req, res) => { try { const response = await fetch("https://api.ipify.org?format=json"); const data = await response.json(); res.json({ egressIp: data.ip }); } catch (err) { res.status(500).json({ error: "Unable to fetch egress IP", details: err.message }); } });

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
