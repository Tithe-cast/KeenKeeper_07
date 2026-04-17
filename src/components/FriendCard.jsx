import { useNavigate } from 'react-router-dom'
import StatusBadge from './StatusBadge'

export default function FriendCard({ friend, index = 0 }) {
  const navigate = useNavigate()

  const borderColors = {
    overdue: 'border-red-200 hover:border-red-300',
    'almost due': 'border-amber-200 hover:border-amber-300',
    'on-track': 'border-green-200 hover:border-green-300',
  }

  return (
    <div
      onClick={() => navigate(`/friend/${friend.id}`)}
      className={`bg-white rounded-xl border ${borderColors[friend.status] || 'border-[#E9E9E9]'} p-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 fade-in`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex flex-col items-center text-center gap-2.5">
        <div className="relative">
          <img
            src={friend.picture}
            alt={friend.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
            onError={e => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=244D3F&color=fff&size=64`
            }}
          />
        </div>
        <div>
          <h3 className="font-semibold text-[#101727] text-sm leading-tight">{friend.name}</h3>
          <p className="text-xs text-[#64748B] mt-0.5">{friend.days_since_contact}d ago</p>
        </div>
        <div className="flex flex-wrap justify-center gap-1">
          {friend.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="bg-[#F8FAFC] border border-[#E9E9E9] text-[#64748B] text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wide font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <StatusBadge status={friend.status} />
      </div>
    </div>
  )
}
