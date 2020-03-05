import React, { useEffect, useRef, useState } from "react";

const Timer = () => {
    const [started, setStarted] = useState(false);
    const [ms, setMs] = useState(0);
    const [result, setResult] = useState(0);
  
    const intervalRef = useRef();
  
    useEffect(() => {
      if (started) {
        const startTime = Date.now() - ms;
        const id = setInterval(() => {
          setMs(Date.now() - startTime);
        }, 16);
        intervalRef.current = id;
      }
      return () => clearInterval(intervalRef.current);
    });
    return {
      ms,
      result,
      running: started,
      start: () => setStarted(true),
      pause: () => {
        setStarted(false);
        setResult(Math.floor(ms / 1000));
      },
      stop: () => {
        setMs(0);
        setStarted(false);
      }
    };
  };

export default Timer;