const express = require("express");
const cors = require("cors");
const shortid = require("shortid");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory store (use MongoDB or MySQL in production)
let urls = {};

// Generate short URL
app.post("/shorten", (req, res) => {
  const { originalUrl, customAlias } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  // If custom alias provided
  let shortId = customAlias ? customAlias : shortid.generate();

  // Prevent duplicate custom alias
  if (urls[shortId]) {
    return res.status(400).json({ error: "Alias already exists" });
  }

  urls[shortId] = originalUrl;

  return res.json({
    shortUrl: `http://localhost:${PORT}/${shortId}`,
    originalUrl,
  });
});

// Redirect short URL to original
app.get("/:shortId", (req, res) => {
  const shortId = req.params.shortId;
  const originalUrl = urls[shortId];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
