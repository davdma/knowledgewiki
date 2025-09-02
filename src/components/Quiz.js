import React, { useState } from 'react';
import styles from './Quiz.module.css';

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
      <div className={styles.quizComplete}>
        <h3 className={styles.quizTitle}>Quiz Complete!</h3>
        <div className={styles.scoreText}>
          Score: {score}/{questions.length} ({Math.round((score/questions.length) * 100)}%)
        </div>
        
        <div style={{ marginBottom: '1em' }}>
          <h4 className={styles.reviewTitle}>Review Your Answers:</h4>
          {questions.map((q, index) => (
            <div key={index} className={`${styles.reviewItem} ${
              answers[index] === q.answer ? styles.reviewItemCorrect : styles.reviewItemIncorrect
            }`}>
              <div className={styles.reviewQuestion}>Q{index + 1}: {q.question}</div>
              <div className={styles.reviewAnswer}>
                Your answer: {answers[index] !== null ? q.options[answers[index]] : 'Not answered'} 
                {answers[index] === q.answer ? ' ✅' : ' ❌'}
              </div>
              {answers[index] !== q.answer && (
                <div className={styles.reviewCorrectAnswer}>
                  Correct answer: {q.options[q.answer]}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className={styles.buttonCenter}>
          <button
            onClick={handleRestart}
            className={styles.restartButton}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quiz}>
      {/* Progress indicator */}
      <div className={styles.progressContainer}>
        <div className={styles.progressText}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current question */}
      <div className={styles.questionContainer}>
        <div className={styles.questionText}>{currentQuestion.question}</div>
        <ul className={styles.optionsList}>
          {currentQuestion.options.map((opt, i) => {
            let buttonClass = styles.optionButton;
            if (answers[currentQuestionIndex] === i) {
              if (i === currentQuestion.answer) {
                buttonClass += ` ${styles.optionButtonCorrect}`;
              } else {
                buttonClass += ` ${styles.optionButtonIncorrect}`;
              }
            }
            
            return (
              <li key={i} className={styles.optionItem}>
                <button
                  onClick={() => handleAnswerSelect(i)}
                  className={buttonClass}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              </li>
            );
          })}
        </ul>
        
        {answers[currentQuestionIndex] !== null && (
          <div className={styles.feedback}>
            <div className={styles.feedbackTitle}>
              {answers[currentQuestionIndex] === currentQuestion.answer ? 
                '✅ Correct!' : '❌ Incorrect'}
            </div>
            <div className={styles.feedbackText}>
              Correct answer: <strong>{currentQuestion.options[currentQuestion.answer]}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className={styles.navigation}>
        <button
          onClick={handlePrevious}
          disabled={isFirstQuestion}
          className={styles.navButton}
        >
          ← Previous
        </button>
        
        <div className={styles.answeredCount}>
          {answers.filter(a => a !== null).length} of {questions.length} answered
        </div>
        
        <button
          onClick={handleNext}
          disabled={answers[currentQuestionIndex] === null}
          className={answers[currentQuestionIndex] === null ? styles.navButton : styles.nextButton}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
