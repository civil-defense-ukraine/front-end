import { Link } from 'react-router-dom';

type Props = {
  classname?: string;
};

export const DonateButton: React.FC<Props> = ({ classname }) => {
  return (
    <Link
      to={'/donate'}
      className={`button button--secondary button--yellow ${classname}`}
    >
      <p>DONATE</p>
      <div className="icon icon--support--black icon--button"></div>
    </Link>
  );
};
