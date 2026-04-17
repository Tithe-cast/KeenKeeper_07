import { PlayCircle, Share2, AtSign } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#244D3F] text-white py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-bold mb-2">
          <span className="font-light">Keen</span>Keeper
        </h2>
        <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <p className="text-white/70 text-sm mb-4">Social Links</p>
        <div className="flex items-center justify-center gap-3 mb-8">
          {[PlayCircle, Share2, AtSign].map((Icon, i) => (
            <button
              key={i}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span>© 2026 KeenKeeper. All rights reserved.</span>
          <div className="flex gap-4">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
