import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const BookingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    visit_date: '',
    message: ''
  });

  useEffect(() => {
    const handleOpen = (e: any) => {
      setPropertyId(e.detail?.propertyId || null);
      setIsOpen(true);
      setSuccess(false);
    };
    window.addEventListener('openBookingModal', handleOpen);
    return () => window.removeEventListener('openBookingModal', handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("BookingModal form submitted! Property ID:", propertyId, "Data:", formData);
    setLoading(true);
    try {
      console.log("Sending booking to peakhaven.bookings...");
      const { error } = await supabase.schema('peakhaven').from('bookings').insert([{
        property_id: propertyId,
        full_name: formData.full_name,
        email: formData.email,
        visit_date: formData.visit_date,
        message: formData.message
      }]);
      console.log("Insert response error:", error);
      
      setLoading(false);
      if (!error) {
        setSuccess(true);
        setFormData({ full_name: '', email: '', visit_date: '', message: '' });
        setTimeout(() => setIsOpen(false), 3000);
      } else {
        alert("Error scheduling visit: " + error.message);
      }
    } catch (err) {
      console.error("Unexpected error in BookingModal handleSubmit:", err);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h4>Schedule a Visit</h4>
          <button onClick={() => setIsOpen(false)} style={closeBtnStyle}>&times;</button>
        </div>
        
        {success ? (
          <div className="alert alert-success">Your visit has been scheduled successfully! We will contact you shortly.</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Full Name</label>
              <input type="text" className="form-control" required value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} />
            </div>
            <div className="mb-3">
              <label>Email Address</label>
              <input type="email" className="form-control" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="mb-3">
              <label>Visit Date</label>
              <input type="date" className="form-control" required value={formData.visit_date} onChange={e => setFormData({...formData, visit_date: e.target.value})} />
            </div>
            <div className="mb-3">
              <label>Message (Optional)</label>
              <textarea className="form-control" rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
            </div>
            <button type="submit" className="btn btn-dark w-100" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const openBookingModal = (propertyId: string | null = null) => {
  window.dispatchEvent(new CustomEvent('openBookingModal', { detail: { propertyId } }));
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 99999,
  display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: '#fff', padding: '30px', borderRadius: '10px',
  width: '100%', maxWidth: '500px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
};

const closeBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer'
};

export default BookingModal;
