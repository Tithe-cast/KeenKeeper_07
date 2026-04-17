import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] px-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-[120px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#244D3F] to-[#2d6350] leading-none">
          404
        </h1>
        <h2 className="text-2xl font-bold text-[#0f172a] mt-2">
          Oops! Page not found
        </h2>
        <p className="text-[#64748b] mt-3 mb-6 text-sm">
          The page you're looking for doesn’t exist or has been moved.
          Let’s get you back on track.
        </p>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 bg-[#244D3F] text-white px-6 py-3 rounded-xl text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
        >
          <Home size={16} />
          Back to Home
        </button>

        <p className="text-xs text-[#94a3b8] mt-6">
          Or check the URL and try again
        </p>
      </div>
    </div>
  )
}