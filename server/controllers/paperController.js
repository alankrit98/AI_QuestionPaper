const Question = require('../models/Question');

// Helper function to get random questions from a specific unit and type
const getRandomQuestions = async (unit, type, count) => {
  // MongoDB Aggregation Pipeline for Random Selection
  const questions = await Question.aggregate([
    { 
      $match: { 
        unit: unit, 
        question_type: type 
      } 
    },
    { $sample: { size: count } } // Randomly selects 'count' documents
  ]);
  return questions;
};

const generatePaper = async (req, res) => {
  try {
    const { subject } = req.body; // e.g., "Software Engineering"

    // We need to build the paper structure unit by unit to ensure coverage
    const paperStructure = {
      sectionA: [], // 2 marks, 10 questions (2 per unit)
      sectionB: [], // 10 marks, 5 questions (1 per unit)
      sectionC: []  // 10 marks, 10 questions (2 per unit for internal choice)
    };

    // Loop through all 5 units
    for (let unit = 1; unit <= 5; unit++) {
      
      // 1. Fetch Section A questions (2 Brief questions per unit)
      const secA_questions = await getRandomQuestions(unit, 'BRIEF', 2);
      paperStructure.sectionA.push(...secA_questions);

      // 2. Fetch Section B questions (1 Long question per unit)
      const secB_questions = await getRandomQuestions(unit, 'LONG_ANSWER', 1);
      paperStructure.sectionB.push(...secB_questions);

      // 3. Fetch Section C questions (2 Long questions per unit for internal choice)
      const secC_questions = await getRandomQuestions(unit, 'LONG_ANSWER', 2);
      paperStructure.sectionC.push({
        unit: unit,
        questions: secC_questions // Stores them as a pair [a, b]
      });
    }

    res.json({
      success: true,
      subject,
      generatedAt: new Date(),
      paper: paperStructure
    });

  } catch (error) {
    console.error("Generator Error:", error);
    res.status(500).json({ message: "Error generating paper", error });
  }
};

module.exports = { generatePaper };