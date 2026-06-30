import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Inquiry {
  id: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data } = await supabase.schema('peakhaven').from('inquiries').select('*').order('created_at', { ascending: false });
    if (data) setInquiries(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      await supabase.schema('peakhaven').from('inquiries').delete().eq('id', id);
      fetchInquiries();
    }
  };

  return (
    <div>
      <h2 className="mb-4">Inquiries</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive bg-white shadow-sm rounded">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map(i => (
                <tr key={i.id}>
                  <td>{i.full_name}</td>
                  <td>{i.email}</td>
                  <td>{i.subject || '-'}</td>
                  <td><div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={i.message}>{i.message}</div></td>
                  <td>{new Date(i.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(i.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4">No inquiries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
