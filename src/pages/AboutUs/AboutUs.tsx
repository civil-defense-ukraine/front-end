import { useLocation } from 'react-router-dom';
import styles from './AboutUs.module.scss';
import { Form } from '../../components/Form';
import React from 'react';
import { AboutUsInfo } from './components/AboutUsInfo';
import { Location } from './components/Location/Location';
import { TeamSection } from './components/TeamSeaction';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const AboutUs = () => {
  const { pathname } = useLocation();

  return (
    <section>
      <div className={styles.header}>
        <Breadcrumbs />
      </div>

      <AboutUsInfo />

      <TeamSection />
      <Location />
      <Form />
    </section>
  );
};
