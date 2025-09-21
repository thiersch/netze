// src/components/ItemMatch/index.js

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './ItemMatch.module.css';

const EXERCISE_SCORE_COOKIE = 'docusaurus_exercise_total_score';
const EXERCISE_COUNT_COOKIE = 'docusaurus_exercise_count';

const ItemMatch = ({ taskData }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [currentTaskScore, setCurrentTaskScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  // Lade die persistenten Daten beim Initialisieren
  useEffect(() => {
    const savedTotalScore = parseInt(Cookies.get(EXERCISE_SCORE_COOKIE) || '0', 10);
    const savedTaskCount = parseInt(Cookies.get(EXERCISE_COUNT_COOKIE) || '0', 10);
    setTotalScore(savedTotalScore);
    setTaskCount(savedTaskCount);
  }, []);

  const handleClassification = (item, classification) => {
    const isCorrect = item.answer === classification;
    const newAnswers = { ...userAnswers, [item.id]: { classification, isCorrect } };
    setUserAnswers(newAnswers);

    const allItemsClassified = taskData.every(
      (dataItem) => newAnswers[dataItem.id] !== undefined
    );

    if (allItemsClassified) {
      const newScore = Object.values(newAnswers).filter(ans => ans.isCorrect).length;
      setCurrentTaskScore(newScore);

      const newTotalScore = totalScore + newScore;
      const newQuizCount = taskCount + 1;
      Cookies.set(EXERCISE_SCORE_COOKIE, newTotalScore.toString(), { expires: 365 });
      Cookies.set(EXERCISE_COUNT_COOKIE, newQuizCount.toString(), { expires: 365 });

      setTotalScore(newTotalScore);
      setTaskCount(newQuizCount);
      setTaskCompleted(true);
    }
  };

  return (
    <div className={styles.taskContainer}>
      <div className={styles.itemsToClassify}>
        {taskData.map((item) => (
          <div key={item.id} className={styles.itemWrapper}>
            <span className={styles.itemText}>{item.text}</span>
            <div className={styles.classificationButtons}>
              {['Sensor', 'Aktor', 'Computer'].map((type) => {
                const selected = userAnswers[item.id] && userAnswers[item.id].classification === type;
                const evaluated =
                  taskCompleted && selected
                    ? userAnswers[item.id].isCorrect
                      ? styles.correct
                      : styles.wrong
                    : '';
                const chosenButNotEvaluated = selected && !taskCompleted ? styles.selected : '';

                return (
                  <button
                    key={type}
                    onClick={() => handleClassification(item, type)}
                    className={`${styles.answerButton} ${evaluated} ${chosenButNotEvaluated}`}
                    disabled={taskCompleted}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {taskCompleted && (
        <div className={styles.results}>
          <p>
            Du hast <strong>{currentTaskScore} von {taskData.length}</strong> Aufgaben dieser Sektion richtig gelöst.
          </p>
          <hr />
          <p>
            Deine bisherige Gesamtpunktzahl aus allen <strong>{taskCount}</strong> Aufgaben: <strong>{totalScore}</strong> Punkte.
          </p>
        </div>
      )}
    </div>
  );
};

export default ItemMatch;