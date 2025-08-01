import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  Calendar, 
  Users, 
  UserCheck, 
  FileText, 
  Settings,
  Lock,
  Camera,
  Car,
  Briefcase
} from 'lucide-react';

// PUBLIC_INTERFACE
const Sidebar = ({ isOpen }) => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/properties', icon: Home, label: 'Properties' },
    { path: '/bookings', icon: Calendar, label: 'Bookings' },
    { path: '/guests', icon: Users, label: 'Guests' },
    { path: '/staff', icon: UserCheck, label: 'Staff' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/smart-locks', icon: Lock, label: 'Smart Locks' },
    { path: '/cameras', icon: Camera, label: 'Cameras' },
    { path: '/parking', icon: Car, label: 'Parking' },
    { path: '/contracts', icon: Briefcase, label: 'Contracts' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav>
        <ul className="sidebar-nav">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <item.icon className="nav-icon" />
                <span className="nav-text">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
