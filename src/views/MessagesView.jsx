import { useState } from 'react'
import { Send, Sparkles, User } from 'lucide-react'

export default function MessagesView() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'AI Assistant', text: 'Hey Jhon, your focus score is trending +6% higher this week. Remember your 1:1 at 1:30 PM!', time: '10:00 AM', isAi: true },
    { id: 2, sender: 'Alex (Design Lead)', text: 'Ready for prototype review at 3 PM? Let’s test the new navigation flow.', time: '11:15 AM', isAi: false },
  ])
  const [input, setInput] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = {
      id: Date.now(),
      sender: 'Jhon',
      text: input.trim(),
      time: 'Just now',
      isAi: false,
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    // Mock AI reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'AI Assistant',
          text: `Got it! I logged that note and will optimize your schedule. Keep up the great flow! ✦`,
          time: 'Just now',
          isAi: true,
        }
      ])
    }, 600)
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-white">Messages & AI Assistant</h1>
        <p className="text-xs text-prodly-muted mt-0.5">Direct chat with your team and real-time AI productivity coach</p>
      </div>

      <div className="prodly-card flex flex-col h-[520px] overflow-hidden">
        {/* Messages list */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'Jhon' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                msg.isAi ? 'bg-prodly-lime text-black' : msg.sender === 'Jhon' ? 'bg-prodly-orange text-black' : 'bg-prodly-cardHover text-white'
              }`}>
                {msg.isAi ? '✦' : msg.sender[0]}
              </div>
              <div className={`max-w-[75%] rounded-2xl p-3.5 text-xs ${
                msg.sender === 'Jhon'
                  ? 'bg-prodly-lime text-black font-medium'
                  : 'bg-prodly-bg border border-prodly-border text-white'
              }`}>
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className={`font-bold text-[10px] ${msg.sender === 'Jhon' ? 'text-black/80' : 'text-prodly-muted'}`}>
                    {msg.sender}
                  </span>
                  <span className={`text-[9px] ${msg.sender === 'Jhon' ? 'text-black/60' : 'text-prodly-muted'}`}>
                    {msg.time}
                  </span>
                </div>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat input */}
        <form onSubmit={handleSend} className="p-3 border-t border-prodly-border bg-prodly-bg/40 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask AI assistant or message team..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-prodly-card border border-prodly-border rounded-xl px-4 py-2.5 text-xs text-white placeholder-prodly-muted focus:outline-none focus:border-prodly-lime"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-prodly-lime text-black flex items-center justify-center hover:bg-prodly-limeDim transition-all active:scale-95 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
