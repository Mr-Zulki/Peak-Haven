import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BookingModal from './BookingModal';
import WhatsAppButton from './WhatsAppButton';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <BookingModal />
      <WhatsAppButton />
    </>
  );
};

export default MainLayout;
