import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ properties: 0, bookings: 0, inquiries: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [propRes, bookRes, inqRes] = await Promise.all([
        supabase.schema('peakhaven').from('properties').select('*', { count: 'exact', head: true }),
        supabase.schema('peakhaven').from('bookings').select('*', { count: 'exact', head: true }),
        supabase.schema('peakhaven').from('inquiries').select('*', { count: 'exact', head: true }),
      ]);
      
      setStats({
        properties: propRes.count || 0,
        bookings: bookRes.count || 0,
        inquiries: inqRes.count || 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center shadow-sm" style={{ padding: '30px', border: 'none', borderRadius: '10px' }}>
            <h4>Properties</h4>
            <h1 style={{ color: '#f35525', margin: '20px 0 0 0' }}>{stats.properties}</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm" style={{ padding: '30px', border: 'none', borderRadius: '10px' }}>
            <h4>Bookings</h4>
            <h1 style={{ color: '#f35525', margin: '20px 0 0 0' }}>{stats.bookings}</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm" style={{ padding: '30px', border: 'none', borderRadius: '10px' }}>
            <h4>Inquiries</h4>
            <h1 style={{ color: '#f35525', margin: '20px 0 0 0' }}>{stats.inquiries}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
