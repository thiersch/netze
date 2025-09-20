import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './InteractiveTask.module.css';

const TASK_SCORE_COOKIE = 'docusaurus_task_total_score';
const TASK_COUNT_COOKIE = 'docusaurus_task_count';

const InteractiveTask = ({ taskData }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [currentTaskScore, setCurrentTaskScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  // Lade die persistenten Daten beim Initialisieren
  useEffect(() => {
    const savedTotalScore = parseInt(Cookies.get(TASK_SCORE_COOKIE) || '0', 10);
    const savedTaskCount = parseInt(Cookies.get(TASK_COUNT_COOKIE) || '0', 10);
    setTotalScore(savedTotalScore);
    setTaskCount(savedTaskCount);
  }, []);

  const handleClassification = (item, classification) => {
    const isCorrect = taskData.answers[item] === classification;
    const newAnswers = { ...userAnswers, [item]: { classification, isCorrect } };
    setUserAnswers(newAnswers);

    const allItemsClassified = Object.keys(taskData.answers).every(
      (key) => newAnswers[key] !== undefined
    );

    if (allItemsClassified) {
      const newScore = Object.values(newAnswers).filter(ans => ans.isCorrect).length;
      setCurrentTaskScore(newScore);

      // Speichere die neuen kumulierten Werte
      const newTotalScore = totalScore + newScore;
      const newQuizCount = taskCount + 1;
      Cookies.set(TASK_SCORE_COOKIE, newTotalScore.toString(), { expires: 365 });
      Cookies.set(TASK_COUNT_COOKIE, newQuizCount.toString(), { expires: 365 });

      setTotalScore(newTotalScore);
      setTaskCount(newQuizCount);
      setTaskCompleted(true);
    }
  };

  return (
    <div className={styles.taskContainer}>
      <h4>Aufgabe: {taskData.description}</h4>
      <div className={styles.itemsToClassify}>
        {taskData.items.map((item, index) => (
          <div key={index} className={styles.itemWrapper}>
            <span className={styles.itemText}>{item}</span>
            <div className={styles.classificationButtons}>
              {['Sensor', 'Aktor', 'Computer'].map((type) => {
                const selected =
                  userAnswers[item] && userAnswers[item].classification === type;
                const evaluated =
                  taskCompleted && selected
                    ? userAnswers[item].isCorrect
                      ? styles.correct
                      : styles.wrong
                    : '';
                const chosenButNotEvaluated =
                  selected && !taskCompleted ? styles.selected : '';

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
            Du hast <strong>{currentTaskScore} von {taskData.items.length}</strong> Aufgaben dieser Sektion richtig gelöst.
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

export default InteractiveTask;
