import { useEffect } from 'react'
import { Play, Pause, RotateCcw, X, Zap } from 'lucide-react'
import { useProdlyStore } from '../store'

export default function FocusTimerModal() {
  const { isTimerOpen, setIsTimerOpen, timerState, setTimerState, tickTimer } = useProdlyStore()

  useEffect(() => {
    let interval = null
    if (timerState.isRunning) {
      interval = setInterval(() => {
        tickTimer()
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerState.isRunning, tickTimer])

  if (!isTimerOpen) return null

  const minutes = String(Math.floor(timerState.remaining / 60)).padStart(2, '0')
  const seconds = String(timerState.remaining % 60).padStart(2, '0')

  const toggleRun = () => {
    setTimerState({ isRunning: !timerState.isRunning })
  }

  const resetTimer = () => {
    setTimerState({ remaining: 25 * 60, isRunning: false })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-prodly-card border border-prodly-border rounded-3xl p-6 w-full max-w-sm shadow-card relative">
        <button
          onClick={() => setIsTimerOpen(false)}
          className="absolute right-4 top-4 text-prodly-muted hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-prodly-lime flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" fill="black" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Focus Sprint</h3>
            <p className="text-[10px] text-prodly-muted">Deep work mode with zero distraction</p>
          </div>
        </div>

        {/* Circular Display */}
        <div className="my-6 flex flex-col items-center justify-center">
          <div className="relative w-44 h-44 rounded-full border-4 border-prodly-border flex items-center justify-center bg-prodly-bg/40">
            <div className="text-center">
              <span className="text-4xl font-extrabold text-white tracking-tight font-sans">
                {minutes}:{seconds}
              </span>
              <p className="text-[10px] uppercase font-semibold tracking-wider text-prodly-lime mt-1">
                {timerState.isRunning ? 'Active Sprint' : 'Paused'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={resetTimer}
            className="w-10 h-10 rounded-full bg-prodly-bg border border-prodly-border flex items-center justify-center text-prodly-muted hover:text-white transition-all"
            aria-label="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleRun}
            className="px-6 py-2.5 rounded-full bg-prodly-lime text-black font-bold text-xs flex items-center gap-2 hover:bg-prodly-limeDim transition-all active:scale-95 shadow-glow-lime"
          >
            {timerState.isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-black" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black ml-0.5" />
                Start Focus
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
