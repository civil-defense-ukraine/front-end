import { Form } from '../../components/Form';
import { LatestNews } from '../../components/LatestNews';
import { AboutUs } from './components/AboutUs';
import { Achievements } from './components/Achievements';
import { ActiveDonation } from './components/ActiveDonation';
import { Donate } from '../../components/Donate';
import { Header } from './components/Header';
import { WorkProcess } from './components/WorkProcess/WorkProcess';

export const Home = () => {
  return (
    <>
      <Header />
      <AboutUs />
      <Achievements />
      <ActiveDonation />
      <WorkProcess />
      <LatestNews />
      <Donate />
      <Form />
    </>
  );
};
