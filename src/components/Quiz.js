import React, { useState } from 'react';

export default function Quiz({ questions }) {
  return (
    <div style={{ margin: '1em 0' }}>
      {questions.map((q, i) => (
        <Question key={i} {...q} number={i + 1} />
      ))}
    </div>
  );
}

function Question({ number, question, options, answer }) {
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div style={{ marginBottom: '1em', padding: '0.5em', border: '1px solid #ccc', borderRadius: '5px' }}>
      <strong>Q{number}: {question}</strong>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {options.map((opt, i) => (
          <li key={i} style={{ margin: '0.3em 0' }}>
            <button
              onClick={() => {
                setSelected(i);
                setShowAnswer(true);
              }}
              style={{
                padding: '0.3em 0.6em',
                borderRadius: '4px',
                border: '1px solid #888',
                backgroundColor: selected === i ? (i === answer ? '#a2fca2' : '#fca2a2') : 'white',
                cursor: 'pointer'
              }}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>
      {showAnswer && (
        <div style={{ marginTop: '0.5em', fontWeight: 'bold' }}>
          ✅ Correct answer: {options[answer]}
        </div>
      )}
    </div>
  );
}
