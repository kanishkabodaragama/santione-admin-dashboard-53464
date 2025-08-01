import React, { useState, useEffect } from 'react';
import { UserCheck, Mail, Phone, Briefcase, Clock } from 'lucide-react';

// Mock data for staff
const mockStaff = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@santione.com',
    phone: '+1 555-0101',
    role: 'Property Manager',
    department: 'Operations',
    status: 'active',
    tasksCompleted: 24,
    tasksPending: 3
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Martinez',
    email: 'bob.martinez@santione.com',
    phone: '+1 555-0102',
    role: 'Maintenance',
    department: 'Facilities',
    status: 'active',
    tasksCompleted: 18,
    tasksPending: 5
  },
  {
    id: '3',
    firstName: 'Carol',
    lastName: 'Davis',
    email: 'carol.davis@santione.com',
    phone: '+1 555-0103',
    role: 'Cleaner',
    department: 'Housekeeping',
    status: 'active',
    tasksCompleted: 32,
    tasksPending: 2
  }
];

// PUBLIC_INTERFACE
const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setStaff(mockStaff);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // PUBLIC_INTERFACE
  const filteredStaff = staff.filter(member =>
    filter === 'all' || member.department.toLowerCase() === filter
  );

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Staff</h1>
          <p className="dashboard-subtitle">Loading staff...</p>
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
        <h1 className="dashboard-title">Staff</h1>
        <p className="dashboard-subtitle">Manage your team members</p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Department:</span>
          {['all', 'operations', 'facilities', 'housekeeping'].map(dept => (
            <button
              key={dept}
              onClick={() => setFilter(dept)}
              style={{
                padding: '8px 16px',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                backgroundColor: filter === dept ? 'var(--primary-color)' : 'var(--card-bg)',
                color: filter === dept ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-grid">
        {filteredStaff.map(member => (
          <div key={member.id} className="card">
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--secondary-color)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: '600',
                margin: '0 auto 12px'
              }}>
                {member.firstName[0]}{member.lastName[0]}
              </div>
              <h3 style={{ margin: '0 0 4px', color: 'var(--text-primary)' }}>
                {member.firstName} {member.lastName}
              </h3>
              <span className="status-badge active">{member.status}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Briefcase size={14} />
                <span>{member.role}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <UserCheck size={14} />
                <span>{member.department}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Mail size={14} />
                <span>{member.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Phone size={14} />
                <span>{member.phone}</span>
              </div>
            </div>

            <div style={{ 
              borderTop: '1px solid var(--border-color)', 
              paddingTop: '16px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--success-color)' }}>
                  {member.tasksCompleted}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Completed
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--warning-color)' }}>
                  {member.tasksPending}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Pending
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;
