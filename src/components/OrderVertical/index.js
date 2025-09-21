import React, { useState } from 'react';
import styles from './OrderVertical.module.css';

const EXERCISE_SCORE_COOKIE = 'docusaurus_exercise_total_score';
const EXERCISE_COUNT_COOKIE = 'docusaurus_exercise_count';
import Cookies from 'js-cookie';

const OrderVertical = ({ taskData }) => {
  const [items, setItems] = useState(taskData.items);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(parseInt(Cookies.get(EXERCISE_SCORE_COOKIE) || '0', 10));
  const [taskCount, setTaskCount] = useState(parseInt(Cookies.get(EXERCISE_COUNT_COOKIE) || '0', 10));

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  const handleDrop = (index) => {
    if (draggingIndex === null || draggingIndex === index) return;
    const newItems = [...items];
    const [moved] = newItems.splice(draggingIndex, 1);
    newItems.splice(index, 0, moved);
    setItems(newItems);
    setDraggingIndex(null);
  };

  const handleSubmit = () => {
    let newScore = 0;
    items.forEach((item, idx) => {
      if (item === taskData.correctOrder[idx]) newScore++;
    });
    setScore(newScore);

    const newTotalScore = totalScore + newScore;
    const newTaskCount = taskCount + 1;

    Cookies.set(EXERCISE_SCORE_COOKIE, newTotalScore.toString(), { expires: 365 });
    Cookies.set(EXERCISE_COUNT_COOKIE, newTaskCount.toString(), { expires: 365 });

    setTotalScore(newTotalScore);
    setTaskCount(newTaskCount);

    setSubmitted(true);
  };

  return (
    <div className={styles.taskContainer}>
      <h4>{taskData.description}</h4>
      <ul className={styles.dropList} role="list">
        {items.map((item, index) => {
          const isCorrect = submitted && item === taskData.correctOrder[index];
          return (
            <li
              key={item}
              draggable={!submitted}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              className={`
                ${styles.dropItem}
                ${submitted ? (isCorrect ? styles.correct : styles.wrong) : ''}
              `}
            >
              {item}
            </li>
          );
        })}
      </ul>

      {!submitted ? (
        <button className={styles.submitButton} onClick={handleSubmit}>
          Überprüfen
        </button>
      ) : (
        <div className={styles.results}>
          <p>
            Du hast <strong>{score} von {taskData.items.length}</strong> Items richtig angeordnet.
          </p>
          <hr />
          <p>
            Deine bisherige Gesamtpunktzahl aus allen <strong>{taskCount}</strong> Übungen: <strong>{totalScore}</strong> Punkte.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderVertical;
