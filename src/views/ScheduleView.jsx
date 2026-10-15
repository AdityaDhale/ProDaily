import { useState } from 'react'
import { Calendar as CalendarIcon, Clock, Plus, CheckCircle, Video, Coffee, Eye } from 'lucide-react'
import { useProdlyStore } from '../store'
import AddEventModal from '../components/AddEventModal'

export default function ScheduleView() {
  const { timelineEvents, toggleEventStatus, deleteTimelineEvent } = useProdlyStore()
  const [filter, setFilter] = useState('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filtered = timelineEvents.filter(e => {
    if (filter === 'all') return true
    return e.type === filter
  })

  const getIcon = (type) => {
    switch (type) {
      case 'focus': return <Clock className="w-4 h-4 text-prodly-lime" />
      case 'meeting': return <Video className="w-4 h-4 text-prodly-orange" />
      case 'break': return <Coffee className="w-4 h-4 text-prodly-lime" />
      case 'review': return <Eye className="w-4 h-4 text-prodly-orange" />
      default: return <Clock className="w-4 h-4 text-white" />
    }
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Daily Schedule</h1>
          <p className="text-xs text-prodly-muted mt-0.5">Manage your focus blocks, syncs, and team meetings</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-lime flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Schedule Event
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {[
          { id: 'all', label: 'All Events' },
          { id: 'focus', label: 'Focus Work' },
          { id: 'meeting', label: 'Meetings' },
          { id: 'break', label: 'Breaks' },
          { id: 'review', label: 'Design Reviews' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === tab.id
                ? 'bg-prodly-card text-white font-semibold border border-prodly-borderLight'
                : 'text-prodly-muted hover:text-white bg-prodly-bg border border-prodly-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filtered.map(event => (
          <div
            key={event.id}
            className="prodly-card p-4 flex items-center justify-between gap-4 hover:border-prodly-borderLight transition-all"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-prodly-bg border border-prodly-border flex items-center justify-center flex-shrink-0">
                {getIcon(event.type)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white truncate">{event.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-prodly-muted">
                    {event.time}
                  </span>
                </div>
                <p className="text-xs text-prodly-muted mt-0.5 truncate">{event.desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => toggleEventStatus(event.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  event.status === 'completed'
                    ? 'bg-prodly-lime/10 text-prodly-lime border border-prodly-lime/30'
                    : 'bg-prodly-cardHover text-prodly-muted hover:text-white border border-prodly-border'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                {event.status === 'completed' ? 'Done' : 'Mark Done'}
              </button>

              <button
                onClick={() => deleteTimelineEvent(event.id)}
                className="px-2 py-1.5 rounded-lg text-xs text-prodly-muted hover:text-rose-400 transition-colors"
                title="Delete event"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddEventModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
