const QuestionList = ({ questions }) => {
  return (
    <div className="list-container">
      <h2>Question Bank ({questions.length})</h2>
      <table>
        <thead>
          <tr>
            <th>Unit</th>
            <th>Question</th>
            <th>Type</th>
            <th>Bloom's</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q._id}>
              <td>{q.unit}</td>
              <td>{q.question_text}</td>
              <td>{q.question_type} ({q.marks})</td>
              <td>
                <span className={`tag ${q.bloom_level.toLowerCase()}`}>
                  {q.bloom_level}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;