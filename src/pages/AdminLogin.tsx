import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    
    if (error) {
      setError(error.message);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="contact-content">
              <form onSubmit={handleLogin} style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '10px', boxShadow: '0px 0px 15px rgba(0,0,0,0.15)' }}>
                <div className="section-heading text-center" style={{ marginBottom: '30px' }}>
                  <h2>Admin Login</h2>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <fieldset style={{ marginBottom: '20px' }}>
                  <label>Email</label>
                  <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
                </fieldset>
                <fieldset style={{ marginBottom: '20px' }}>
                  <label>Password</label>
                  <input type="password" className="form-control" required value={password} onChange={e => setPassword(e.target.value)} />
                </fieldset>
                <button type="submit" className="btn btn-dark w-100" style={{ padding: '12px' }} disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
