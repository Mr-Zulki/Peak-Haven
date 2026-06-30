import HeroSearch from '../components/HeroSearch';
import FeaturedVilla from '../components/FeaturedVilla';
import VideoSection from '../components/VideoSection';
import InfoStats from '../components/InfoStats';
import BestDeals from '../components/BestDeals';
import PackagesGrid from '../components/PackagesGrid';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <>
      <HeroSearch />
      <FeaturedVilla />
      <VideoSection />
      <InfoStats />
      <BestDeals />
      <PackagesGrid />
      <ContactSection />
    </>
  );
};

export default Home;
