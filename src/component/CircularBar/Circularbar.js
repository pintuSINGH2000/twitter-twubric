import React from "react";
import styles from "./circularbar.module.css";

const Circularbar = ({friendRating,influenceRating, chirpinessRating,score}) => {
  return (
    <div
      className={styles.container}
      style={{ width: 100, height: 100, fontSize: 24 }}
    >
      <svg
        // className="ant-progress-circle"
        viewBox="0 0 100 100"
        role="presentation"
      >
        <circle
          className={`${styles.circle} ${styles.circle1}`}
          r="47.5"
          cx={50}
          cy={50}
          opacity={1}
          style={{ strokeDasharray: "236.274px, 298.451" }}
          stroke="#ffb70033"
         
        />
        <circle
          className={`${styles.circle} ${styles.circle1}`}
          r="47.5"
          cx={50}
          cy={50}
          opacity={1}
          style={{ strokeDasharray: `${friendRating}, 298.451` }}
          stroke="#ffb700"
        />
        <circle
          className={`${styles.circle} ${styles.circle2}`}
          r="47.5"
          cx={50}
          cy={50}
          opacity={1}
          style={{ strokeDasharray: "236.274px, 298.451" }}
           
           stroke="#1cbaba33"
        />
        <circle
          className={`${styles.circle} ${styles.circle2}`}
          r="47.5"
          cx={50}
          cy={50}
          opacity={1}
          style={{ strokeDasharray: `${influenceRating}, 298.451` }}
          stroke="#1cbaba"
        />
        <circle
          className={`${styles.circle} ${styles.circle3}`}
          r="47.5"
          cx={50}
          cy={50}
          opacity={1}
          style={{ strokeDasharray: "236.274px, 298.451" }}
          stroke="#9cff77"
        />
        <circle
          className={`${styles.circle} ${styles.circle3}`}
          r="47.5"
          cx={50}
          cy={50}
          opacity={1}
          style={{ strokeDasharray: `${chirpinessRating}, 298.451` }}
          stroke="#6bda41"
        />
      </svg>
      <span className={styles.score}>
        {score}/10
      </span>
    </div>
  );
};

export default Circularbar;
