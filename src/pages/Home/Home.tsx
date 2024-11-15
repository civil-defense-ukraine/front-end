import { Form } from '../../components/Form';
import { LatestNews } from '../../components/LatestNews';
import { AboutUs } from './components/AboutUs';
import { Achievements } from './components/Achievements';
import { ActiveDonation } from './components/ActiveDonation';
import { Donate } from '../../components/Donate';
import { Header } from './components/Header';
import { WorkProcess } from './components/WorkProcess/WorkProcess';
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <section className={styles.container}>
      <Header />
      <AboutUs />
      <Achievements />
      <ActiveDonation />
      <WorkProcess />
      <LatestNews />
      <Donate />
      <Form />
   </section>
  );
};
