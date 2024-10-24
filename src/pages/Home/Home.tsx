import { Form } from '../../components/Form';
import { LatestNews } from '../../components/LatestNews';
import { AboutUs } from './components/AboutUs';
import { Achievements } from './components/Achievements';
import { ActiveDonation } from './components/ActiveDonation';
import { Donate } from '../../components/Donate';
import { Header } from './components/Header';

export const Home = () => {
  return (
    <>
      <Header />
      <AboutUs  />
      <Achievements />
      <ActiveDonation />
      <LatestNews />
      <Donate />
      <Form />
    </>
  );
};
