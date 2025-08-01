import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Home, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Lock, 
  Camera, 
  Car, 
  FileText,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

// Mock data for charts and KPIs
const revenueData = [
  { month: 'Jan', revenue: 45000, bookings: 28 },
  { month: 'Feb', revenue: 52000, bookings: 32 },
  { month: 'Mar', revenue: 48000, bookings: 30 },
  { month: 'Apr', revenue: 61000, bookings: 38 },
  { month: 'May', revenue: 55000, bookings: 34 },
  { month: 'Jun', revenue: 67000, bookings: 42 }
];

const propertyData = [
  { name: 'Active', value: 24, color: '#4caf50' },
  { name: 'Maintenance', value: 3, color: '#ff9800' },
  { name: 'Inactive', value: 1, color: '#f44336' }
];

const bookingStatusData = [
  { name: 'Confirmed', value: 45, color: '#4caf50' },
  { name: 'Pending', value: 12, color: '#ff9800' },
  { name: 'Cancelled', value: 3, color: '#f44336' }
];

// PUBLIC_INTERFACE
const Dashboard = () => {
  const [kpiData, setKpiData] = useState({
    totalProperties: 28,
    totalBookings: 60,
    monthlyRevenue: 67000,
    occupancyRate: 78,
    pendingTasks: 15,
    activeStaff: 12,
    issuesReported: 3,
    smartLocks: 25,
    cameras: 18,
    parkingSpots: 35
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // PUBLIC_INTERFACE
  const KPICard = ({ icon: Icon, title, value, change, changeType, color = '#1976D2' }) => (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <Icon className="card-icon" style={{ color }} />
      </div>
      <div className="kpi-value" style={{ color }}>{value}</div>
      {change && (
        <div className={`kpi-change ${changeType}`}>
          <TrendingUp size={14} />
          <span>{change}</span>
        </div>
      )}
    </div>
  );

  // PUBLIC_INTERFACE
  const ChartCard = ({ title, children }) => (
    <div className="card" style={{ gridColumn: 'span 2' }}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="chart-container">
        {children}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening with your properties.</p>
        </div>
        <div className="dashboard-grid">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="card loading">
              <div style={{ height: '100px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's what's happening with your properties.</p>
      </div>

      <div className="dashboard-grid">
        <KPICard
          icon={Home}
          title="Total Properties"
          value={kpiData.totalProperties}
          change="+2 this month"
          changeType="positive"
          color="#1976D2"
        />

        <KPICard
          icon={Calendar}
          title="Total Bookings"
          value={kpiData.totalBookings}
          change="+15% vs last month"
          changeType="positive"
          color="#00BFA5"
        />

        <KPICard
          icon={DollarSign}
          title="Monthly Revenue"
          value={`€${kpiData.monthlyRevenue.toLocaleString()}`}
          change="+8.2% vs last month"
          changeType="positive"
          color="#FF9800"
        />

        <KPICard
          icon={TrendingUp}
          title="Occupancy Rate"
          value={`${kpiData.occupancyRate}%`}
          change="+3.5% vs last month"
          changeType="positive"
          color="#4CAF50"
        />

        <KPICard
          icon={Clock}
          title="Pending Tasks"
          value={kpiData.pendingTasks}
          color="#FF9800"
        />

        <KPICard
          icon={Users}
          title="Active Staff"
          value={kpiData.activeStaff}
          color="#2196F3"
        />

        <KPICard
          icon={AlertTriangle}
          title="Issues Reported"
          value={kpiData.issuesReported}
          color="#F44336"
        />

        <KPICard
          icon={CheckCircle}
          title="Sync Status"
          value="Online"
          color="#4CAF50"
        />

        <ChartCard title="Revenue & Bookings Trend">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
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
              <Bar dataKey="revenue" fill="#1976D2" name="Revenue (€)" />
              <Bar dataKey="bookings" fill="#00BFA5" name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Property Status</h3>
            <Home className="card-icon" />
          </div>
          <div className="chart-container" style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={propertyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {propertyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Booking Status</h3>
            <Calendar className="card-icon" />
          </div>
          <div className="chart-container" style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Smart Systems</h3>
            <Lock className="card-icon" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={16} color="#4CAF50" />
                <span>Smart Locks</span>
              </div>
              <span className="status-badge active">{kpiData.smartLocks} Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Camera size={16} color="#2196F3" />
                <span>Cameras</span>
              </div>
              <span className="status-badge active">{kpiData.cameras} Online</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Car size={16} color="#FF9800" />
                <span>Parking</span>
              </div>
              <span className="status-badge active">{kpiData.parkingSpots} Spots</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <FileText className="card-icon" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <CheckCircle size={16} color="#4CAF50" />
              <span>New booking confirmed - Villa Santorini</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Clock size={16} color="#FF9800" />
              <span>Maintenance scheduled - Apartment Rome</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Users size={16} color="#2196F3" />
              <span>New staff member added</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <XCircle size={16} color="#F44336" />
              <span>Booking cancelled - House Barcelona</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="quick-actions">
        <button className="quick-action-btn" title="Add Property">
          <Home size={20} />
        </button>
        <button className="quick-action-btn" title="Sync OTAs">
          <TrendingUp size={20} />
        </button>
        <button className="quick-action-btn" title="Export Report">
          <FileText size={20} />
        </button>
        <button className="quick-action-btn" title="Search">
          <Users size={20} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
