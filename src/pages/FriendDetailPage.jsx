import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Phone, MessageSquare, Video, Clock, Archive, Trash2, ChevronLeft, Pencil, Mail, X, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTimeline } from '../context/TimelineContext'
import StatusBadge from '../components/StatusBadge'

