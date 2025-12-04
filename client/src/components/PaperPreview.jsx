const PaperPreview = ({ paperData }) => {
  if (!paperData) return null;

  const { paper } = paperData;

  return (
    <div className="paper-preview">
      <div className="paper-header">
        <h2>{paperData.subject} (Final Year Exam)</h2>
        <p>Generated on: {new Date(paperData.generatedAt).toLocaleString()}</p>
      </div>

      <div className="section">
        <h3>SECTION A (20 Marks) - Attempt all questions</h3>
        {paper.sectionA.length === 0 ? <p>Not enough questions in DB</p> : 
         paper.sectionA.map((q, idx) => (
          <p key={q._id}><strong>{idx + 1}.</strong> {q.question_text} (Unit {q.unit})</p>
        ))}
      </div>

      <div className="section">
        <h3>SECTION B (30 Marks) - Attempt any three</h3>
        {paper.sectionB.map((q, idx) => (
          <p key={q._id}><strong>{idx + 1}.</strong> {q.question_text} (Unit {q.unit})</p>
        ))}
      </div>

      <div className="section">
        <h3>SECTION C (50 Marks) - Attempt one from each</h3>
        {paper.sectionC.map((item, idx) => (
          <div key={idx} style={{marginBottom: '15px'}}>
             <h4>Question {idx + 3} (Unit {item.unit})</h4>
             {item.questions.map((q, qIdx) => (
               <p key={q._id}>
                 {qIdx === 0 ? '(a) ' : 'OR (b) '} 
                 {q.question_text}
               </p>
             ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaperPreview;