import React, { useState } from 'react';
import { Menu, Bell, Sun, Moon, Plus, User } from 'lucide-react';

// PUBLIC_INTERFACE
const Header = ({ user, onLogout, onToggleSidebar, theme, onToggleTheme }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notificationCount] = useState(3);

  // PUBLIC_INTERFACE
  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  // PUBLIC_INTERFACE
  const handleAddProperty = () => {
    // Implement add property functionality
    console.log('Add property clicked');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onToggleSidebar}>
          <Menu size={24} />
        </button>
        <a href="/dashboard" className="logo">
          Santione
        </a>
      </div>

      <div className="header-right">
        <button className="notification-btn">
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </button>

        <button className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="add-property-btn" onClick={handleAddProperty}>
          <Plus size={16} />
          Add Property
        </button>

        <div className="user-menu">
          <div 
            className="user-avatar"
            onClick={handleUserMenuToggle}
            style={{
              backgroundColor: '#1976D2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            {user?.firstName?.[0] || <User size={16} />}
          </div>
          
          {showUserMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '8px 0',
              minWidth: '200px',
              boxShadow: '0 4px 16px var(--shadow-medium)',
              zIndex: 1000
            }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                  {user?.firstName} {user?.lastName}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {user?.email}
                </div>
              </div>
              <button 
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--hover-bg)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Profile Settings
              </button>
              <button 
                onClick={onLogout}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'var(--error-color)',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--hover-bg)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
