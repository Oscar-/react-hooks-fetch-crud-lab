import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers = [], correctIndex } = question;

  // Create options for the dropdown
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  // Handle change in the dropdown
  function handleChange(e) {
    const newCorrectIndex = parseInt(e.target.value, 10); // Ensure base 10 parsing

    // Update the correctIndex on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex })
    })
      .then(res => {
        if (res.ok) {
          return res.json(); // Get the updated question data from the server
        } else {
          throw new Error('Update request failed');
        }
      })
      .then(data => {
        onUpdate(data); // Update the question in state using the updated data from the server
      })
      .catch(err => {
        console.error('Could not reach server:', err);
      });
  }

  // Handle delete
  function handleDelete() {
    onDelete(id); // Notify parent component to delete the question
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
