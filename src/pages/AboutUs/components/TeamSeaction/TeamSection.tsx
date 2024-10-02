import { useEffect, useMemo, useState } from 'react';
import styles from './TeamSection.module.scss';
import { TeamMember } from '../../../../types/TeamMember';
import { team } from '../../../../services/team';
import { useWidth } from '../../../../hooks/useWidth';
import classNames from 'classnames';


export const TeamSection = () => {
  const [showAllTeam, setShowAllTeam] = useState(false);
  const [volunteers, setVolunteers] = useState<TeamMember[]>([]);
  const width = useWidth();
  const getVisibleTeam = useMemo(() => {
    if (showAllTeam) {
      return volunteers;
    }

    if (width >= 1440) {
      return volunteers.slice(0, 3);
    } else {
      return volunteers.slice(0, 2);
    }
  }, [width, showAllTeam, volunteers]);

  useEffect(() => {
    team.get().then((peopleFromServer) => {
      setVolunteers(peopleFromServer);
    })
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={`${styles.header} heading--h2`}>Our Team</h2>
      <div className={classNames(`${styles.team}`, {
        [styles.team__short]: !showAllTeam
      })} >
        {getVisibleTeam.map((person) => {
          const { id, image, name, position } = person;

          return (
            <article className={styles.article} key={id}>
              <img className={styles.article__img} src={image} alt={name} />
              <p className={`${styles.article__name} heading--h3`}>{name}</p>
              <p className={styles.article__text}>{position}</p>
            </article>
          )
        })}
      </div>
      <button
        className='button button--transparent'
        onClick={() => {setShowAllTeam(prevState => !prevState)}}
      >
        {`${showAllTeam ? 'SEE LESS' : 'SEE ALL'} `}
      </button> 
    </section>
  )
}