import styles from './AboutUs.module.scss';
import { Form } from '../../components/Form';
import React, { useEffect } from 'react';
import { AboutUsInfo } from './components/AboutUsInfo';
import { Location } from './components/Location/Location';
import { TeamSection } from './components/TeamSeaction';
import { Breadcrumbs } from '../../components/Breadcrumbs';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section>
      <div className={styles.header}>
        <div className={styles.max_width}>
          <Breadcrumbs />
        </div>
      </div>
      <section className={styles.max_width}>
        <AboutUsInfo />
      </section>
      <TeamSection />
      <Location />
      <Form />
    </section>
  );
};

export default AboutUs;
