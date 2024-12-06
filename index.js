const express = require("express");
const rateLimit = require("express-rate-limit");
const Redis = require("ioredis");
const bodyParser = require("body-parser");
const { PubSub } = require("@google-cloud/pubsub");
require("dotenv").config(); 

const app = express();

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost', 
  port: process.env.REDIS_PORT || 6379, 
  password: process.env.REDIS_PASSWORD || '', 
});

const pubsub = new PubSub({
  projectId: process.env.final-project-443911, 
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const rateLimits = {
  blue: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    handler: (req, res) => handleLimitExceeded(req, res, "blue"),
  }),
  red: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    handler: (req, res) => handleLimitExceeded(req, res, "red"),
  }),
};

app.use(express.static("public"));

// Log button clicks in Redis
async function logClick(button, ip) {
  const timestamp = new Date().toISOString();
  try {
    await redis.lpush("clicks", JSON.stringify({ button, timestamp, ip }));
  } catch (err) {
    console.error("Error logging click to Redis:", err);
  }
}

// Handle rate limit exceeded and publish event to Pub/Sub
async function handleLimitExceeded(req, res, button) {
  const ip = req.ip;
  const timestamp = new Date().toISOString();
  
  // Publish to Google Cloud Pub/Sub
  try {
    const message = {
      json: { button, timestamp, ip },
    };
    await pubsub.topic("button-click-limits").publishMessage(message);
  } catch (err) {
    console.error("Error publishing to Pub/Sub:", err);
  }

  res.status(429).json({ error: "Rate limit exceeded", button, ip });
}

// Button click routes
app.post("/click/blue", rateLimits.blue, async (req, res) => {
  await logClick("blue", req.ip);
  res.json({ message: "Blue button clicked!" });
});

app.post("/click/red", rateLimits.red, async (req, res) => {
  await logClick("red", req.ip);
  res.json({ message: "Red button clicked!" });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
