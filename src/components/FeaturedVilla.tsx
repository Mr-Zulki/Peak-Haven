import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const FeaturedVilla = () => {
  return (
    <>
<div className="featured section">
    <div className="container">
      <div className="row">
        <Reveal className="col-lg-4">
          <div className="left-image">
            <img src="assets/images/featured.jpg" alt="" />
            <Link to="/amenities"><img src="assets/images/featured-icon.png" alt="" style={{ maxWidth: '60px', padding: '0px' }} /></Link>
          </div>
        </Reveal>
        <Reveal className="col-lg-5" delay={0.2}>
          <div className="section-heading">
            <h6>| Featured</h6>
            <h2>Best Appartment &amp; Sea view</h2>
          </div>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Whats Best for you ?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                Get <strong>the best villa</strong> from PeakHaven is your gateway to unforgettable stays near the world’s most breathtaking landscapes. Whether you're chasing mountain peaks, forest trails, or hidden coastal gems, we connect you with curated accommodations and adventure-ready travel packages designed to inspire, explore, and elevate your journey. </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  How does this work ?
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  Simply <strong>select your destination</strong>, choose your preferred property type, and easily book your stay. We handle the rest, ensuring a seamless and unforgettable experience.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Why is Villa Agency the best ?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  Simply <strong>select your destination</strong>, choose your preferred property type, and easily book your stay. We handle the rest, ensuring a seamless and unforgettable experience.
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal className="col-lg-3" delay={0.4}>
          <div className="info-table">
            <ul>
              <li>
                <img src="assets/images/info-icon-01.png" alt="" style={{ maxWidth: '52px' }} />
                <h4>250 m2<br /><span>Total Flat Space</span></h4>
              </li>
              <li>
                <img src="assets/images/info-icon-02.png" alt="" style={{ maxWidth: '52px' }} />
                <h4>Contract<br /><span>Contract Ready</span></h4>
              </li>
              <li>
                <img src="assets/images/info-icon-03.png" alt="" style={{ maxWidth: '52px' }} />
                <h4>Payment<br /><span>Payment Process</span></h4>
              </li>
              <li>
                <img src="assets/images/info-icon-04.png" alt="" style={{ maxWidth: '52px' }} />
                <h4>Safety<br /><span>24/7 Under Control</span></h4>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  </div>
    </>
  );
};

export default FeaturedVilla;
