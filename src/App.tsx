import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StayOptions from './pages/StayOptions';
import Amenities from './pages/Amenities';
import NearbyAttractions from './pages/NearbyAttractions';
import Contact from './pages/Contact';
import PropertyDetail from './pages/PropertyDetail';
import MainLayout from './components/MainLayout';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminProperties from './pages/AdminProperties';
import AdminBookings from './pages/AdminBookings';
import AdminInquiries from './pages/AdminInquiries';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      {/* ***** Preloader Start ***** */}
      <div id="js-preloader" className="js-preloader loaded">
        <div className="preloader-inner">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      {/* ***** Preloader End ***** */}
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/stay-options" element={<StayOptions />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/attractions" element={<NearbyAttractions />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="inquiries" element={<AdminInquiries />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
