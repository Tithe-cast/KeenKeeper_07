import { NavLink } from 'react-router-dom'
import { Home, Clock, BarChart2 } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/timeline', label: 'Timeline', icon: Clock },
  { to: '/stats', label: 'Stats', icon: BarChart2 },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E9E9E9] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo — "Keen" dark, "Keeper" green, matching provided image */}
        <NavLink to="/" className="text-xl tracking-tight select-none">
          <span style={{ color: '#101727', fontWeight: 700 }}>Keen</span>
          <span style={{ color: '#244D3F', fontWeight: 700 }}>Keeper</span>
        </NavLink>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#244D3F] text-white'
                    : 'text-[#64748B] hover:text-[#101727] hover:bg-[#F8FAFC]'
                }`
              }
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
