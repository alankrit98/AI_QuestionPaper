const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  // Subject Name (e.g., "Software Engineering")
  subject: {
    type: String,
    required: true,
    trim: true
  },
  // The syllabus unit (1 to 5) - CRITICAL for your paper pattern
  unit: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  // The actual question text
  question_text: {
    type: String,
    required: true
  },
  // Type: Brief (2 marks) or Long (10 marks)
  question_type: {
    type: String,
    required: true,
    enum: ['BRIEF', 'LONG_ANSWER'] 
  },
  // Marks: Strictly 2 or 10 based on your university pattern
  marks: {
    type: Number,
    required: true,
    enum: [2, 10]
  },
  // Bloom's Taxonomy Level (For your Research Paper novelty)
  bloom_level: {
    type: String,
    required: true,
    enum: ['REMEMBER', 'UNDERSTAND', 'APPLY', 'ANALYZE', 'EVALUATE', 'CREATE']
  },
  
  // Research Fields: To track usage and avoid repetition
  usage_count: {
    type: Number,
    default: 0
  },
  last_used_date: {
    type: Date,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);