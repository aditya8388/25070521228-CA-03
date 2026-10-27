import React, { useEffect, useState } from 'react';
import { IconClock } from './Icons';

const Timer = ({ initialMinutes = 5, onTimeUp }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    // Reset timer if initialMinutes changes
    setSecondsLeft(initialMinutes * 60);
  }, [initialMinutes]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft, onTimeUp]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isWarning = secondsLeft <= 60;

  return (
    <div className={`quiz-timer-box ${isWarning ? 'timer-warning' : ''}`} title="Time Remaining">
      <IconClock size={18} />
      <span>{formattedTime}</span>
    </div>
  );
};

export default Timer;
