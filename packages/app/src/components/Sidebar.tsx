import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const NAV_ITEMS = [
  { to: '/',           icon: '◈',  label: 'Dashboard'    },
  { to: '/projects',   icon: '⬡',  label: 'Projects'     },
  { to: '/runs',       icon: '▶',  label: 'Test Runs'    },
  { to: '/suites',     icon: '⊞',  label: 'Test Suites'  },
  { to: '/ai',         icon: '✦',  label: 'AI Assistant' },
  { to: '/settings',   icon: '⚙',  label: 'Settings'     },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <span className="sidebar__logo-icon">⬡</span>
        <span className="sidebar__logo-text">TestForge</span>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
            }
          >
            <span className="sidebar__link-icon">{item.icon}</span>
            <span className="sidebar__link-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__avatar">LT</div>
          <div className="sidebar__user-info">
            <span className="sidebar__user-name">Luis Tirado</span>
            <span className="sidebar__user-role">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
