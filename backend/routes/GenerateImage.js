// In your routes file (e.g., generateImage.js)
const express = require('express');
const { generateImage } = require('../controllers/GenerateAIImage');
const router = express.Router();

router.post("/", generateImage);

module.exports = router;  // Make sure you're using `module.exports`
