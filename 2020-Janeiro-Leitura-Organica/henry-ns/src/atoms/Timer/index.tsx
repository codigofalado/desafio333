import React, {
  useMemo,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  RefForwardingComponent,
} from 'react';

import {
  motion,
  useViewportScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import { Container } from './styles';

interface Props {
  start: boolean;
}

export interface TimerRef {
  getSeconds: () => number;
}

function addZero(time: number): string {
  return time > 9 ? String(time) : `0${time}`;
}

const Timer: RefForwardingComponent<TimerRef, Props> = ({ start }, ref) => {
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const pathLength = useSpring(yRange, {
    stiffness: 400,
    damping: 90,
  });

  const [seconds, setSeconds] = useState(0);
  const formartedTime = useMemo(
    () => `${addZero(Math.floor(seconds / 60))}:${addZero(seconds % 60)}`,
    [seconds]
  );

  useEffect(() => {
    if (!start) return () => {};

    const interval = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, start]);

  useImperativeHandle(ref, () => ({
    getSeconds: () => seconds,
  }));

  return (
    <Container>
      <svg viewBox="0 0 50 50">
        <motion.path
          fill="none"
          strokeWidth="2"
          strokeDasharray="0 1"
          d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
          style={{
            pathLength,
            rotate: 90,
            translateX: 5,
            translateY: 5,
            scaleX: -1, // Reverse direction of line animation
          }}
        />
      </svg>
      <span>{formartedTime}</span>
    </Container>
  );
};

export default forwardRef(Timer);
