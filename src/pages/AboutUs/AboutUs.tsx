import { useLocation } from 'react-router-dom';
import styles from './AboutUs.module.scss';
import { Form } from '../../components/Form';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { team } from '../../services/team';
import { TeamMember } from '../../types/TeamMember';
import { AboutUsInfo } from './components/AboutUsInfo';
import { Location } from './components/Location/Location';
import { TeamSection } from './components/TeamSeaction';

export const AboutUs = () => {
  const { pathname } = useLocation();
 

  return (
    <section>
      <div className={styles.header}>
        <div className={styles.breadcrmbs}> <p>Home</p>{
          pathname.slice(1).split('/').map((path, index, all) => {
            const nornalizedPath = path.replaceAll('-', ' ').split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
            const lastIndex = index === all.length - 1;

            return <React.Fragment key={path}>
              <div className={`${styles.breadcrmbs__arrow} icon icon--arrow`}></div>
              {lastIndex ? <p className={styles.breadcrmbs__text_disabled}>{nornalizedPath}</p> :
                <p>{nornalizedPath}</p>
              }
            </React.Fragment>
          })}
        </div>
      </div>

      <AboutUsInfo />


      <TeamSection />
      <Location />
      <Form />
    </section>
  );
}