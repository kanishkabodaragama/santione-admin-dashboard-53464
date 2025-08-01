import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

// Mock data for guests
const mockGuests = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1 555-0123',
    nationality: 'USA',
    totalBookings: 3,
    lastStay: '2024-01-22',
    status: 'active'
  },
  {
    id: '2',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@email.com',
    phone: '+34 612-345-678',
    nationality: 'Spain',
    totalBookings: 1,
    lastStay: '2024-01-25',
    status: 'active'
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@email.com',
    phone: '+44 7700-123456',
    nationality: 'UK',
    totalBookings: 2,
    lastStay: '2024-01-27',
    status: 'active'
  }
];

// PUBLIC_INTERFACE
const Guests = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setGuests(mockGuests);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // PUBLIC_INTERFACE
  const filteredGuests = guests.filter(guest =>
    guest.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Guests</h1>
          <p className="dashboard-subtitle">Loading guests...</p>
        </div>
        <div className="card loading" style={{ height: '400px' }}></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Guests</h1>
        <p className="dashboard-subtitle">Manage your guest information</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Guest Directory</h3>
          <input
            type="text"
            placeholder="Search guests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-primary)',
              width: '200px'
            }}
          />
        </div>

        <div className="dashboard-grid" style={{ marginTop: '16px' }}>
          {filteredGuests.map(guest => (
            <div key={guest.id} className="card">
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: '600',
                  margin: '0 auto 12px'
                }}>
                  {guest.firstName[0]}{guest.lastName[0]}
                </div>
                <h3 style={{ margin: '0 0 4px', color: 'var(--text-primary)' }}>
                  {guest.firstName} {guest.lastName}
                </h3>
                <span className="status-badge active">{guest.nationality}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <Mail size={14} />
                  <span>{guest.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <Phone size={14} />
                  <span>{guest.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <Calendar size={14} />
                  <span>{guest.totalBookings} bookings</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <MapPin size={14} />
                  <span>Last stay: {new Date(guest.lastStay).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guests;
