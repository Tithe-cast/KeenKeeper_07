import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Phone, MessageSquare, Video, Clock, Archive, Trash2, ChevronLeft, Pencil, Mail, X, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTimeline } from '../context/TimelineContext'
import StatusBadge from '../components/StatusBadge'

function EditGoalModal({ friend, onSave, onClose }) {
  const [goal, setGoal] = useState(friend.goal)
  const presets = [7, 14, 21, 30, 60, 90]

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-[#101727]">Edit Relationship Goal</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#64748B] hover:bg-[#E9E9E9] transition-colors">
            <X size={14} />
          </button>
        </div>
        <p className="text-xs text-[#64748B] mb-4">How often do you want to connect with <strong>{friend.name}</strong>?</p>

        {/* Preset grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {presets.map(d => (
            <button
              key={d}
              onClick={() => setGoal(d)}
              className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                goal === d ? 'bg-[#244D3F] text-white border-[#244D3F]' : 'bg-white text-[#64748B] border-[#E9E9E9] hover:border-[#244D3F]'
              }`}
            >
              Every {d}d
            </button>
          ))}
        </div>

        {/* Custom input */}
        <div className="flex items-center gap-2 mb-5">
          <input
            type="number"
            min={1}
            max={365}
            value={goal}
            onChange={e => setGoal(parseInt(e.target.value) || 1)}
            className="flex-1 border border-[#E9E9E9] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#244D3F] text-center font-bold text-[#101727]"
          />
          <span className="text-sm text-[#64748B]">days</span>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-[#E9E9E9] rounded-xl py-2.5 text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
            Cancel
          </button>
          <button
            onClick={() => { onSave(goal); onClose() }}
            className="flex-1 bg-[#244D3F] text-white rounded-xl py-2.5 text-sm font-medium hover:bg-[#2d6350] transition-colors flex items-center justify-center gap-1.5"
          >
            <Check size={14} /> Save Goal
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FriendDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { friends, friendsLoading, addEntry, updateFriendGoal } = useTimeline()
  const [showEditGoal, setShowEditGoal] = useState(false)

  const friend = friends.find(f => f.id === parseInt(id))

  const handleCheckin = (type) => {
    addEntry(type, friend.name)
    const icons = { call: '📞', text: '💬', video: '🎥' }
    toast.success(`${icons[type]} ${type.charAt(0).toUpperCase() + type.slice(1)} with ${friend.name.split(' ')[0]} logged!`)
  }

  const handleSaveGoal = (newGoal) => {
    updateFriendGoal(friend.id, newGoal)
    toast.success('Relationship goal updated!')
  }

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })

  if (friendsLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="spinner" />
      </div>
    )
  }

  if (!friend) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-4">🔍</p>
        <p className="text-[#101727] font-semibold text-lg mb-2">Friend not found</p>
        <p className="text-[#64748B] text-sm mb-6">This person doesn't exist in your connections.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-[#244D3F] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2d6350] transition-colors"
        >
          Go back home
        </button>
      </div>
    )
  }

  const progress = Math.min((friend.days_since_contact / friend.goal) * 100, 100)
  const progressHex =
    friend.status === 'overdue'    ? '#EF4444' :
    friend.status === 'almost due' ? '#F59E0B' : '#22C55E'

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-[#64748B] hover:text-[#244D3F] mb-6 transition-colors group"
      >
        <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* ─── LEFT COLUMN ─── */}
        <div className="flex flex-col gap-4">

          {/* Friend Info Card */}
          <div className="bg-white border border-[#E9E9E9] rounded-2xl p-6 text-center shadow-sm fade-in">
            <img
              src={friend.picture}
              alt={friend.name}
              className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-white shadow-lg mb-3"
              onError={e => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=244D3F&color=fff&size=80`
              }}
            />
            <h1 className="text-xl font-bold text-[#101727]">{friend.name}</h1>
            <div className="flex justify-center mt-2 mb-3">
              <StatusBadge status={friend.status} />
            </div>
            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
              {friend.tags.map(tag => (
                <span key={tag} className="bg-[#CBFADB] text-[#244D3F] text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wide font-semibold">
                  {tag}
                </span>
              ))}
            </div>
            {friend.bio && (
              <p className="text-sm text-[#64748B] italic leading-relaxed mb-3">"{friend.bio}"</p>
            )}
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#64748B]">
              <Mail size={12} />
              <span>{friend.email}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white border border-[#E9E9E9] rounded-2xl overflow-hidden shadow-sm fade-in" style={{ animationDelay: '80ms' }}>
            {[
              { icon: Clock,   label: 'Snooze 2 Weeks', textClass: 'text-[#101727]', hoverBg: 'hover:bg-[#F8FAFC]' },
              { icon: Archive, label: 'Archive',         textClass: 'text-[#101727]', hoverBg: 'hover:bg-[#F8FAFC]' },
              { icon: Trash2,  label: 'Delete',          textClass: 'text-red-500',   hoverBg: 'hover:bg-red-50'    },
            ].map(({ icon: Icon, label, textClass, hoverBg }, i, arr) => (
              <button
                key={label}
                className={`w-full flex items-center justify-center gap-2 py-4 text-sm font-medium ${textClass} ${hoverBg} transition-colors ${i < arr.length - 1 ? 'border-b border-[#E9E9E9]' : ''}`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── RIGHT COLUMN ─── */}
        <div className="flex flex-col gap-4">

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 fade-in" style={{ animationDelay: '100ms' }}>
            {[
              { label: 'Days Since Contact', value: friend.days_since_contact },
              { label: 'Goal (Days)',         value: friend.goal },
              { label: 'Next Due',            value: formatDate(friend.next_due_date) },
            ].map(card => (
              <div key={card.label} className="bg-white border border-[#E9E9E9] rounded-2xl p-4 text-center shadow-sm">
                <p className={`font-bold text-[#101727] ${String(card.value).length > 5 ? 'text-base leading-tight' : 'text-3xl'}`}>
                  {card.value}
                </p>
                <p className="text-xs text-[#64748B] mt-1 leading-tight">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Relationship Goal */}
          <div className="bg-white border border-[#E9E9E9] rounded-2xl p-5 shadow-sm fade-in" style={{ animationDelay: '160ms' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[#101727]">Relationship Goal</h3>
              <button
                onClick={() => setShowEditGoal(true)}
                className="flex items-center gap-1 border border-[#E9E9E9] text-xs px-3 py-1.5 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:border-[#244D3F] hover:text-[#244D3F] transition-all"
              >
                <Pencil size={10} /> Edit
              </button>
            </div>
            <p className="text-sm text-[#64748B] mb-3">
              Connect every <span className="font-bold text-[#101727] text-base">{friend.goal} days</span>
            </p>
            {/* Progress bar — matches design: thick, colored, rounded */}
            <div className="h-2.5 bg-[#E9E9E9] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, backgroundColor: progressHex }}
              />
            </div>
            <p className="text-xs text-[#64748B] mt-1.5">
              {friend.days_since_contact} / {friend.goal} days
            </p>
          </div>

          {/* Quick Check-In */}
          <div className="bg-white border border-[#E9E9E9] rounded-2xl p-5 shadow-sm fade-in" style={{ animationDelay: '220ms' }}>
            <h3 className="font-semibold text-[#101727] mb-4">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { type: 'call',  icon: Phone,          label: 'Call',  hoverBorder: 'hover:border-blue-300',   hoverBg: 'hover:bg-blue-50',   iconHover: 'group-hover:text-blue-600'   },
                { type: 'text',  icon: MessageSquare,  label: 'Text',  hoverBorder: 'hover:border-purple-300', hoverBg: 'hover:bg-purple-50', iconHover: 'group-hover:text-purple-600' },
                { type: 'video', icon: Video,          label: 'Video', hoverBorder: 'hover:border-green-300',  hoverBg: 'hover:bg-green-50',  iconHover: 'group-hover:text-green-600'  },
              ].map(({ type, icon: Icon, label, hoverBorder, hoverBg, iconHover }) => (
                <button
                  key={type}
                  onClick={() => handleCheckin(type)}
                  className={`flex flex-col items-center gap-2.5 border border-[#E9E9E9] rounded-xl py-5 ${hoverBorder} ${hoverBg} transition-all active:scale-95 group`}
                >
                  <Icon size={20} className={`text-[#64748B] ${iconHover} transition-colors`} />
                  <span className={`text-xs text-[#64748B] ${iconHover} transition-colors font-medium`}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showEditGoal && (
        <EditGoalModal
          friend={friend}
          onSave={handleSaveGoal}
          onClose={() => setShowEditGoal(false)}
        />
      )}
    </div>
  )
}
