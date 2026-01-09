const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Max-Age", "86400");
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
app.get("/chart/:timestamp", async (req, res) => { try { const timestamp = req.params.timestamp; if (!timestamp || isNaN(timestamp)) { return res.status(400).json({ error: "Invalid timestamp parameter" }); } const intervalInMinutes = 1; const endTimeInMillis = timestamp; const startTimeInMillis = endTimeInMillis-814719783; const growwUrl = `https://groww.in/v1/api/charting_service/v2/chart/delayed/exchange/NSE/segment/CASH/NIFTY?endTimeInMillis=${endTimeInMillis}&intervalInMinutes=${intervalInMinutes}&startTimeInMillis=${startTimeInMillis}`; const response = await fetch(growwUrl); if (!response.ok) { throw new Error(`Groww API error: ${response.status}`); } const data = await response.json(); res.json(data); } catch (err) { res.status(500).json({ error: "Failed to fetch chart data", details: err.message }); } });

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
