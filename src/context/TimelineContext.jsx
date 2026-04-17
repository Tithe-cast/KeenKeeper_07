import { createContext, useContext, useState, useEffect } from 'react'

const TimelineContext = createContext()

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState([])
  const [friends, setFriends] = useState([])
  const [friendsLoading, setFriendsLoading] = useState(true)
  const [friendsError, setFriendsError] = useState(null)

  // Load timeline
  useEffect(() => {
    fetch('/timeline.json')
      .then(r => r.json())
      .then(data => setEntries(data))
      .catch(() => setEntries([]))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('/friends.json')
        .then(r => r.json())
        .then(data => { setFriends(data); setFriendsLoading(false) })
        .catch(err => { setFriendsError(err.message); setFriendsLoading(false) })
    }, 700)
    return () => clearTimeout(timer)
  }, [])

  const addEntry = (type, friendName) => {
    if (!['call', 'text', 'video'].includes(type)) return
    const newEntry = {
      id: Date.now(),
      type,
      friendName,
      date: new Date().toISOString().split('T')[0],
    }
    setEntries(prev => [newEntry, ...prev])
  }

  const addFriend = (friendData) => {
    const newFriend = {
      id: Date.now(),
      ...friendData,
      days_since_contact: 0,
      status: 'on-track',
      next_due_date: new Date(Date.now() + friendData.goal * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0],
      picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(friendData.name)}&background=244D3F&color=fff&size=128`,
    }
    setFriends(prev => [newFriend, ...prev])
    return newFriend
  }

  const updateFriendGoal = (friendId, newGoal) => {
    setFriends(prev => prev.map(f =>
      f.id === friendId ? { ...f, goal: newGoal } : f
    ))
  }

  return (
    <TimelineContext.Provider value={{
      entries, addEntry,
      friends, friendsLoading, friendsError, addFriend, updateFriendGoal
    }}>
      {children}
    </TimelineContext.Provider>
  )
}

export function useTimeline() {
  return useContext(TimelineContext)
}
