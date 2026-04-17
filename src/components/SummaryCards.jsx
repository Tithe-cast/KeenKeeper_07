import { useTimeline } from '../context/TimelineContext'

export default function SummaryCards({ friends }) {
  const { entries } = useTimeline()

  const total = friends.length
  const onTrack = friends.filter(f => f.status === 'on-track').length
  const needAttention = friends.filter(f => f.status !== 'on-track').length

  const now = new Date()
  const thisMonthInteractions = entries.filter(e => {
    const d = new Date(e.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  const cards = [
    { label: 'Total Friends', value: total },
    { label: 'On Track', value: onTrack },
    { label: 'Need Attention', value: needAttention },
    { label: 'Interactions This Month', value: thisMonthInteractions },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {cards.map((card, i) => (
        <div
          key={card.label}
          className="bg-white border border-[#E9E9E9] rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow fade-in"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <p className="text-3xl font-bold text-[#101727]">{card.value}</p>
          <p className="text-xs text-[#64748B] mt-1 leading-tight">{card.label}</p>
        </div>
      ))}
    </div>
  )
}
