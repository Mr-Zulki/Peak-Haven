import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import type { Property } from '../components/PackagesGrid';
import { openBookingModal } from '../components/BookingModal';

const StayOptions = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Show All');

  useEffect(() => {
    async function fetchProperties() {
      const { data } = await supabase.schema('peakhaven').from('properties').select('*').order('created_at', { ascending: true });
      if (data) setProperties(data);
      setLoading(false);
    }
    fetchProperties();
  }, []);

  const filteredProperties = activeTab === 'Show All' 
    ? properties 
    : properties.filter(p => p.type.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <>
      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="breadcrumb"><a href="#">Home</a> / Properties</span>
              <h3>Properties</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="section properties">
        <div className="container">
          <ul className="properties-filter">
            <li><a className={activeTab === 'Show All' ? 'is_active' : ''} href="#!" onClick={(e) => { e.preventDefault(); setActiveTab('Show All'); }}>Show All</a></li>
            <li><a className={activeTab === 'Appartment' ? 'is_active' : ''} href="#!" onClick={(e) => { e.preventDefault(); setActiveTab('Appartment'); }}>Apartment</a></li>
            <li><a className={activeTab === 'Villa' ? 'is_active' : ''} href="#!" onClick={(e) => { e.preventDefault(); setActiveTab('Villa'); }}>Villa House</a></li>
            <li><a className={activeTab === 'Penthouse' ? 'is_active' : ''} href="#!" onClick={(e) => { e.preventDefault(); setActiveTab('Penthouse'); }}>Penthouse</a></li>
          </ul>

          <div className="row properties-box">
            {loading ? (
              <div className="col-12 text-center p-5"><h4>Loading properties...</h4></div>
            ) : filteredProperties.map(property => (
              <div className="col-lg-4 col-md-6 align-self-center mb-30 properties-items" key={property.id}>
                <div className="item">
                  <Link to={`/property/${property.id}`}><img src={property.image_url.startsWith('/') ? property.image_url : `/${property.image_url}`} alt={property.title} /></Link>
                  <span className="category">{property.type}</span>
                  <h6>${property.price.toLocaleString()}</h6>
                  <h4><Link to={`/property/${property.id}`}>{property.location}</Link></h4>
                  <ul>
                    <li>Bedrooms: <span>{property.bedrooms}</span></li>
                    <li>Bathrooms: <span>{property.bathrooms}</span></li>
                    <li>Area: <span>{property.area_m2}m2</span></li>
                    <li>Floor: <span>{property.floor}</span></li>
                    <li>Parking: <span>{property.parking}</span></li>
                  </ul>
                  <div className="main-button">
                    <a href="#" onClick={(e) => { e.preventDefault(); openBookingModal(property.id); }}>Schedule a visit</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default StayOptions;
