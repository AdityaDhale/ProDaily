import { useState } from 'react'
import { Search, Bell, Check, X } from 'lucide-react'
import { useProdlyStore } from '../store'

export default function TopBar() {
  const { searchQuery, setSearchQuery, user, notifications, isNotifOpen, setIsNotifOpen, setActiveTab } = useProdlyStore()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="relative flex items-center justify-between gap-4 py-4 px-6 md:px-8 border-b border-prodly-border/40 bg-prodly-bg/80 backdrop-blur-md sticky top-0 z-30">
      {/* Search Input matching screenshot */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-prodly-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Search here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-prodly-card border border-prodly-border text-xs text-white placeholder-prodly-muted rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-prodly-borderLight transition-all"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-prodly-muted hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Right controls: Notifications & Avatar */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="w-9 h-9 rounded-full bg-prodly-card border border-prodly-border flex items-center justify-center text-prodly-muted hover:text-white hover:border-prodly-borderLight transition-all"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-prodly-orange"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-prodly-card border border-prodly-borderLight rounded-2xl shadow-card p-3 z-50 animate-scale-in">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-prodly-border">
                <span className="text-xs font-semibold text-white">Notifications</span>
                <span className="text-[10px] text-prodly-muted">{unreadCount} unread</span>
              </div>
              <div className="space-y-1.5">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-2.5 rounded-xl bg-prodly-bg/50 border border-prodly-border flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-white">{notif.title}</p>
                      <p className="text-[10px] text-prodly-muted mt-0.5">{notif.time}</p>
                    </div>
                    {!notif.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-prodly-lime mt-1 flex-shrink-0"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar with Orange Beanie look matching screenshot */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-prodly-border hover:border-prodly-lime transition-all flex items-center justify-center bg-[#f59e0b] p-0.5 flex-shrink-0"
            aria-label="User profile"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover rounded-full"
            />
          </button>

          {/* User Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-prodly-card border border-prodly-borderLight rounded-2xl shadow-card p-3 z-50 animate-scale-in">
              <div className="flex items-center gap-3 pb-3 border-b border-prodly-border">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-prodly-orange p-0.5">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-prodly-lime truncate">{user.email}</p>
                  <p className="text-[9px] text-prodly-muted truncate">{user.role}</p>
                </div>
              </div>
              <div className="pt-2 space-y-1 text-xs">
                <button
                  onClick={() => { setActiveTab('settings'); setIsProfileOpen(false) }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-prodly-muted hover:text-white hover:bg-prodly-bg transition-colors"
                >
                  Profile & Preferences
                </button>
                <button
                  onClick={() => { setActiveTab('billing'); setIsProfileOpen(false) }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-prodly-muted hover:text-white hover:bg-prodly-bg transition-colors"
                >
                  Subscription & Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
