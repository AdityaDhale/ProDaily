import { useState } from 'react'
import { X, Calendar, Plus } from 'lucide-react'
import { useProdlyStore } from '../store'

export default function AddEventModal({ isOpen, onClose }) {
  const { addTimelineEvent } = useProdlyStore()

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [time, setTime] = useState('11:00 AM')
  const [type, setType] = useState('focus')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    addTimelineEvent({
      title: title.trim(),
      desc: desc.trim() || 'Scheduled activity',
      time,
      type,
      tag: type.toUpperCase(),
      attendees: type === 'meeting' ? ['A', 'B'] : [],
    })

    setTitle('')
    setDesc('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-prodly-card border border-prodly-border rounded-3xl p-6 w-full max-w-md shadow-card relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-prodly-muted hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-prodly-orange flex items-center justify-center">
            <Calendar className="w-4 h-4 text-black" />
          </div>
          <h3 className="text-sm font-bold text-white">Add Timeline Event</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-prodly-muted uppercase mb-1">
              Event Title
            </label>
            <input
              type="text"
              placeholder="e.g. Design Review, Client Call"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-prodly-bg border border-prodly-border rounded-xl px-3.5 py-2 text-xs text-white placeholder-prodly-muted focus:outline-none focus:border-prodly-lime"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-prodly-muted uppercase mb-1">
              Description / Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Final prototype inspection"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-prodly-bg border border-prodly-border rounded-xl px-3.5 py-2 text-xs text-white placeholder-prodly-muted focus:outline-none focus:border-prodly-lime"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-prodly-muted uppercase mb-1">
                Time
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-prodly-bg border border-prodly-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-prodly-lime"
              >
                {['08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '01:00 PM', '01:30 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map((t) => (
                  <option key={t} value={t} className="bg-prodly-card">{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-prodly-muted uppercase mb-1">
                Category
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-prodly-bg border border-prodly-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-prodly-lime"
              >
                <option value="focus" className="bg-prodly-card">Focus Work</option>
                <option value="meeting" className="bg-prodly-card">Meeting</option>
                <option value="break" className="bg-prodly-card">Break</option>
                <option value="review" className="bg-prodly-card">Review</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-prodly-muted hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-lime flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
