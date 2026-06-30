import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Property } from './PackagesGrid';
import { openBookingModal } from './BookingModal';
import Reveal from './Reveal';

const BestDeals = () => {
  const [activeTab, setActiveTab] = useState('Appartment');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      const { data } = await supabase.schema('peakhaven').from('properties').select('*');
      if (data) setProperties(data);
      setLoading(false);
    }
    fetchProperties();
  }, []);

  // Use a map to filter best deal by type
  const activeProperty = properties.find(p => p.type.toLowerCase().includes(activeTab.toLowerCase())) || properties[0];

  return (
    <>
      <div className="section best-deal">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="section-heading">
                <h6>| Best Deal</h6>
                <h2>Find Your Best Deal Right Now!</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="tabs-content">
                <div className="row">
                  <div className="nav-wrapper ">
                    <ul className="nav nav-tabs" role="tablist">
                      {['Appartment', 'Luxury Villa', 'Penthouse'].map(tab => (
                        <li className="nav-item" role="presentation" key={tab}>
                          <button className={`nav-link ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)} type="button">{tab}</button>
                        </li>
                      ))}
                    </ul>
                  </div>              
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active">
                      {loading ? (
                        <div className="text-center p-5">Loading deals...</div>
                      ) : activeProperty ? (
                        <div className="row">
                          <Reveal className="col-lg-3">
                            <div className="info-table">
                              <ul>
                                <li>Total Flat Space <span>{activeProperty.area_m2} m2</span></li>
                                <li>Floor number <span>{activeProperty.floor}</span></li>
                                <li>Number of rooms <span>{activeProperty.bedrooms}</span></li>
                                <li>Parking Available <span>Yes</span></li>
                                <li>Payment Process <span>Bank</span></li>
                              </ul>
                            </div>
                          </Reveal>
                          <Reveal className="col-lg-6" delay={0.2}>
                            <img src={activeProperty.image_url.startsWith('/') ? activeProperty.image_url : `/${activeProperty.image_url}`} alt={activeProperty.title} />
                          </Reveal>
                          <Reveal className="col-lg-3" delay={0.4}>
                            <h4>Extra Info About Place</h4>
                            <p>Experience unparalleled comfort and luxury in this exclusive property. Thoughtfully designed with modern aesthetics and top-tier amenities, it offers the perfect setting for relaxation and adventure alike.
                            <br /><br />PeakHaven is your gateway to unforgettable stays near the world’s most breathtaking landscapes. Whether you're chasing mountain peaks, forest trails, or hidden coastal gems, we connect you with curated accommodations and adventure-ready travel packages designed to inspire, explore, and elevate your journey.</p>
                            <div className="icon-button">
                              <a href="#" onClick={(e) => { e.preventDefault(); openBookingModal(activeProperty.id); }}><i className="fa fa-calendar"></i> Schedule a visit</a>
                            </div>
                          </Reveal>
                        </div>
                      ) : (
                        <div className="text-center p-5">No deals found for this type.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestDeals;
