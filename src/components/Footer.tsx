import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h2 className="logo">PeakHaven</h2>
          <p>Your gateway to scenic getaways, thrilling adventures, and cozy stays nestled in nature’s best locations.</p>
        </div>
    
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/stay-options">Destinations</Link></li>
            <li><Link to="/amenities">Adventure Packages</Link></li>
            
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
    
        <div className="footer-col">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>456 Summit Ave, Explorer’s Peak</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone-alt"></i>
            <span>+1 987 654 3210</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <span>info@peakhaven.com</span>
          </div>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
    
        <div className="footer-col">
          <h3>Join Our Explorer List</h3>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    
      <div className="footer-bottom">
        <p>© 2025 PeakHaven. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
