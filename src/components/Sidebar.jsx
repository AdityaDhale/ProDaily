import { 
  LayoutGrid, 
  Clock, 
  BarChart3, 
  Target, 
  MessageSquare, 
  Calendar, 
  CreditCard, 
  Settings,
  Sparkles
} from 'lucide-react'
import { useProdlyStore } from '../store'

export default function Sidebar() {
  const { activeTab, setActiveTab } = useProdlyStore()

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, isDashboard: true },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: Target },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'billing', label: 'Bills & Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-prodly-bg border-r border-prodly-border/60 min-h-screen p-5 flex flex-col justify-between select-none">
      <div className="space-y-7">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-2">
          <span className="text-prodly-lime text-xl font-black">✦</span>
          <span className="text-white text-xl font-bold tracking-tight">Prodaily</span>
        </div>

        {/* Navigation Group */}
        <div>
          <p className="text-[11px] font-semibold text-prodly-muted uppercase tracking-wider px-3 mb-2.5">
            Navigation
          </p>
          <nav className="space-y-1" aria-label="Main sidebar">
            {navItems.map((item) => {
              const isActive = activeTab === item.id
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs transition-all duration-150 ${
                    isActive
                      ? 'bg-prodly-card text-white font-medium shadow-sm border border-prodly-border'
                      : 'text-prodly-muted hover:text-white hover:bg-prodly-card/40'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Distinct dashboard icon styling matching the screenshot */}
                  {item.isDashboard ? (
                    <div className="w-6 h-6 rounded-lg bg-prodly-lime flex items-center justify-center flex-shrink-0">
                      <div className="grid grid-cols-2 gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-black"></span>
                        <span className="w-1 h-1 rounded-full bg-black"></span>
                        <span className="w-1 h-1 rounded-full bg-black"></span>
                        <span className="w-1 h-1 rounded-full bg-black"></span>
                      </div>
                    </div>
                  ) : (
                    <Icon className="w-4 h-4 text-prodly-muted flex-shrink-0" />
                  )}
                  <span className="truncate">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Pro Badge / Footer helper */}
      <div className="pt-4 border-t border-prodly-border/40 px-2">
        <div className="p-3 bg-prodly-card rounded-xl border border-prodly-border/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-prodly-lime" />
            <div>
              <p className="text-xs font-semibold text-white">Prodaily Pro</p>
              <p className="text-[10px] text-prodly-muted">AI Assistant active</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-prodly-lime text-black">
            PRO
          </span>
        </div>
      </div>
    </aside>
  )
}
