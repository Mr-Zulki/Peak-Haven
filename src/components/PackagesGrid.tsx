import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { openBookingModal } from './BookingModal';
import Reveal from './Reveal';

export interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area_m2: number;
  floor: string;
  parking: string;
  image_url: string;
}

const PackagesGrid = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      const { data, error } = await supabase.schema('peakhaven').from('properties').select('*').order('created_at', { ascending: true });
      if (!error && data) {
        setProperties(data);
      }
      setLoading(false);
    }
    fetchProperties();
  }, []);

  return (
    <>
      <div className="properties section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 offset-lg-4">
              <div className="section-heading text-center">
                <h6>| Packages</h6>
                <h2>We Bring You the Best Stays & Adventure Escapes You'll Love</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {loading ? (
              <div className="col-12 text-center" style={{ padding: '50px 0' }}><h4>Loading properties...</h4></div>
            ) : properties.map((property, index) => (
              <Reveal className="col-lg-4 col-md-6" key={property.id} delay={(index % 3) * 0.1}>
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
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PackagesGrid;
