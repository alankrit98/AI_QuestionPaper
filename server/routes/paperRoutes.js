const express = require('express');
const router = express.Router();
const { generatePaper } = require('../controllers/paperController');
const { buildPDF } = require('../controllers/pdfController');
const { protectMiddleware } = require('../middlewares/protectMiddleware');

router.post('/generate', protectMiddleware, generatePaper);
router.post('/download', protectMiddleware, buildPDF);

module.exports = router;