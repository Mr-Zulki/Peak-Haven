import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Property {
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
  created_at: string;
}

const AdminProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProp, setEditingProp] = useState<Partial<Property> | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const { data } = await supabase.schema('peakhaven').from('properties').select('*').order('created_at', { ascending: false });
    if (data) setProperties(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      await supabase.schema('peakhaven').from('properties').delete().eq('id', id);
      fetchProperties();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProp?.id) {
      // Update
      await supabase.schema('peakhaven').from('properties').update(editingProp).eq('id', editingProp.id);
    } else {
      // Insert
      await supabase.schema('peakhaven').from('properties').insert([editingProp]);
    }
    setEditingProp(null);
    fetchProperties();
  };

  if (editingProp) {
    return (
      <div>
        <h3 className="mb-4">{editingProp.id ? 'Edit Property' : 'Add Property'}</h3>
        <form onSubmit={handleSave} className="bg-white p-4 shadow-sm rounded">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Title</label>
              <input type="text" className="form-control" required value={editingProp.title || ''} onChange={e => setEditingProp({...editingProp, title: e.target.value})} />
            </div>
            <div className="col-md-6 mb-3">
              <label>Type (e.g. Apartment, Villa)</label>
              <input type="text" className="form-control" required value={editingProp.type || ''} onChange={e => setEditingProp({...editingProp, type: e.target.value})} />
            </div>
            <div className="col-md-6 mb-3">
              <label>Price</label>
              <input type="number" className="form-control" required value={editingProp.price || 0} onChange={e => setEditingProp({...editingProp, price: Number(e.target.value)})} />
            </div>
            <div className="col-md-6 mb-3">
              <label>Location</label>
              <input type="text" className="form-control" required value={editingProp.location || ''} onChange={e => setEditingProp({...editingProp, location: e.target.value})} />
            </div>
            <div className="col-md-3 mb-3">
              <label>Bedrooms</label>
              <input type="number" className="form-control" required value={editingProp.bedrooms || 0} onChange={e => setEditingProp({...editingProp, bedrooms: Number(e.target.value)})} />
            </div>
            <div className="col-md-3 mb-3">
              <label>Bathrooms</label>
              <input type="number" className="form-control" required value={editingProp.bathrooms || 0} onChange={e => setEditingProp({...editingProp, bathrooms: Number(e.target.value)})} />
            </div>
            <div className="col-md-3 mb-3">
              <label>Area (m2)</label>
              <input type="number" className="form-control" required value={editingProp.area_m2 || 0} onChange={e => setEditingProp({...editingProp, area_m2: Number(e.target.value)})} />
            </div>
            <div className="col-md-3 mb-3">
              <label>Floor</label>
              <input type="text" className="form-control" required value={editingProp.floor || ''} onChange={e => setEditingProp({...editingProp, floor: e.target.value})} />
            </div>
            <div className="col-md-6 mb-3">
              <label>Parking</label>
              <input type="text" className="form-control" required value={editingProp.parking || ''} onChange={e => setEditingProp({...editingProp, parking: e.target.value})} />
            </div>
            <div className="col-md-6 mb-3">
              <label>Image URL</label>
              <input type="text" className="form-control" required value={editingProp.image_url || ''} onChange={e => setEditingProp({...editingProp, image_url: e.target.value})} />
            </div>
          </div>
          <button type="submit" className="btn btn-dark me-2">Save Property</button>
          <button type="button" className="btn btn-secondary" onClick={() => setEditingProp(null)}>Cancel</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Properties</h2>
        <button className="btn btn-dark" onClick={() => setEditingProp({ title: '', type: '', price: 0, location: '', bedrooms: 0, bathrooms: 0, area_m2: 0, floor: '', parking: '', image_url: '' })}>Add Property</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive bg-white shadow-sm rounded">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Price</th>
                <th>Location</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(p => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{p.type}</td>
                  <td>${p.price.toLocaleString()}</td>
                  <td>{p.location}</td>
                  <td>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setEditingProp(p)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4">No properties found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProperties;
