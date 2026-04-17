import { useState } from 'react'
import { Plus, Users } from 'lucide-react'
import { useTimeline } from '../context/TimelineContext'
import FriendCard from '../components/FriendCard'
import SummaryCards from '../components/SummaryCards'
import LoadingSpinner from '../components/LoadingSpinner'
import AddFriendModal from '../components/AddFriendModal'

export default function HomePage() {
  const { friends, friendsLoading, friendsError } = useTimeline()
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      {/* Banner */}
      <section className="bg-white border-b border-[#E9E9E9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101727] leading-tight tracking-tight">
            Friends to keep close in your life
          </h1>
          <p className="text-[#64748B] mt-4 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 inline-flex items-center gap-2 bg-[#244D3F] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2d6350] active:scale-95 transition-all shadow-sm"
          >
            <Plus size={16} />
            Add a Friend
          </button>

          {!friendsLoading && friends.length > 0 && <SummaryCards friends={friends} />}
        </div>
      </section>

      {/* Friends Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#101727]">Your Friends</h2>
          {!friendsLoading && (
            <span className="text-sm text-[#64748B] flex items-center gap-1.5">
              <Users size={14} />
              {friends.length} {friends.length === 1 ? 'friend' : 'friends'}
            </span>
          )}
        </div>

        {friendsLoading && <LoadingSpinner />}

        {friendsError && (
          <div className="text-center py-16 text-red-500 text-sm">
            Failed to load friends. Please try again.
          </div>
        )}

        {!friendsLoading && !friendsError && friends.length === 0 && (
          <div className="text-center py-20 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#F8FAFC] border-2 border-dashed border-[#E9E9E9] flex items-center justify-center">
              <Users size={24} className="text-[#D9D9D9]" />
            </div>
            <p className="text-[#101727] font-medium">No friends yet</p>
            <p className="text-[#64748B] text-sm">Add your first friend to get started</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-2 inline-flex items-center gap-2 bg-[#244D3F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2d6350] transition-colors"
            >
              <Plus size={14} /> Add a Friend
            </button>
          </div>
        )}

        {!friendsLoading && !friendsError && friends.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map((friend, i) => (
              <FriendCard key={friend.id} friend={friend} index={i} />
            ))}
          </div>
        )}
      </section>

      {showModal && <AddFriendModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
