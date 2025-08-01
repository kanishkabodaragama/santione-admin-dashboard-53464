import React, { useState, useEffect } from 'react';
import { Calendar, User, Home, DollarSign, Filter } from 'lucide-react';

// Mock data for bookings
const mockBookings = [
  {
    id: '1',
    propertyName: 'Villa Santorini',
    guestName: 'John Smith',
    checkIn: '2024-01-15',
    checkOut: '2024-01-22',
    status: 'confirmed',
    totalAmount: 2800,
    source: 'airbnb'
  },
  {
    id: '2',
    propertyName: 'Apartment Rome',
    guestName: 'Maria Garcia',
    checkIn: '2024-01-18',
    checkOut: '2024-01-25',
    status: 'pending',
    totalAmount: 1400,
    source: 'booking.com'
  },
  {
    id: '3',
    propertyName: 'House Barcelona',
    guestName: 'David Wilson',
    checkIn: '2024-01-20',
    checkOut: '2024-01-27',
    status: 'checked-in',
    totalAmount: 2100,
    source: 'direct'
  }
];

// PUBLIC_INTERFACE
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // PUBLIC_INTERFACE
  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  // PUBLIC_INTERFACE
  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'checked-in': return '#2196F3';
      case 'checked-out': return '#9E9E9E';
      case 'cancelled': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Bookings</h1>
          <p className="dashboard-subtitle">Loading bookings...</p>
        </div>
        <div className="card loading" style={{ height: '400px' }}></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Bookings</h1>
        <p className="dashboard-subtitle">Manage all your property bookings</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Bookings</h3>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Filter size={16} />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                backgroundColor: 'var(--card-bg)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked-in">Checked In</option>
              <option value="checked-out">Checked Out</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Property</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => (
                <tr key={booking.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <User size={16} />
                      {booking.guestName}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Home size={16} />
                      {booking.propertyName}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={16} />
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={16} />
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ 
                        backgroundColor: `${getStatusColor(booking.status)}20`,
                        color: getStatusColor(booking.status)
                      }}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <DollarSign size={16} />
                      €{booking.totalAmount.toLocaleString()}
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      textTransform: 'capitalize',
                      padding: '4px 8px',
                      backgroundColor: 'var(--bg-tertiary)',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {booking.source}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
