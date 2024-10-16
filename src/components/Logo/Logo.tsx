type Props = {
  classname?: string;
};

export const Logo: React.FC<Props> = ({ classname = 'logo' }) => {
  return (
    <img
      className={classname}
      loading="lazy"
      src={require('../../imgs/logo.png')}
      alt="CDU logo"
    />
  );
};
