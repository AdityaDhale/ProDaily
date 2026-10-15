import { useState } from 'react'
import { useProdlyStore } from './store'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import FocusTimerModal from './components/FocusTimerModal'

import DashboardView from './views/DashboardView'
import ScheduleView from './views/ScheduleView'
import ReportsView from './views/ReportsView'
import ProjectsView from './views/ProjectsView'
import MessagesView from './views/MessagesView'
import CalendarView from './views/CalendarView'
import BillingView from './views/BillingView'
import SettingsView from './views/SettingsView'

export default function App() {
  const { activeTab } = useProdlyStore()

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />
      case 'schedule':
        return <ScheduleView />
      case 'reports':
        return <ReportsView />
      case 'projects':
        return <ProjectsView />
      case 'messages':
        return <MessagesView />
      case 'calendar':
        return <CalendarView />
      case 'billing':
        return <BillingView />
      case 'settings':
        return <SettingsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="min-h-screen bg-prodly-bg text-prodly-text flex flex-col md:flex-row antialiased selection:bg-prodly-lime selection:text-black">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <TopBar />
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Focus Timer Modal */}
      <FocusTimerModal />
    </div>
  )
}
