import { useState } from "react";
import styles from "./app.module.css";
import data from "./data.json";

export const App = () => {
  const [steps, setSteps] = useState(data);
  const [activeIndex, setActiveIndex] = useState(0);
  const nextStepHandler = () => {
    if (!finalStep) return setActiveIndex(activeIndex + 1);
  };
  const previousStepHandler = () => {
    if (!firstStep) return setActiveIndex(activeIndex - 1);
  };

  const retryHandler = () => {
    return setActiveIndex(0);
  };

  let firstStep = activeIndex === 0 ? true : false;
  let finalStep = activeIndex === data.length - 1 ? true : false;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles["steps-content"]}>
            {steps[activeIndex].content}
          </div>
          <ul className={styles["steps-list"]}>
            {steps.map((step) => {
              let style = "";
              if (activeIndex === Number(step.id) - 1) {
                style = styles["steps-item"] + " " + styles.active;
              } else if (activeIndex > Number(step.id) - 1) {
                style = styles["steps-item"] + " " + styles.done;
              } else {
                style = styles["steps-item"];
              }
              const el = (
                <li key={step.id} className={style}>
                  <button
                    className={styles["steps-item-button"]}
                    onClick={() => setActiveIndex(Number(step.id) - 1)}
                  >
                    {Number(step.id)}
                  </button>
                  {step.title}
                </li>
              );
              return el;
            })}
          </ul>
          <div className={styles["buttons-container"]}>
            {firstStep === true ? (
              <button
                className={styles.button}
                disabled
                onClick={previousStepHandler}
              >
                Назад
              </button>
            ) : (
              <button className={styles.button} onClick={previousStepHandler}>
                Назад
              </button>
            )}
            {finalStep !== true ? (
              <button className={styles.button} onClick={nextStepHandler}>
                Далее
              </button>
            ) : (
              <button className={styles.button} onClick={retryHandler}>
                Начать сначала
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
