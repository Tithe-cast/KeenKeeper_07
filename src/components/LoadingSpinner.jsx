export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="spinner" />
      <p className="text-[#64748B] text-sm">Loading your friends...</p>
    </div>
  )
}
