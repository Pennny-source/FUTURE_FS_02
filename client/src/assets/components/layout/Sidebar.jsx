import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  FiGrid, FiUsers, FiBarChart2, FiCheckSquare, FiMessageSquare, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { useAuth } from "../../../hooks/useAuth";

const links = [
  { to: '/', icon: FiGrid, label: 'Dashboard' },
  { to: '/leads', icon: FiUsers, label: 'Leads' },
  { to: '/analytics', icon: FiBarChart2, label: 'Analytics' },
  { to: '/tasks', icon: FiCheckSquare, label: 'Tasks' },
  { to: '/messages', icon: FiMessageSquare, label: 'Messages' },
  { to: '/settings', icon: FiSettings, label: 'Settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

  return (
    <aside className={`${collapsed ? 'w-24' : 'w-[290px]'} transition-all duration-300 bg-[#07101C] border-r border-white/5 flex flex-col`}>
    <div className="p-4 flex items-center justify-between border-b border-white/10">

  {!collapsed && (
    <div className="flex items-center gap-3">

      <div className="w-12 h-12 rounded-xl bg-[#0f172a] border border-cyan-500/20 flex items-center justify-center">

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 20V10"
            stroke="#36D7FF"
            strokeWidth="2"
          />

          <path
            d="M10 20V5"
            stroke="#36D7FF"
            strokeWidth="2"
          />

          <path
            d="M16 20V14"
            stroke="#36D7FF"
            strokeWidth="2"
          />

          <path
            d="M22 20V8"
            stroke="#36D7FF"
            strokeWidth="2"
          />
        </svg>

      </div>

      <div>
        <h2 className="text-2xl font-bold text-cyan-300">
          LeadFlow
        </h2>

        <p className="text-[10px] tracking-[3px] text-slate-500">
          ENTERPRISE CRM
        </p>
      </div>

    </div>
  )}

  <button
    onClick={() => setCollapsed(!collapsed)}
    className="text-gray-400 hover:text-white"
  >
    {collapsed ? (
      <FiChevronRight size={20} />
    ) : (
      <FiChevronLeft size={20} />
    )}
  </button>

</div>
      <nav className="flex-1 mt-4 space-y-1 px-2">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-200 group ${
                isActive? 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/20' : 'text-slate-400 hover:bg-white/5 hover:text-cyan-200'
              }`
            }
          >
            <Icon size={20} />
            {!collapsed && <span className="text-sm font-medium">{label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-gray-400 hover:text-red-400 w-full px-3 py-2 rounded-lg hover:bg-white/5 transition"
        >
          <FiLogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}