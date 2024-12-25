import React, { useState, useEffect, useCallback } from "react";

const CountdownTime = ({ targetHour = 24 }) => {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(targetHour, 0, 0, 0);

    const difference = targetTime - now;

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return { hours, minutes, seconds };
    } else {
      return { hours: 0, minutes: 0, seconds: 0 };
    }
  }, [targetHour]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const formatTime = (time) => String(time).padStart(2, "0");

  return (
    <div>
      {formatTime(timeLeft.hours)} : {formatTime(timeLeft.minutes)} :
      {formatTime(timeLeft.seconds)}
    </div>
  );
};

export default CountdownTime;
