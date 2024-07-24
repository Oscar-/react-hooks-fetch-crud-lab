
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDelete, onUpdate }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem 
            key={question.id} 
            question={question} 
            onDelete={onDelete} 
            onUpdate={onUpdate} 
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;