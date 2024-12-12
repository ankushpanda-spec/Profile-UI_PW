import React, { useEffect, useState } from 'react';
import { Typography } from '@pw-tech/omni-ui';
import s from '../styles/index.module.css';

interface TimerComponentProps {
  seconds: number; // The initial time in seconds
  onTimerEnd?: () => void; // Optional callback when the timer ends
}

const TimerComponent: React.FC<TimerComponentProps> = ({ seconds, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) return; // If the timer is already done, no need to set up another interval

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval); // Stop the timer when it reaches 0
          if (onTimerEnd) onTimerEnd(); // Call the callback if provided
          return 0; // Ensures the timer reaches 0
        }
        return prevTime - 1; // Decrease the time by 1 second
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timerInterval);
  }, [timeLeft, onTimerEnd]);

  return (
    <div className="text-center">
      <Typography
        color="static-black"
        variant="tiny"
        weight="medium"
        className={`${s.timerText}`} // This class is for the CSS styles you provided
      >
        {timeLeft} seconds
      </Typography>
    </div>
  );
};

export default TimerComponent;
