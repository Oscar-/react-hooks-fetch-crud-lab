
import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "prompt") setPrompt(value);
    else if (name.startsWith("answer")) {
      const index = parseInt(name.split("_")[1], 10);
      const newAnswers = [...answers];
      newAnswers[index] = value;
      setAnswers(newAnswers);
    } else if (name === "correctIndex") setCorrectIndex(parseInt(value, 10));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = { prompt, answers, correctIndex };

    fetch('http://localhost:4000/questions', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to add question');
        }
      })
      .then(data => {
        onAddQuestion(data);
        setPrompt("");
        setAnswers(["", "", "", ""]);
        setCorrectIndex(0);
      })
      .catch(err => console.error('Could not reach server:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input type="text" name="prompt" value={prompt} onChange={handleChange} required />
      </label>
      {answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input type="text" name={`answer_${index}`} value={answer} onChange={handleChange} required />
        </label>
      ))}
      <label>
        Correct Answer:
        <select name="correctIndex" value={correctIndex} onChange={handleChange}>
          {answers.map((_, index) => (
            <option key={index} value={index}>Answer {index + 1}</option>
          ))}
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;