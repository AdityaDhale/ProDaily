import { BarChart3, TrendingUp, Smartphone, Lock, Share2, Music, Globe, MessageCircle } from 'lucide-react'
import { useProdlyStore } from '../store'

export default function ReportsView() {
  const { metrics, weeklyActivity } = useProdlyStore()

  const distractionsList = [
    { name: 'Phone Notifications', count: 312, icon: Smartphone, color: 'lime', pct: 50 },
    { name: 'Lockscreen Checks', count: 145, icon: Lock, color: 'orange', pct: 23 },
    { name: 'Slack Mentions', count: 88, icon: MessageCircle, color: 'lime', pct: 14 },
    { name: 'Spotify / Media Switching', count: 42, icon: Music, color: 'orange', pct: 7 },
    { name: 'Social Media / Browser', count: 41, icon: Globe, color: 'lime', pct: 6 },
  ]

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-white">Reports & Analytics</h1>
        <p className="text-xs text-prodly-muted mt-0.5">Comprehensive review of your deep work, meetings, and interruptions</p>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="prodly-card p-5">
          <p className="text-xs text-prodly-muted font-medium">Focus Efficiency Score</p>
          <p className="text-3xl font-extrabold text-prodly-lime mt-2">87%</p>
          <p className="text-[11px] text-prodly-muted mt-1">+6% increase from last week</p>
        </div>

        <div className="prodly-card p-5">
          <p className="text-xs text-prodly-muted font-medium">Deep Work to Meeting Ratio</p>
          <p className="text-3xl font-extrabold text-prodly-orange mt-2">3.3 : 1</p>
          <p className="text-[11px] text-prodly-muted mt-1">Healthy maker-to-manager balance</p>
        </div>

        <div className="prodly-card p-5">
          <p className="text-xs text-prodly-muted font-medium">Avg Focus Duration</p>
          <p className="text-3xl font-extrabold text-white mt-2">48m</p>
          <p className="text-[11px] text-prodly-muted mt-1">Target is 45m+ uninterrupted</p>
        </div>
      </div>

      {/* Distraction Breakdown */}
      <div className="prodly-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Distraction Source Breakdown</h2>
          <span className="text-xs text-prodly-muted">{metrics.distractions.count} total logged</span>
        </div>

        <div className="space-y-3">
          {distractionsList.map((item) => {
            const Icon = item.icon
            const isLime = item.color === 'lime'
            return (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${isLime ? 'text-prodly-lime' : 'text-prodly-orange'}`} />
                    <span className="text-white font-medium">{item.name}</span>
                  </div>
                  <span className="text-prodly-muted">{item.count} times ({item.pct}%)</span>
                </div>
                <div className="w-full h-2 bg-prodly-bg rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isLime ? 'bg-prodly-lime' : 'bg-prodly-orange'}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
