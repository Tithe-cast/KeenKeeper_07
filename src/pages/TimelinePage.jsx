import { useState, useRef, useEffect } from 'react'
import { Phone, MessageSquare, Video, ChevronDown } from 'lucide-react'
import { useTimeline } from '../context/TimelineContext'

const FILTERS = ['All', 'Call', 'Text', 'Video']

export default function TimelinePage() {
  const { entries } = useTimeline()
  const [filter, setFilter] = useState('All')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Filter out meetup entries entirely
  const allEntries = entries.filter(e => e.type !== 'meetup')

  const filtered = filter === 'All'
    ? allEntries
    : allEntries.filter(e => e.type.toLowerCase() === filter.toLowerCase())

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short', month: 'long', day: 'numeric', year: 'numeric'
    })

  const grouped = filtered.reduce((acc, entry) => {
    const key = new Date(entry.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    if (!acc[key]) acc[key] = []
    acc[key].push(entry)
    return acc
  }, {})

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#101727]">Timeline</h1>
        <span className="text-sm text-[#64748B] bg-white border border-[#E9E9E9] px-3 py-1 rounded-full">
          {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      {/* Dropdown filter */}
      <div className="relative mb-6" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-[#E9E9E9] rounded-lg text-sm text-[#101727] shadow-sm"
        >
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 4 21 4 14 12 14 19 10 21 10 12 3 4"></polygon>
            </svg>
            {filter}
          </span>

          <svg
            className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-[#E9E9E9] rounded-lg shadow-md overflow-hidden">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f)
                  setDropdownOpen(false)
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  filter === f
                    ? 'bg-[#244D3F] text-white'
                    : 'text-[#101727] hover:bg-[#f1f5f9]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grouped entries */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🕐</p>
          <p className="text-[#64748B] text-sm">No timeline entries found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {Object.entries(grouped).map(([month, monthEntries]) => (
            <div key={month}>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-3 px-1">{month}</p>
              <div className="flex flex-col gap-1.5">
                {monthEntries.map((entry, i) => {
                  const config = TYPE_CONFIG[entry.type] || TYPE_CONFIG.text
                  const Icon = config.icon
                  return (
                    <div
                      key={entry.id}
                      className="flex items-center gap-4 bg-white border border-[#E9E9E9] rounded-xl px-5 py-3.5 hover:shadow-sm transition-all fade-in"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <div className={`w-9 h-9 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0 border ${config.border}`}>
                        <Icon size={15} className={config.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#101727]">
                          <span className="font-semibold">{config.label}</span>
                          <span className="text-[#64748B]"> with </span>
                          <span className="font-medium">{entry.friendName}</span>
                        </p>
                        <p className="text-xs text-[#64748B] mt-0.5">{formatDate(entry.date)}</p>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${config.bg} ${config.color} hidden sm:inline`}>
                        {config.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}