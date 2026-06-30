import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import type { Property } from '../components/PackagesGrid';
import { openBookingModal } from '../components/BookingModal';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      if (!id) return;
      const { data, error } = await supabase.schema('peakhaven').from('properties').select('*').eq('id', id).single();
      if (!error && data) {
        setProperty(data);
      }
      setLoading(false);
    }
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Loading property details...</h2>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Property not found.</h2>
      </div>
    );
  }

  return (
    <>
      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="breadcrumb"><a href="#">Home</a> / {property.type}</span>
              <h3>{property.title}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="single-property section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="main-image">
                <img src={property.image_url.startsWith('/') ? property.image_url : `/${property.image_url}`} alt={property.title} />
              </div>
              <div className="main-content">
                <span className="category">{property.type}</span>
                <h4>{property.location}</h4>
                <p>Experience unparalleled comfort and luxury in this exclusive property. Thoughtfully designed with modern aesthetics and top-tier amenities, it offers the perfect setting for relaxation and adventure alike.</p>
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Best for you ?
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Simply <strong>select your destination</strong>, choose your preferred property type, and easily book your stay. We handle the rest, ensuring a seamless and unforgettable experience.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="info-table">
                <ul>
                  <li>Total Flat Space <span>{property.area_m2} m2</span></li>
                  <li>Floor number <span>{property.floor}</span></li>
                  <li>Number of rooms <span>{property.bedrooms}</span></li>
                  <li>Parking Available <span>{property.parking}</span></li>
                  <li>Price <span>${property.price.toLocaleString()}</span></li>
                </ul>
                <div className="main-button" style={{ marginTop: '30px' }}>
                  <button className="btn w-100" style={{ backgroundColor: '#1e1e1e', color: 'white', padding: '12px 0', borderRadius: '25px', fontWeight: 'bold' }} onClick={() => openBookingModal(property.id)}>Schedule a visit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetail;
