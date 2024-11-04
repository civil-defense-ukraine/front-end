import classNames from 'classnames';
import { TeamMember } from '../../../../../types/TeamMember';

import styles from '../TeamSection.module.scss';
import { useState } from 'react';

type Props = {
  person: TeamMember;
};

export const TeamCard: React.FC<Props> = ({ person }) => {
  const { id, image, name, position, description } = person;
  const [loaded, setLoaded] = useState(false);

  return (
    <article className={styles.article} key={id}>
      <div className={`${styles.article__container} ${styles.article}`}>
        <div
          className={classNames(styles.article__img, {
            skeleton: !loaded,
          })}
        >
          <img
            className={`${styles.article__img}`}
            src={image}
            onLoad={() => setLoaded(true)}
            loading="lazy"
            onError={e => {
              e.currentTarget.src = require('../../../../../imgs/default/person.png');
              e.currentTarget.classList.add(styles.article__img__default);

              if (!e.currentTarget.dataset.retry) {
                e.currentTarget.src = new URL(
                  '../../../../../imgs/default/person.png',
                  import.meta.url,
                ).href;
                e.currentTarget.classList.add(styles.article__img__default);
                e.currentTarget.dataset.retry = 'true';
              } else {
                e.currentTarget.src =
                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNkZGRkZGQiLz48dGV4dCB4PSI1MCIgeT0iNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuMzVlbSIgZm9udC1zaXplPSI4Ij5JbWFnZSBFcnJvcjwvdGV4dD48L3N2Zz4=';
                e.currentTarget.classList.add(styles.article__img__placeholder);
              }
            }}
            alt={name}
          />
        </div>

        <p className={`${styles.article__name} heading--h3`}>{name}</p>
        {description.length >= 2 && (
          <div
            className={styles.article__quote}
            style={
              {
                '--hover-height': `${description.length * 0.8}px`,
              } as React.CSSProperties
            }
          >
            <p>{`"${description}"`}</p>
          </div>
        )}
        <p className={styles.article__text}>{position}</p>
      </div>
    </article>
  );
};
