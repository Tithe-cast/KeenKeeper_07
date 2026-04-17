import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { TimelineProvider } from './context/TimelineContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import FriendDetailPage from './pages/FriendDetailPage'
import TimelinePage from './pages/TimelinePage'
import StatsPage from './pages/StatsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <TimelineProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/friend/:id" element={<FriendDetailPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#244D3F',
              color: '#fff',
              borderRadius: '10px',
              fontFamily: 'DM Sans, sans-serif',
            },
          }}
        />
      </Router>
    </TimelineProvider>
  )
}

export default App
