import { useState } from 'react'
import { Plus, Users } from 'lucide-react'
import { useTimeline } from '../context/TimelineContext'
import FriendCard from '../components/FriendCard'
import SummaryCards from '../components/SummaryCards'
import LoadingSpinner from '../components/LoadingSpinner'
import AddFriendModal from '../components/AddFriendModal'

