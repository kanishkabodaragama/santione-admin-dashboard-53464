import React, { useState, useEffect } from 'react';
import { Home, Plus, Edit, Trash2, MapPin, Users, Bed } from 'lucide-react';

// Mock data for properties
const mockProperties = [
  {
    id: '1',
    name: 'Villa Santorini',
    address: '123 Sunset Boulevard, Santorini, Greece',
    type: 'Villa',
    bedrooms: 4,
    guests: 8,
    status: 'active',
    image: '/api/placeholder/300/200'
  },
  {
    id: '2',
    name: 'Apartment Rome',
    address: '456 Via del Corso, Rome, Italy',
    type: 'Apartment',
    bedrooms: 2,
    guests: 4,
    status: 'active',
    image: '/api/placeholder/300/200'
  },
  {
    id: '3',
    name: 'House Barcelona',
    address: '789 Passeig de Gracia, Barcelona, Spain',
    type: 'House',
    bedrooms: 3,
    guests: 6,
    status: 'maintenance',
    image: '/api/placeholder/300/200'
  }
];

// PUBLIC_INTERFACE
const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // PUBLIC_INTERFACE
  const filteredProperties = properties.filter(property => 
    filter === 'all' || property.status === filter
  );

  // PUBLIC_INTERFACE
  const handleAddProperty = () => {
    console.log('Add new property');
  };

  // PUBLIC_INTERFACE
  const handleEditProperty = (propertyId) => {
    console.log('Edit property:', propertyId);
  };

  // PUBLIC_INTERFACE
  const handleDeleteProperty = (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(p => p.id !== propertyId));
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Properties</h1>
          <p className="dashboard-subtitle">Loading properties...</p>
        </div>
        <div className="dashboard-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card loading">
              <div style={{ height: '200px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Properties</h1>
          <p className="dashboard-subtitle">Manage your property portfolio</p>
        </div>
        <button className="add-property-btn" onClick={handleAddProperty}>
          <Plus size={16} />
          Add Property
        </button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Filter:</span>
          {['all', 'active', 'maintenance', 'inactive'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                padding: '8px 16px',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                backgroundColor: filter === status ? 'var(--primary-color)' : 'var(--card-bg)',
                color: filter === status ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-grid">
        {filteredProperties.map(property => (
          <div key={property.id} className="card">
            <div style={{ 
              height: '200px', 
              backgroundColor: 'var(--bg-tertiary)', 
              borderRadius: '8px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}>
              <Home size={48} />
            </div>
            
            <div className="card-header">
              <h3 className="card-title">{property.name}</h3>
              <span className={`status-badge ${property.status}`}>
                {property.status}
              </span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <MapPin size={14} />
                <span>{property.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Bed size={14} />
                  <span>{property.bedrooms} beds</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={14} />
                  <span>{property.guests} guests</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleEditProperty(property.id)}
                style={{
                  flex: 1,
                  padding: '8px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Edit size={14} />
                Edit
              </button>
              <button
                onClick={() => handleDeleteProperty(property.id)}
                style={{
                  padding: '8px',
                  border: '1px solid var(--error-color)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--error-color)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
