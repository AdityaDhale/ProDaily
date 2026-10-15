import { useState } from 'react'
import { Target, Plus, CheckCircle2, Clock, Calendar } from 'lucide-react'
import { useProdlyStore } from '../store'

export default function ProjectsView() {
  const { projects, addProject } = useProdlyStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('UI/UX Design')
  const [dueDate, setDueDate] = useState('Nov 15')

  const handleCreate = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    addProject({
      name: name.trim(),
      category,
      dueDate,
      progress: 10,
      tasksCount: 6,
      tasksDone: 1,
      timeSpent: '2h 15m',
      color: 'lime',
    })

    setName('')
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Active Projects</h1>
          <p className="text-xs text-prodly-muted mt-0.5">Track deliverables, sprint goals, and logged work hours</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-lime flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((proj) => {
          const isLime = proj.color === 'lime'
          return (
            <div key={proj.id} className="prodly-card p-5 flex flex-col justify-between space-y-4 hover:border-prodly-borderLight transition-all">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-prodly-muted">
                  {proj.category}
                </span>
                <h3 className="text-sm font-bold text-white mt-2.5 line-clamp-1">{proj.name}</h3>
                
                {/* Progress bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-prodly-muted">Progress</span>
                    <span className="text-white font-bold">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-prodly-bg rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isLime ? 'bg-prodly-lime' : 'bg-prodly-orange'}`} 
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Meta stats */}
              <div className="pt-3 border-t border-prodly-border flex items-center justify-between text-xs text-prodly-muted">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-prodly-lime" />
                  {proj.tasksDone}/{proj.tasksCount} tasks
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-prodly-orange" />
                  {proj.timeSpent}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-prodly-card border border-prodly-border rounded-3xl p-6 w-full max-w-md shadow-card">
            <h3 className="text-sm font-bold text-white mb-4">Create New Project</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-prodly-muted uppercase mb-1">Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. Design System 2.0"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-prodly-bg border border-prodly-border rounded-xl px-3.5 py-2 text-xs text-white placeholder-prodly-muted focus:outline-none focus:border-prodly-lime"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-prodly-muted uppercase mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. UI/UX Design"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-prodly-bg border border-prodly-border rounded-xl px-3.5 py-2 text-xs text-white placeholder-prodly-muted focus:outline-none focus:border-prodly-lime"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-prodly-muted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-lime"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
