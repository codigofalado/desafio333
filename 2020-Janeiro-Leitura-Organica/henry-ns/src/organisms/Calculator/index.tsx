import React, { FC, useState, useRef } from 'react';

import Timer, { TimerRef } from '~/atoms/Timer';

import Result from '../Result';

import { Container, FinishButton } from './styles';

interface Props {
  data: {
    author: string;
    origin: string;
    paragraphs: string[];
  };
}

const Calculator: FC<Props> = ({ data }) => {
  const [start, setStart] = useState(true);
  const [pmm, setPmm] = useState(0);

  const timerRef = useRef<TimerRef>(null);

  function calculateResult() {
    setStart(false);

    const seconds = timerRef.current?.getSeconds() ?? 0;

    const words: number = data.paragraphs.reduce(
      (final, paragraph) =>
        final +
        paragraph
          .replace('— ', '')
          .replace('- ', '')
          .split(' ').length,
      0
    );

    const calculatedPmm = words / (seconds / 60);

    setPmm(+calculatedPmm.toFixed(2));
  }

  return (
    <Container>
      {start ? (
        <>
          <Timer start={start} ref={timerRef} />
          <article>
            <h1>{data.origin}</h1>
            <h2>{data.author}</h2>
            {data.paragraphs.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
          <FinishButton onClick={calculateResult}>Finalizar</FinishButton>
        </>
      ) : (
        <Result ppm={pmm} />
      )}
    </Container>
  );
};

export default Calculator;
