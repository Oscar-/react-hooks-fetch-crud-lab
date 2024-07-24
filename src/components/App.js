import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const url = 'http://localhost:4000/questions';

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setQuestions(data))
      .catch(err => console.error('Could not fetch questions:', err));
  }, []);

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.ok) {
          setQuestions(questions.filter(question => question.id !== id));
        } else {
          throw new Error('Delete request failed');
        }
      })
      .catch(err => console.error('Could not reach server:', err));
  };

  const handleUpdateQuestion = (updatedQuestion) => {
    setQuestions(questions.map(question =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    ));
  };

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList questions={questions} onDelete={handleDeleteQuestion} onUpdate={handleUpdateQuestion} />
      )}
    </main>
  );
}

export default App;