import classNames from 'classnames';
import { TeamMember } from '../../../../../types/TeamMember';

import styles from '../TeamSection.module.scss';

type Props = {
  person: TeamMember;
};

export const TeamCard: React.FC<Props> = ({ person }) => {
  const { id, image, name, position } = person;

  return (
    <article className={styles.article} key={id}>
      <img
        className={classNames(styles.article__img, {
          [styles.article__img__default]: true,
        })}
        loading="lazy"
        src={image}
        onError={e => {
          e.currentTarget.src = require('../../../../../imgs/default/person.png');
        }}
        alt={name}
      />
      <p className={`${styles.article__name} heading--h3`}>{name}</p>
      <p className={styles.article__text}>{position}</p>
    </article>
  );
};
