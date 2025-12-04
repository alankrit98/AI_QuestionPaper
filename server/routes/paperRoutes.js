const express = require('express');
const router = express.Router();
const { generatePaper } = require('../controllers/paperController');

router.post('/generate', generatePaper);

module.exports = router;