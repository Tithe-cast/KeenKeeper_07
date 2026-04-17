import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { useTimeline } from '../context/TimelineContext'
import { Phone, MessageSquare, Video } from 'lucide-react'

const COLORS = { call: '#244D3F', text: '#8B5CF6', video: '#22C55E' }
const TYPE_ICONS = { call: Phone, text: MessageSquare, video: Video }

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-[#E9E9E9] rounded-xl shadow-lg px-4 py-3 text-sm">
        <p className="font-semibold text-[#101727]">{payload[0].name}</p>
        <p className="text-[#64748B]">{payload[0].value} interactions</p>
      </div>
    )
  }
  return null
}

export default function StatsPage() {
  const { entries } = useTimeline()

  // Filter out meetup
  const relevant = entries.filter(e => e.type !== 'meetup')

  const counts = relevant.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1
    return acc
  }, {})

  const data = Object.entries(counts).map(([type, value]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value, type,
  }))

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-[#101727] mb-8">Friendship Analytics</h1>

      {/* Pie chart only — no status summary cards */}
      <div className="bg-white border border-[#E9E9E9] rounded-2xl p-6 shadow-sm fade-in">
        <p className="text-sm font-semibold text-[#101727] mb-0.5">By Interaction Type</p>
        <p className="text-xs text-[#64748B] mb-6">{relevant.length} total interactions logged</p>

        {data.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📊</p>
            <p className="text-[#64748B] text-sm">No interactions yet.</p>
            <p className="text-[#64748B] text-xs mt-1">Start checking in with friends to see your stats.</p>
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={115}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={COLORS[entry.type] || '#64748B'} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={v => <span style={{ color: '#64748B', fontSize: 13 }}>{v}</span>}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Breakdown */}
            <div className="grid grid-cols-3 gap-4 mt-4 pt-5 border-t border-[#E9E9E9]">
              {data.map(({ type, name, value }) => {
                const Icon = TYPE_ICONS[type]
                const pct = Math.round((value / relevant.length) * 100)
                return (
                  <div key={type} className="text-center">
                    <div className="w-9 h-9 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: COLORS[type] + '22' }}>
                      <Icon size={15} style={{ color: COLORS[type] }} />
                    </div>
                    <p className="text-xl font-bold text-[#101727]">{value}</p>
                    <p className="text-xs text-[#64748B]">{name}s</p>
                    <p className="text-xs font-medium mt-0.5" style={{ color: COLORS[type] }}>{pct}%</p>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
