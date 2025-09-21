import React, { useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import styles from './Quiz.module.css';

const TOTAL_SCORE_COOKIE = 'docusaurus_quiz_total_score';
const QUIZ_COUNT_COOKIE = 'docusaurus_quiz_count';

// Fisher-Yates Shuffle-Algorithmus
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Quiz = ({ questions }) => {
  // Shuffle Fragen einmalig beim Initialisieren
  const [shuffledQuestions] = useState(() => shuffleArray(questions));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [answersStatus, setAnswersStatus] = useState([]);

  // Lade persistente Daten
  useEffect(() => {
    const savedTotalScore = parseInt(Cookies.get(TOTAL_SCORE_COOKIE) || '0', 10);
    const savedQuizCount = parseInt(Cookies.get(QUIZ_COUNT_COOKIE) || '0', 10);
    setTotalScore(savedTotalScore);
    setQuizCount(savedQuizCount);
  }, []);

  // Antworten für die aktuelle Frage mischen
  const shuffledAnswers = useMemo(() => {
    const currentQuizItem = shuffledQuestions[currentQuestion];
    return shuffleArray(currentQuizItem.answers);
  }, [currentQuestion, shuffledQuestions]);

  const handleAnswerClick = (isCorrect, answerIndex) => {
    setSelectedAnswer(answerIndex);

    // Speichere den Status der aktuellen Frage
    setAnswersStatus((prevStatus) => [
      ...prevStatus,
      {
        questionText: shuffledQuestions[currentQuestion].question,
        isCorrect: isCorrect,
      },
    ]);

    setTimeout(() => {
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      if (currentQuestion + 1 < shuffledQuestions.length) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz beendet
        const finalScore = isCorrect ? score + 1 : score;
        const newTotalScore = totalScore + finalScore;
        const newQuizCount = quizCount + 1;

        Cookies.set(TOTAL_SCORE_COOKIE, newTotalScore.toString(), { expires: 365 });
        Cookies.set(QUIZ_COUNT_COOKIE, newQuizCount.toString(), { expires: 365 });

        setTotalScore(newTotalScore);
        setQuizCount(newQuizCount);

        setShowResult(true);
      }
    }, 1000);
  };

  const totalQuestions = shuffledQuestions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const progressBarWidth = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  if (showResult) {
    return (
      <div className={styles.quizContainer}>
        <h2>Quiz beendet! 🎉</h2>
        <p>
          Du hast <strong>{score} von {totalQuestions}</strong> Fragen richtig beantwortet.
        </p>
        <p>
          Das sind <strong>{percentage}%</strong> richtige Antworten.
        </p>
        <hr />
        <h3>Übersicht</h3>
        <ul className={styles.summaryList}>
          {answersStatus.map((status, index) => (
            <li key={index} className={status.isCorrect ? styles.summaryCorrect : styles.summaryWrong}>
              {status.isCorrect ? '✅' : '❌'} Frage {index + 1}: {status.questionText}
            </li>
          ))}
        </ul>
        <hr />
        <h3>Deine Gesamtpunktzahl mit diesem Browser</h3>
        <p>
          Insgesamt: <strong>{totalScore}</strong> Punkte aus <strong>{quizCount}</strong> Quizzes.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressBarWidth}%` }}
        ></div>
      </div>
      <h3>Frage {currentQuestion + 1} von {totalQuestions}</h3>
      <p>{shuffledQuestions[currentQuestion].question}</p>
      <div className={styles.answersContainer}>
        {shuffledAnswers.map((answer, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = answer.isCorrect;
          
          let extraClass = '';
          if (selectedAnswer !== null) {
            if (isSelected) {
              extraClass = isCorrectAnswer ? styles.correct : styles.wrong;
            } else if (isCorrectAnswer) {
              extraClass = styles.correct;
            }
          }
          
          return (
            <button
              key={answer.text}
              onClick={() => handleAnswerClick(answer.isCorrect, index)}
              className={`${styles.answerButton} ${extraClass}`}
              disabled={selectedAnswer !== null}
            >
              {answer.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
