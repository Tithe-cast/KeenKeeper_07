import { useState } from 'react'
import { X, User, Mail, Tag, FileText, Target } from 'lucide-react'
import { useTimeline } from '../context/TimelineContext'
import toast from 'react-hot-toast'

const inputClass = "w-full border border-[#E9E9E9] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#244D3F] focus:ring-1 focus:ring-[#244D3F]/20 transition-all placeholder:text-[#D9D9D9]"

export default function AddFriendModal({ onClose }) {
  const { addFriend } = useTimeline()
  const [form, setForm] = useState({ name: '', email: '', tags: '', bio: '', goal: 30 })
  const [submitting, setSubmitting] = useState(false)

  const set = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 400)) 
    addFriend({
      name: form.name.trim(),
      email: form.email.trim(),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      bio: form.bio.trim(),
      goal: parseInt(form.goal) || 30,
    })
    toast.success(`${form.name.trim()} added to your connections!`)
    setSubmitting(false)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#101727]">Add a Friend</h2>
            <p className="text-xs text-[#64748B] mt-0.5">Keep this connection alive</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F8FAFC] hover:bg-[#E9E9E9] flex items-center justify-center text-[#64748B] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Name */}
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D9D9D9]" />
            <input
              required
              placeholder="Full Name *"
              value={form.name}
              onChange={set('name')}
              className={`${inputClass} pl-8`}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D9D9D9]" />
            <input
              type="email"
              required
              placeholder="Email *"
              value={form.email}
              onChange={set('email')}
              className={`${inputClass} pl-8`}
            />
          </div>

          {/* Tags */}
          <div className="relative">
            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D9D9D9]" />
            <input
              placeholder="Tags (e.g. college, work, family)"
              value={form.tags}
              onChange={set('tags')}
              className={`${inputClass} pl-8`}
            />
          </div>

          {/* Bio */}
          <div className="relative">
            <FileText size={14} className="absolute left-3 top-3 text-[#D9D9D9]" />
            <textarea
              placeholder="How do you know them?"
              value={form.bio}
              onChange={set('bio')}
              rows={3}
              className={`${inputClass} pl-8 resize-none`}
            />
          </div>

          {/* Goal */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-[#64748B] mb-1.5">
              <Target size={12} />
              Contact Goal
            </label>
            <div className="flex gap-2">
              {[7, 14, 30, 60].map(days => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setForm(p => ({ ...p, goal: days }))}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                    form.goal === days
                      ? 'bg-[#244D3F] text-white border-[#244D3F]'
                      : 'bg-white text-[#64748B] border-[#E9E9E9] hover:border-[#244D3F]'
                  }`}
                >
                  {days}d
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#E9E9E9] rounded-xl py-2.5 text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-[#244D3F] text-white rounded-xl py-2.5 text-sm font-medium hover:bg-[#2d6350] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <><span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Adding...</>
              ) : 'Add Friend'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
