import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, Download, Calendar, TrendingUp, DollarSign, Home } from 'lucide-react';

// Mock data for reports
const monthlyData = [
  { month: 'Jan', revenue: 45000, bookings: 28, occupancy: 72 },
  { month: 'Feb', revenue: 52000, bookings: 32, occupancy: 78 },
  { month: 'Mar', revenue: 48000, bookings: 30, occupancy: 75 },
  { month: 'Apr', revenue: 61000, bookings: 38, occupancy: 82 },
  { month: 'May', revenue: 55000, bookings: 34, occupancy: 79 },
  { month: 'Jun', revenue: 67000, bookings: 42, occupancy: 85 }
];

const propertyPerformance = [
  { property: 'Villa Santorini', revenue: 18000, bookings: 12, rating: 4.8 },
  { property: 'Apartment Rome', revenue: 15000, bookings: 15, rating: 4.6 },
  { property: 'House Barcelona', revenue: 22000, bookings: 18, rating: 4.9 },
  { property: 'Studio Paris', revenue: 12000, bookings: 14, rating: 4.5 }
];

// PUBLIC_INTERFACE
const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('6months');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // PUBLIC_INTERFACE
  const handleExport = (format) => {
    console.log(`Exporting report in ${format} format`);
    // Implement export functionality
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Reports</h1>
          <p className="dashboard-subtitle">Loading reports...</p>
        </div>
        <div className="dashboard-grid">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="card loading">
              <div style={{ height: '300px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}></div>
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
          <h1 className="dashboard-title">Reports & Analytics</h1>
          <p className="dashboard-subtitle">Comprehensive business insights and performance metrics</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-primary)'
            }}
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button 
            onClick={() => handleExport('pdf')}
            className="add-property-btn"
          >
            <Download size={16} />
            Export PDF
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '4px' }}>
          {['overview', 'revenue', 'properties', 'bookings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: activeTab === tab ? 'var(--card-bg)' : 'transparent',
                color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: activeTab === tab ? '600' : '400'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="dashboard-grid">
          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div className="card-header">
              <h3 className="card-title">Revenue Trend</h3>
              <TrendingUp className="card-icon" />
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="month" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card-bg)', 
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#1976D2" strokeWidth={3} name="Revenue (€)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Key Metrics</h3>
              <FileText className="card-icon" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Revenue</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: 'var(--success-color)' }}>
                  €328,000
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Bookings</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-color)' }}>
                  204
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Avg. Occupancy</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: 'var(--warning-color)' }}>
                  78.5%
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Active Properties</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: 'var(--info-color)' }}>
                  28
                </span>
              </div>
            </div>
          </div>

          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div className="card-header">
              <h3 className="card-title">Occupancy Rate</h3>
              <Calendar className="card-icon" />
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="month" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card-bg)', 
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="occupancy" fill="#00BFA5" name="Occupancy %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'properties' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Property Performance</h3>
            <Home className="card-icon" />
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Revenue</th>
                  <th>Bookings</th>
                  <th>Rating</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {propertyPerformance.map((property, index) => (
                  <tr key={index}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Home size={16} />
                        {property.property}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <DollarSign size={16} />
                        €{property.revenue.toLocaleString()}
                      </div>
                    </td>
                    <td>{property.bookings}</td>
                    <td>
                      <span style={{ 
                        backgroundColor: property.rating >= 4.7 ? '#e8f5e8' : '#fff3e0',
                        color: property.rating >= 4.7 ? '#4caf50' : '#ff9800',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        ⭐ {property.rating}
                      </span>
                    </td>
                    <td>
                      <div style={{ 
                        width: '100px', 
                        height: '8px', 
                        backgroundColor: 'var(--bg-tertiary)', 
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{ 
                          width: `${(property.revenue / 25000) * 100}%`, 
                          height: '100%', 
                          backgroundColor: 'var(--success-color)',
                          borderRadius: '4px'
                        }}></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
