import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { openBookingModal } from './BookingModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const boxHeight = 200; // rough estimate of header-text height, or just use fixed value
      const headerHeight = 100; // rough estimate
      if (scroll >= boxHeight - headerHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="sub-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <ul className="info">
                <li><i className="fa fa-envelope"></i> info@peakhaven.com</li>
                <li><i className="fa fa-map"></i> Sunny Isles Beach, FL 33160</li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4">
              <ul className="social-links">
                <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                <li><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
                <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ***** Header Area Start ***** */}
      <header className={`header-area header-sticky ${isScrolled ? 'background-header' : ''}`}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* ***** Logo Start ***** */}
                <Link to="/" className="logo">
                  <h1>PeakHaven</h1>
                </Link>
                {/* ***** Logo End ***** */}
                {/* ***** Menu Start ***** */}
                <ul className="nav" style={{ display: isMenuOpen ? 'block' : '' }}>
                  <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                  <li><Link to="/stay-options" className={location.pathname === '/stay-options' ? 'active' : ''}>Stay Options </Link></li>
                  <li><Link to="/amenities" className={location.pathname === '/amenities' ? 'active' : ''}>Amenities </Link></li>
                  <li><Link to="/attractions" className={location.pathname === '/attractions' ? 'active' : ''}>Attractions </Link></li>
                  <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact Us</Link></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); openBookingModal(); }}><i className="fa fa-calendar"></i> Schedule a visit</a></li>
                </ul>
                <a className={`menu-trigger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                  <span>Menu</span>
                </a>
                {/* ***** Menu End ***** */}
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* ***** Header Area End ***** */}
    </>
  );
};

export default Header;
