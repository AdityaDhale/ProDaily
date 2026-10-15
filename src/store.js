import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useProdlyStore = create(
  persist(
    (set, get) => ({
      // Active Navigation Tab
      activeTab: 'dashboard',
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Global Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // User Profile
      user: {
        name: 'Jhon',
        email: 'demo@gmail.com',
        role: 'Senior Product Designer',
        avatar: '/avatar.svg',
        goalHours: 30,
      },
      updateUser: (updates) => set((s) => ({ user: { ...s.user, ...updates } })),

      // Top Metrics
      metrics: {
        focusTime: {
          hours: 17,
          minutes: 30,
          goalHours: 30,
          percent: 58,
        },
        meetings: {
          hours: 5,
          minutes: 15,
          totalCount: 8,
          activeDays: [9, 11, 12, 14],
        },
        breakTime: {
          hours: 3,
          minutes: 40,
          percent: 18,
          bars: [100, 75, 45, 80, 60, 95, 55, 85, 40, 100, 70, 90, 60, 85, 50, 75, 95, 45, 65, 85],
        },
        distractions: {
          count: 628,
          mostCommon: 'Phone notification',
          apps: [
            { id: 'phone', label: 'Phone', type: 'lime' },
            { id: 'lock', label: 'Lockscreen', type: 'orange' },
            { id: 'slack', label: 'Slack', type: 'lime' },
            { id: 'music', label: 'Spotify', type: 'orange' },
            { id: 'browser', label: 'Chrome', type: 'lime' },
            { id: 'social', label: 'Instagram', type: 'orange' },
          ],
        },
      },

      // Today's Timeline
      timelineTimes: [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
        '11:00', '11:30', '12:00', '12:30', '01:00', '01:30',
        '02:00', '02:30', '03:00', '03:30', '04:00'
      ],
      currentTime: '12:00 PM',

      timelineEvents: [
        {
          id: '1',
          time: '9:00 AM',
          title: 'Focus Work',
          desc: 'UI polishing & bug fixes',
          type: 'focus',
          tag: 'Work',
          attendees: [],
          status: 'completed',
        },
        {
          id: '2',
          time: '10:30 AM',
          title: 'Team Sync',
          desc: 'Weekly goals alignment',
          type: 'meeting',
          tag: 'Meeting',
          attendees: ['A', 'S', 'D', '+2'],
          status: 'completed',
        },
        {
          id: '3',
          time: '12:00 PM',
          title: 'Lunch Break',
          desc: 'Take a walk & eat healthy',
          type: 'break',
          tag: 'Break',
          attendees: [],
          status: 'active',
        },
        {
          id: '4',
          time: '1:30 PM',
          title: '1:1 Check-in',
          desc: 'Catch up with manager',
          type: 'meeting',
          tag: 'Check-in',
          attendees: ['M', 'J', '+2'],
          status: 'upcoming',
        },
        {
          id: '5',
          time: '3:00 PM',
          title: 'Design Review',
          desc: 'Review final prototype',
          type: 'review',
          tag: 'Review',
          attendees: ['L', 'P', '+2'],
          status: 'upcoming',
        },
      ],

      addTimelineEvent: (event) => set((s) => ({
        timelineEvents: [...s.timelineEvents, { id: crypto.randomUUID(), status: 'upcoming', ...event }],
      })),
      toggleEventStatus: (id) => set((s) => ({
        timelineEvents: s.timelineEvents.map((e) =>
          e.id === id ? { ...e, status: e.status === 'completed' ? 'upcoming' : 'completed' } : e
        ),
      })),
      deleteTimelineEvent: (id) => set((s) => ({
        timelineEvents: s.timelineEvents.filter((e) => e.id !== id),
      })),

      // Weekly Activity
      weeklyActivity: {
        totalHours: '24.9h',
        days: [
          { day: 'Sun', hours: 3.2, color: 'lime', height: 44, sessions: 3 },
          { day: 'Mon', hours: 4.5, color: 'orange', height: 62, sessions: 5 },
          { day: 'Tue', hours: 5.8, color: 'lime', height: 80, sessions: 6 },
          { day: 'Wed', hours: 3.9, color: 'orange', height: 54, sessions: 4 },
          { day: 'Thu', hours: 5.6, color: 'lime', height: 77, sessions: 6 },
          { day: 'Fri', hours: 4.2, color: 'orange', height: 58, sessions: 4 },
          { day: 'Sat', hours: 2.7, color: 'lime', height: 38, sessions: 2 },
        ],
      },

      // AI Insights
      aiInsights: [
        {
          id: '1',
          title: 'Best focus window',
          desc: "You're most productive before noon. Prioritize deep work.",
          icon: 'check',
          actionText: 'Schedule Deep Work in AM',
          applied: false,
        },
        {
          id: '2',
          title: 'Use 2x Pomodoro before meetings',
          desc: 'Break work into 25-min sprints with 5-min breaks to stay.',
          icon: 'circle',
          actionText: 'Start 25m Sprint',
          applied: false,
        },
        {
          id: '3',
          title: 'Batch similar tasks in AM',
          desc: 'Group related work into blocks in the morning to reduce task...',
          icon: 'star',
          actionText: 'Batch Tasks',
          applied: false,
        },
      ],
      applyAiInsight: (id) => set((s) => ({
        aiInsights: s.aiInsights.map((ins) => ins.id === id ? { ...ins, applied: true } : ins),
      })),

      // Focus Timer Modal & State
      isTimerOpen: false,
      setIsTimerOpen: (open) => set({ isTimerOpen: open }),
      timerState: {
        remaining: 25 * 60,
        isRunning: false,
        mode: 'focus', // 'focus' | 'break'
      },
      setTimerState: (updates) => set((s) => ({
        timerState: { ...s.timerState, ...updates },
      })),
      tickTimer: () => set((s) => {
        if (!s.timerState.isRunning || s.timerState.remaining <= 0) return s
        const next = s.timerState.remaining - 1
        return {
          timerState: {
            ...s.timerState,
            remaining: next,
            isRunning: next > 0,
          },
        }
      }),

      // Notifications
      notifications: [
        { id: 1, title: 'Upcoming 1:1 Check-in', time: '1:30 PM', read: false },
        { id: 2, title: 'Focus goal reached 58%', time: '11:00 AM', read: true },
        { id: 3, title: 'New AI insight generated', time: '9:00 AM', read: true },
      ],
      isNotifOpen: false,
      setIsNotifOpen: (open) => set({ isNotifOpen: open }),

      // Projects List
      projects: [
        {
          id: 'p1',
          name: 'Prodaily Mobile App Redesign',
          category: 'UI/UX Design',
          progress: 74,
          dueDate: 'Oct 24',
          tasksCount: 18,
          tasksDone: 14,
          timeSpent: '12h 40m',
          color: 'lime',
        },
        {
          id: 'p2',
          name: 'Design System 2.0 Tokens',
          category: 'Architecture',
          progress: 45,
          dueDate: 'Nov 02',
          tasksCount: 12,
          tasksDone: 6,
          timeSpent: '8h 15m',
          color: 'orange',
        },
        {
          id: 'p3',
          name: 'Landing Page & Micro-interactions',
          category: 'Front-end',
          progress: 90,
          dueDate: 'Oct 19',
          tasksCount: 10,
          tasksDone: 9,
          timeSpent: '15h 20m',
          color: 'lime',
        },
      ],

      // Add Project
      addProject: (p) => set((s) => ({
        projects: [...s.projects, { id: crypto.randomUUID(), ...p }],
      })),
    }),
    {
      name: 'prodaily-app-v3',
    }
  )
)
