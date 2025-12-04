import { useState } from 'react';
import axios from 'axios';

const QuestionForm = ({ onQuestionAdded }) => {
  const [formData, setFormData] = useState({
    subject: 'Software Engineering',
    unit: 1,
    question_text: '',
    question_type: 'BRIEF',
    marks: 2,
    bloom_level: 'REMEMBER'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/questions', formData);
      alert('Question Added Successfully!');
      // Reset form (except subject)
      setFormData({ ...formData, question_text: '' }); 
      // Refresh the list in the parent component
      onQuestionAdded();
    } catch (error) {
      console.error(error);
      alert('Error adding question');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Question</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Subject:</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Unit (1-5):</label>
            <input type="number" name="unit" min="1" max="5" value={formData.unit} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Type:</label>
            <select name="question_type" value={formData.question_type} onChange={handleChange}>
              <option value="BRIEF">Brief (2 Marks)</option>
              <option value="LONG_ANSWER">Long Answer (10 Marks)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Marks:</label>
            <select name="marks" value={formData.marks} onChange={handleChange}>
              <option value={2}>2</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Bloom's Level:</label>
          <select name="bloom_level" value={formData.bloom_level} onChange={handleChange}>
            <option value="REMEMBER">Remember</option>
            <option value="UNDERSTAND">Understand</option>
            <option value="APPLY">Apply</option>
            <option value="ANALYZE">Analyze</option>
            <option value="EVALUATE">Evaluate</option>
            <option value="CREATE">Create</option>
          </select>
        </div>

        <div className="form-group">
          <label>Question Text:</label>
          <textarea 
            name="question_text" 
            rows="3" 
            value={formData.question_text} 
            onChange={handleChange} 
            required 
            placeholder="Type the question here..."
          ></textarea>
        </div>

        <button type="submit">Add to Bank</button>
      </form>
    </div>
  );
};

export default QuestionForm;