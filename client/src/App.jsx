import { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';
import PaperPreview from './components/PaperPreview';
import './index.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [generatedPaper, setGeneratedPaper] = useState(null);

  // Function to fetch questions from backend
  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/questions');
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Load questions when page opens
  useEffect(() => {
    fetchQuestions();
  }, []);

  // New function to handle generation
  const handleGenerate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/paper/generate', {
        subject: 'Software Engineering'
      });
      setGeneratedPaper(response.data);
    } catch (error) {
      alert("Error generating paper. Make sure you have enough questions in the bank!");
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>AI Question Paper Generator</h1>
        <button className="generate-btn" onClick={handleGenerate}>
          ⚡ Generate Paper Now
        </button>
      </header>
      
      {/* Show Paper Preview if generated, otherwise show the Manager */}
      {generatedPaper ? (
        <div className="preview-container">
          <button onClick={() => setGeneratedPaper(null)}>Back to Manager</button>
          <PaperPreview paperData={generatedPaper} />
        </div>
      ) : (
        <main className="main-content">
          <div className="left-panel">
            <QuestionForm onQuestionAdded={fetchQuestions} />
          </div>
          <div className="right-panel">
            <QuestionList questions={questions} />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;