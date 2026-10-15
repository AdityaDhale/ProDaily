import { useState } from 'react'
import { 
  Clock, 
  Video, 
  Hourglass, 
  AlertTriangle, 
  Check, 
  Circle, 
  Star,
  Pin,
  Smartphone,
  Lock,
  MessageCircle,
  Music,
  Globe,
  Share2,
  Plus,
  Play
} from 'lucide-react'
import { useProdlyStore } from '../store'
import AddEventModal from '../components/AddEventModal'

export default function DashboardView() {
  const { 
    user, 
    metrics, 
    timelineTimes, 
    timelineEvents, 
    weeklyActivity, 
    aiInsights, 
    applyAiInsight,
    setIsTimerOpen,
    toggleEventStatus,
    searchQuery
  } = useProdlyStore()

  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [hoveredDay, setHoveredDay] = useState(null)

  // Filter events if search query active
  const filteredEvents = timelineEvents.filter(e => 
    !searchQuery || 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. Welcome Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            Welcome back {user.name}! <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="text-xs text-prodly-muted mt-0.5">
            Here's your productivity summary & AI assistance
          </p>
        </div>

        {/* Quick Launch Focus Button */}
        <button
          onClick={() => setIsTimerOpen(true)}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-prodly-lime text-black font-semibold text-xs hover:bg-prodly-limeDim transition-all active:scale-95 shadow-glow-lime"
        >
          <Play className="w-3.5 h-3.5 fill-black" />
          Quick Focus
        </button>
      </div>

      {/* 2. Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Focus time */}
        <div 
          onClick={() => setIsTimerOpen(true)}
          className="prodly-card p-4 flex flex-col justify-between cursor-pointer hover:border-prodly-lime/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-prodly-muted font-medium">Focus time</span>
            <Clock className="w-4 h-4 text-prodly-lime group-hover:scale-110 transition-transform" />
          </div>
          <div className="my-3">
            <p className="text-2xl font-bold text-white tracking-tight">
              {metrics.focusTime.hours}h {metrics.focusTime.minutes}m
            </p>
            {/* Custom Split Progress Bar matching screenshot */}
            <div className="w-full h-4 bg-[#232730] rounded-md overflow-hidden mt-2.5 flex items-center p-0.5">
              <div 
                className="h-full bg-prodly-lime rounded-sm transition-all duration-700" 
                style={{ width: `${metrics.focusTime.percent}%` }}
              />
            </div>
          </div>
          <span className="text-[11px] text-prodly-muted">
            {metrics.focusTime.percent}% of {metrics.focusTime.goalHours}h goals
          </span>
        </div>

        {/* Card 2: Meetings */}
        <div className="prodly-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-prodly-muted font-medium">Meetings</span>
            <Video className="w-4 h-4 text-prodly-lime" />
          </div>
          <div className="my-3">
            <p className="text-2xl font-bold text-white tracking-tight">
              {metrics.meetings.hours}h {metrics.meetings.minutes}m
            </p>
            {/* Date/Number badges matching screenshot */}
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="w-5 h-5 rounded-full bg-[#232730] text-[10px] text-prodly-muted font-semibold flex items-center justify-center">
                9
              </span>
              <span className="w-5 h-5 rounded-full bg-prodly-orange text-[10px] text-black font-bold flex items-center justify-center">
                11
              </span>
              <span className="w-5 h-5 rounded-full bg-[#232730] text-[10px] text-prodly-muted font-semibold flex items-center justify-center">
                12
              </span>
              <span className="w-5 h-5 rounded-full bg-prodly-orange text-[10px] text-black font-bold flex items-center justify-center">
                14
              </span>
            </div>
          </div>
          <span className="text-[11px] text-prodly-muted">
            {metrics.meetings.totalCount} total meetings this week
          </span>
        </div>

        {/* Card 3: Break time */}
        <div className="prodly-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-prodly-muted font-medium">Break time</span>
            <Hourglass className="w-4 h-4 text-prodly-lime" />
          </div>
          <div className="my-3">
            <p className="text-2xl font-bold text-white tracking-tight">
              {metrics.breakTime.hours}h {metrics.breakTime.minutes}m
            </p>
            {/* Equalizer tick bars matching screenshot */}
            <div className="flex items-end gap-0.5 h-4 mt-2.5 overflow-hidden">
              {metrics.breakTime.bars.map((height, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-prodly-lime rounded-full" 
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
          <span className="text-[11px] text-prodly-muted">
            Breaks make up {metrics.breakTime.percent}% of total time
          </span>
        </div>

        {/* Card 4: Distractions */}
        <div className="prodly-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-prodly-muted font-medium">Distractions</span>
            <AlertTriangle className="w-4 h-4 text-prodly-lime" />
          </div>
          <div className="my-3">
            <p className="text-2xl font-bold text-white tracking-tight">
              {metrics.distractions.count}
            </p>
            {/* Mini Circular App Icons row matching screenshot */}
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="w-5 h-5 rounded-full bg-prodly-lime/20 border border-prodly-lime/50 flex items-center justify-center">
                <Smartphone className="w-2.5 h-2.5 text-prodly-lime" />
              </span>
              <span className="w-5 h-5 rounded-full bg-prodly-orange/20 border border-prodly-orange/50 flex items-center justify-center">
                <Lock className="w-2.5 h-2.5 text-prodly-orange" />
              </span>
              <span className="w-5 h-5 rounded-full bg-prodly-lime/20 border border-prodly-lime/50 flex items-center justify-center">
                <Share2 className="w-2.5 h-2.5 text-prodly-lime" />
              </span>
              <span className="w-5 h-5 rounded-full bg-prodly-orange/20 border border-prodly-orange/50 flex items-center justify-center">
                <Music className="w-2.5 h-2.5 text-prodly-orange" />
              </span>
              <span className="w-5 h-5 rounded-full bg-prodly-lime/20 border border-prodly-lime/50 flex items-center justify-center">
                <Globe className="w-2.5 h-2.5 text-prodly-lime" />
              </span>
              <span className="w-5 h-5 rounded-full bg-prodly-orange/20 border border-prodly-orange/50 flex items-center justify-center">
                <MessageCircle className="w-2.5 h-2.5 text-prodly-orange" />
              </span>
            </div>
          </div>
          <span className="text-[11px] text-prodly-muted truncate">
            Most common: {metrics.distractions.mostCommon}
          </span>
        </div>
      </div>

      {/* 3. Today's Timeline (Middle wide card) */}
      <div className="prodly-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">📌</span>
            <h2 className="text-sm font-bold text-white">Today's Timeline</h2>
          </div>
          <button
            onClick={() => setIsAddEventOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-prodly-cardHover text-prodly-muted hover:text-white border border-prodly-border transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Event
          </button>
        </div>

        {/* Timeline Ruler */}
        <div className="relative pt-2 pb-1 overflow-x-auto scrollbar-hide">
          <div className="flex items-center justify-between min-w-[700px] text-[10px] text-prodly-muted/80 pb-3 border-b border-prodly-border">
            {timelineTimes.map((time) => {
              const isCurrent = time === '12:00'
              return (
                <div key={time} className="flex flex-col items-center relative">
                  <span className={isCurrent ? 'text-prodly-lime font-bold' : ''}>
                    {time}
                  </span>
                  {/* Current Time Pin Indicator at 12:00 */}
                  {isCurrent && (
                    <div className="absolute top-5 flex flex-col items-center">
                      <div className="w-2 h-2 bg-prodly-lime rounded-full"></div>
                      <div className="w-0.5 h-3 bg-prodly-lime"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Event Cards (Horizontal layout of 5 cards matching screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {filteredEvents.map((event) => {
            const isLunch = event.type === 'break'
            return (
              <div
                key={event.id}
                onClick={() => toggleEventStatus(event.id)}
                className={`p-3.5 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[105px] ${
                  isLunch
                    ? 'bg-[#1e2229] border-prodly-lime/30 shadow-glow-lime/10'
                    : 'bg-[#1a1d22] border-prodly-border hover:border-prodly-borderLight'
                }`}
              >
                <div>
                  {/* Time Badge */}
                  <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mb-2 font-semibold ${
                    isLunch 
                      ? 'bg-prodly-lime text-black' 
                      : 'bg-white/10 text-white'
                  }`}>
                    {event.time}
                  </span>
                  <p className="text-xs font-bold text-white truncate">{event.title}</p>
                  <p className="text-[10px] text-prodly-muted line-clamp-1 mt-0.5">{event.desc}</p>
                </div>

                {/* Attendees / Status */}
                {event.attendees && event.attendees.length > 0 && (
                  <div className="flex items-center gap-1 mt-2.5">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      {event.attendees.map((att, i) => (
                        <span 
                          key={i} 
                          className="w-4 h-4 rounded-full bg-prodly-orange text-[8px] font-bold text-black flex items-center justify-center border border-prodly-card"
                        >
                          {att}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 4. Bottom Grid: Weekly Activity Overview & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Weekly Activity Overview (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 prodly-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">📊</span>
                <h2 className="text-sm font-bold text-white">Weekly Activity Overview</h2>
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{weeklyActivity.totalHours}</span>
              <span className="text-xs text-prodly-muted">Total focus time this week</span>
            </div>
          </div>

          {/* Bar Chart matching screenshot */}
          <div className="mt-8">
            <div className="h-48 flex items-end justify-between gap-3 px-2">
              {weeklyActivity.days.map((item) => {
                const isLime = item.color === 'lime'
                const isHovered = hoveredDay === item.day
                return (
                  <div 
                    key={item.day} 
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    onMouseEnter={() => setHoveredDay(item.day)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    {/* Tooltip */}
                    <div className={`mb-2 px-2 py-1 bg-black text-[10px] rounded-md border border-prodly-border transition-opacity ${
                      isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}>
                      {item.hours}h ({item.sessions} sessions)
                    </div>

                    {/* Bar */}
                    <div className="w-full max-w-[48px] bg-prodly-bg/60 rounded-t-lg overflow-hidden flex items-end">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          isLime 
                            ? 'bg-prodly-lime group-hover:bg-prodly-limeDim shadow-glow-lime/30' 
                            : 'bg-prodly-orange group-hover:bg-prodly-orangeDim shadow-glow-orange/30'
                        }`}
                        style={{ height: `${item.height * 1.8}px` }}
                      />
                    </div>
                    <span className="text-xs text-prodly-muted font-medium mt-3">{item.day}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights (5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 prodly-card p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm">🤖</span>
              <h2 className="text-sm font-bold text-white">AI Insights</h2>
            </div>
            <p className="text-xs text-prodly-muted mt-1">
              Based on last week, here's what we suggest:
            </p>
          </div>

          {/* Suggestion list */}
          <div className="space-y-3">
            {aiInsights.map((insight) => (
              <div 
                key={insight.id}
                className="p-3.5 rounded-xl bg-prodly-cardHover/70 border border-prodly-border space-y-2 hover:border-prodly-borderLight transition-all"
              >
                <div className="flex items-center gap-2">
                  {insight.icon === 'check' && (
                    <span className="text-prodly-lime text-xs font-bold">✔</span>
                  )}
                  {insight.icon === 'circle' && (
                    <span className="text-prodly-lime text-xs">●</span>
                  )}
                  {insight.icon === 'star' && (
                    <span className="text-prodly-lime text-xs">★</span>
                  )}
                  <p className="text-xs font-bold text-white leading-none">{insight.title}</p>
                </div>
                <p className="text-[11px] text-prodly-muted leading-relaxed">
                  {insight.desc}
                </p>
                <button
                  onClick={() => {
                    if (insight.id === '2') {
                      setIsTimerOpen(true)
                    } else {
                      applyAiInsight(insight.id)
                    }
                  }}
                  className={`text-[10px] font-semibold transition-colors flex items-center gap-1 ${
                    insight.applied 
                      ? 'text-prodly-lime' 
                      : 'text-prodly-muted hover:text-white'
                  }`}
                >
                  {insight.applied ? '✓ Applied to schedule' : `→ ${insight.actionText}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <AddEventModal isOpen={isAddEventOpen} onClose={() => setIsAddEventOpen(false)} />
    </div>
  )
}
