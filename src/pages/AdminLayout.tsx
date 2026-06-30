import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const menu = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Properties', path: '/admin/properties' },
    { name: 'Bookings', path: '/admin/bookings' },
    { name: 'Inquiries', path: '/admin/inquiries' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#1e1e1e', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: '#fff', marginBottom: '40px', fontWeight: 'bold' }}>PeakHaven Admin</h3>
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {menu.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name} style={{ marginBottom: '10px' }}>
                  <Link 
                    to={item.path} 
                    style={{ 
                      display: 'block', padding: '10px 15px', color: isActive ? '#f35525' : '#fff', 
                      backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                      borderRadius: '5px', textDecoration: 'none', fontWeight: isActive ? 'bold' : 'normal'
                    }}>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <button onClick={handleLogout} className="btn btn-outline-light w-100" style={{ marginTop: 'auto' }}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
