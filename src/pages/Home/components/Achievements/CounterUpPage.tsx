import CountUp from 'react-countup';

type Props = {
  startValue: number;
  endValue: number;
};

export const CounterUpPage: React.FC<Props> = ({ startValue, endValue }) => {
  return (
    <h2 className="heading--h2">
      <CountUp start={startValue} end={endValue} duration={2} delay={0} />
      {' +'}
    </h2>
  );
};
