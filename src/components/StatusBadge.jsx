export default function StatusBadge({ status }) {
  const styles = {
    overdue: 'bg-red-500 text-white',
    'almost due': 'bg-amber-500 text-white',
    'on-track': 'bg-green-500 text-white',
  }
  const labels = {
    overdue: 'Overdue',
    'almost due': 'Almost Due',
    'on-track': 'On Track',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-400 text-white'}`}>
      {labels[status] || status}
    </span>
  )
}
