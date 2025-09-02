import React, { useState } from 'react';

export default function Quiz({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  
  const handleAnswerSelect = (selectedIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index].answer ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div style={{ 
        margin: '1em 0', 
        padding: '1em', 
        border: '2px solid #4CAF50', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3 style={{ margin: '0 0 1em 0', textAlign: 'center' }}>Quiz Complete!</h3>
        <div style={{ textAlign: 'center', fontSize: '1.2em', marginBottom: '1em' }}>
          Score: {score}/{questions.length} ({Math.round((score/questions.length) * 100)}%)
        </div>
        
        <div style={{ marginBottom: '1em' }}>
          <h4>Review Your Answers:</h4>
          {questions.map((q, index) => (
            <div key={index} style={{ 
              marginBottom: '0.5em', 
              padding: '0.5em',
              backgroundColor: answers[index] === q.answer ? '#e8f5e8' : '#ffe8e8',
              borderRadius: '4px'
            }}>
              <strong>Q{index + 1}: {q.question}</strong>
              <div style={{ marginTop: '0.3em' }}>
                Your answer: {answers[index] !== null ? q.options[answers[index]] : 'Not answered'} 
                {answers[index] === q.answer ? ' ✅' : ' ❌'}
              </div>
              {answers[index] !== q.answer && (
                <div style={{ color: '#666', marginTop: '0.2em' }}>
                  Correct answer: {q.options[q.answer]}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleRestart}
            style={{
              padding: '0.5em 1em',
              borderRadius: '4px',
              border: '1px solid #4CAF50',
              backgroundColor: '#4CAF50',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1em'
            }}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      margin: '1em 0', 
      padding: '1em', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      backgroundColor: '#fafafa'
    }}>
      {/* Progress indicator */}
      <div style={{ marginBottom: '1em', textAlign: 'center' }}>
        <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '0.5em' }}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div style={{ 
          width: '100%', 
          height: '4px', 
          backgroundColor: '#ddd', 
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            height: '100%',
            backgroundColor: '#4CAF50',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Current question */}
      <div style={{ marginBottom: '1em' }}>
        <strong style={{ fontSize: '1.1em' }}>{currentQuestion.question}</strong>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, marginTop: '0.8em' }}>
          {currentQuestion.options.map((opt, i) => (
            <li key={i} style={{ margin: '0.5em 0' }}>
              <button
                onClick={() => handleAnswerSelect(i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.6em',
                  borderRadius: '4px',
                  border: '1px solid #888',
                  backgroundColor: answers[currentQuestionIndex] === i ? 
                    (i === currentQuestion.answer ? '#a2fca2' : '#fca2a2') : 'white',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (answers[currentQuestionIndex] !== i) {
                    e.target.style.backgroundColor = '#f0f0f0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (answers[currentQuestionIndex] !== i) {
                    e.target.style.backgroundColor = 'white';
                  }
                }}
              >
                {String.fromCharCode(65 + i)}. {opt}
              </button>
            </li>
          ))}
        </ul>
        
        {answers[currentQuestionIndex] !== null && (
          <div style={{ 
            marginTop: '0.8em', 
            padding: '0.5em',
            borderRadius: '4px',
            backgroundColor: '#e7f3ff',
            border: '1px solid #b3d9ff'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.3em' }}>
              {answers[currentQuestionIndex] === currentQuestion.answer ? 
                '✅ Correct!' : '❌ Incorrect'}
            </div>
            <div style={{ fontSize: '0.9em' }}>
              Correct answer: <strong>{currentQuestion.options[currentQuestion.answer]}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '1.5em'
      }}>
        <button
          onClick={handlePrevious}
          disabled={isFirstQuestion}
          style={{
            padding: '0.5em 1em',
            borderRadius: '4px',
            border: '1px solid #888',
            backgroundColor: isFirstQuestion ? '#f5f5f5' : 'white',
            color: isFirstQuestion ? '#888' : 'black',
            cursor: isFirstQuestion ? 'not-allowed' : 'pointer'
          }}
        >
          ← Previous
        </button>
        
        <div style={{ fontSize: '0.9em', color: '#666' }}>
          {answers.filter(a => a !== null).length} of {questions.length} answered
        </div>
        
        <button
          onClick={handleNext}
          disabled={answers[currentQuestionIndex] === null}
          style={{
            padding: '0.5em 1em',
            borderRadius: '4px',
            border: '1px solid #4CAF50',
            backgroundColor: answers[currentQuestionIndex] === null ? '#f5f5f5' : '#4CAF50',
            color: answers[currentQuestionIndex] === null ? '#888' : 'white',
            cursor: answers[currentQuestionIndex] === null ? 'not-allowed' : 'pointer'
          }}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
