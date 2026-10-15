import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Video, Coffee } from 'lucide-react'
import { useProdlyStore } from '../store'

export default function CalendarView() {
  const { timelineEvents } = useProdlyStore()
  const [currentMonth, setCurrentMonth] = useState('October 2026')

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Calendar</h1>
          <p className="text-xs text-prodly-muted mt-0.5">Month view and scheduled sync milestones</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-prodly-card border border-prodly-border text-prodly-muted hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-white px-2">{currentMonth}</span>
          <button className="p-2 rounded-xl bg-prodly-card border border-prodly-border text-prodly-muted hover:text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="prodly-card p-5">
        <div className="grid grid-cols-7 gap-2 mb-3">
          {daysOfWeek.map(d => (
            <div key={d} className="text-center text-[11px] font-semibold text-prodly-muted">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map(day => {
            const isToday = day === 16
            const hasMeeting = [9, 11, 12, 14, 16, 21].includes(day)
            return (
              <div
                key={day}
                className={`min-h-[72px] p-2 rounded-xl border transition-all flex flex-col justify-between ${
                  isToday 
                    ? 'bg-prodly-cardHover border-prodly-lime' 
                    : 'bg-prodly-bg/50 border-prodly-border hover:border-prodly-borderLight'
                }`}
              >
                <span className={`text-xs font-semibold ${isToday ? 'text-prodly-lime font-bold' : 'text-prodly-muted'}`}>
                  {day}
                </span>

                {hasMeeting && (
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-prodly-orange"></span>
                    <span className="text-[9px] text-prodly-muted truncate">
                      {isToday ? '3 events' : 'Sync'}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
