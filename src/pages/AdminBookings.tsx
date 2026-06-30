import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Booking {
  id: string;
  property_id: string;
  full_name: string;
  email: string;
  visit_date: string;
  message: string;
  created_at: string;
  propertyTitle?: string;
}

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    // Fetch bookings
    const { data: bData } = await supabase.schema('peakhaven').from('bookings').select('*').order('created_at', { ascending: false });
    
    if (bData) {
      // Fetch related properties to get titles
      const propIds = [...new Set(bData.map(b => b.property_id).filter(Boolean))];
      if (propIds.length > 0) {
        const { data: pData } = await supabase.schema('peakhaven').from('properties').select('id, title').in('id', propIds);
        const pMap = (pData || []).reduce((acc: any, p) => ({ ...acc, [p.id]: p.title }), {});
        
        const enriched = bData.map(b => ({ ...b, propertyTitle: pMap[b.property_id] || b.property_id }));
        setBookings(enriched);
      } else {
        setBookings(bData);
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      await supabase.schema('peakhaven').from('bookings').delete().eq('id', id);
      fetchBookings();
    }
  };

  return (
    <div>
      <h2 className="mb-4">Bookings</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive bg-white shadow-sm rounded">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Visit Date</th>
                <th>Property</th>
                <th>Message</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td>{b.full_name}</td>
                  <td>{b.email}</td>
                  <td>{b.visit_date}</td>
                  <td>{b.propertyTitle || 'General / None'}</td>
                  <td><div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={b.message}>{b.message || '-'}</div></td>
                  <td>{new Date(b.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(b.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
