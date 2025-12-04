const express = require('express');
const router = express.Router();
const { addQuestion, getQuestions } = require('../controllers/questionController');
const { protectMiddleware } = require('../middlewares/protectMiddleware');

// Define the paths
router.route('/' , protectMiddleware).post(addQuestion).get(getQuestions);

module.exports = router;