import { useState } from 'react'
import { User, Bell, Shield, Sliders, Check } from 'lucide-react'
import { useProdlyStore } from '../store'

export default function SettingsView() {
  const { user, updateUser, metrics } = useProdlyStore()

  const [name, setName] = useState(user.name)
  const [role, setRole] = useState(user.role)
  const [email, setEmail] = useState(user.email)
  const [goalHours, setGoalHours] = useState(user.goalHours)
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    updateUser({ name, role, email, goalHours: Number(goalHours) })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-white">Settings & Preferences</h1>
        <p className="text-xs text-prodly-muted mt-0.5">Customize your profile, focus goals, and distraction filters</p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Profile Card */}
        <div className="prodly-card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-prodly-lime" />
            <h2 className="text-sm font-bold text-white">Profile Details</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-prodly-orange p-0.5 flex-shrink-0">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="text-xs text-prodly-muted">
              <p className="text-white font-semibold">{user.name}</p>
              <p className="text-prodly-lime">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-prodly-muted uppercase mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-prodly-bg border border-prodly-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-prodly-lime"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-prodly-muted uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-prodly-bg border border-prodly-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-prodly-lime"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-prodly-muted uppercase mb-1">Job Title</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-prodly-bg border border-prodly-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-prodly-lime"
              />
            </div>
          </div>
        </div>

        {/* Goals & Distraction Blocker Card */}
        <div className="prodly-card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-prodly-orange" />
            <h2 className="text-sm font-bold text-white">Focus Targets & Distraction Blocker</h2>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-prodly-muted uppercase mb-1">
              Weekly Focus Goal (Hours)
            </label>
            <input
              type="number"
              min="5"
              max="60"
              value={goalHours}
              onChange={(e) => setGoalHours(e.target.value)}
              className="w-full max-w-xs bg-prodly-bg border border-prodly-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-prodly-lime"
            />
            <p className="text-[10px] text-prodly-muted mt-1">Currently targeting {goalHours}h per week (58% completed)</p>
          </div>

          <div className="pt-2 border-t border-prodly-border space-y-2">
            <p className="text-xs font-semibold text-white">Active Blockers</p>
            <div className="space-y-1.5 text-xs">
              <label className="flex items-center gap-2 text-prodly-muted cursor-pointer hover:text-white">
                <input type="checkbox" defaultChecked className="accent-prodly-lime rounded" />
                Mute phone push notifications during scheduled Focus blocks
              </label>
              <label className="flex items-center gap-2 text-prodly-muted cursor-pointer hover:text-white">
                <input type="checkbox" defaultChecked className="accent-prodly-lime rounded" />
                Auto-generate morning AI suggestions based on prior week
              </label>
              <label className="flex items-center gap-2 text-prodly-muted cursor-pointer hover:text-white">
                <input type="checkbox" defaultChecked className="accent-prodly-lime rounded" />
                Gentle audio chime when break concludes
              </label>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button type="submit" className="btn-lime flex items-center gap-1.5">
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved Changes!
              </>
            ) : (
              'Save Preferences'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
