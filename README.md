# ✦ Prodaily — Productivity Summary & AI Assistance

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Prodaily** is a high-performance, dark-themed productivity dashboard and AI-assisted workday companion designed for knowledge workers, designers, and software engineers. It unifies deep focus tracking, meeting coordination, distraction filtering, and timeline scheduling into a cohesive, distraction-free interface.

---

## 🌟 Highlights & Key Features

### 1. 📊 Executive Productivity Summary
- **Focus Time Tracker:** Live monitoring of deep work hours with a progress bar mapped against a weekly goal (e.g., 58% of 30h target).
- **Meeting Load Index:** Visual count of scheduled meetings with date indicators and duration logs.
- **Break Time Equalizer:** Graphic tick equalizer visualizing restorative breaks to prevent burnout.
- **Distraction Telemetry:** Real-time log of interruptions categorized by source (push notifications, lock screen checks, communications, background apps).

### 2. 📌 Today's Timeline with Real-Time Ruler
- Continuous horizontal timeline ruler (08:00 to 04:00) with a live pin pointer indicating the current time.
- Five distinct scheduled cards with category tags, time badges, participant avatars, and completion checkboxes:
  - `09:00 AM` — **Focus Work** (UI polishing & bug fixes)
  - `10:30 AM` — **Team Sync** (Weekly goals alignment)
  - `12:00 PM` — **Lunch Break** (Rest & recharge)
  - `01:30 PM` — **1:1 Check-in** (Manager catch-up)
  - `03:00 PM` — **Design Review** (Final prototype sign-off)
- **Interactive Event Scheduler:** Create custom events with custom categories, times, and notes.

### 3. 📈 Weekly Activity Overview
- 7-day responsive bar chart featuring alternating **Neon Lime (`#ccff00`)** and **Warm Orange (`#ff9933`)** indicators.
- Interactive hover tooltips displaying exact hours logged and total focus sessions for each day.

### 4. 🤖 AI Insights & Recommendations
- Algorithmic analysis of weekly work habits:
  - **Best Focus Window:** Highlights peak alertness hours before noon.
  - **Pomodoro Sprint Optimization:** Recommends 25-minute sprints with 5-minute pauses before syncs.
  - **Morning Task Batching:** Advises clustering related tasks to reduce context switching.
- One-click triggers to apply suggestions directly to your live schedule or timer.

### 5. ⏱️ Integrated Focus Sprint Timer
- Modal-accessible Pomodoro timer (25:00 countdown) with Start, Pause, and Reset controls.
- Seamlessly launches from the top metrics card or AI recommendations.

### 6. 📂 Complete Workday Navigation Suite
- **Schedule:** Filter by Focus, Meetings, Breaks, and Reviews with task completion toggling.
- **Reports & Analytics:** Focus efficiency score, deep work-to-meeting ratio, and distraction breakdowns.
- **Projects:** Active sprints and deliverables with task progress bars and time expenditure.
- **Messages:** Internal team communication and live AI productivity assistant chat.
- **Calendar:** Monthly grid view tracking sync milestones and project deadlines.
- **Bills & Payments:** Pro Workspace tier management and downloadable invoice history.
- **Settings:** Customizable profile details (`demo@gmail.com`), weekly hour goals, and distraction blocker preferences.

---

## 🎨 Design System

Prodaily uses a high-contrast, matte dark theme inspired by modern developer and design agency tools:

| Element | Hex Code | Description |
|---|---|---|
| **Canvas Background** | `#0d0f12` | Ultra-dark matte background minimizing eye strain |
| **Surface Card** | `#16181d` | Subtle elevated panels with 1px border `#232730` |
| **Hover Surface** | `#1c2026` | Interactive hover states |
| **Accent Lime** | `#ccff00` | Vibrant neon lime for primary milestones & buttons |
| **Accent Orange** | `#ff9933` | Warm orange for meetings & secondary metrics |
| **Primary Text** | `#ffffff` | High-contrast white typography |
| **Muted Text** | `#8b949e` | Secondary labels and meta information |

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) with `localStorage` persistence
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** Inter & Plus Jakarta Sans

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/prodaily.git
   cd prodaily
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Production-ready bundles will be created in the `dist/` directory.

---

## 📁 Project Structure

```text
hyperbloom/
├── public/
│   ├── avatar.svg            # Custom vector avatar
│   └── favicon.svg           # Prodaily neon lime sparkle icon
├── src/
│   ├── components/
│   │   ├── AddEventModal.jsx     # Event creation modal
│   │   ├── FocusTimerModal.jsx   # Live Pomodoro countdown timer
│   │   ├── Sidebar.jsx           # Left sidebar navigation
│   │   └── TopBar.jsx            # Search bar, notifications, avatar dropdown
│   ├── views/
│   │   ├── BillingView.jsx       # Plan and invoices view
│   │   ├── CalendarView.jsx      # Monthly calendar planner
│   │   ├── DashboardView.jsx     # Primary executive summary dashboard
│   │   ├── MessagesView.jsx      # Team chat & AI assistant
│   │   ├── ProjectsView.jsx      # Active deliverables & task progress
│   │   ├── ReportsView.jsx       # Deep analytics & distraction breakdown
│   │   ├── ScheduleView.jsx      # Daily schedule filter & timeline
│   │   └── SettingsView.jsx      # Profile & blocker settings
│   ├── App.jsx               # Main layout orchestrator
│   ├── index.css             # Tailwind base & custom component styles
│   ├── main.jsx              # React DOM entry point
│   └── store.js              # Central Zustand store with persistence
├── index.html                # HTML template with SEO & fonts
├── package.json              # Project dependencies & scripts
├── tailwind.config.js        # Prodaily color tokens & keyframes
└── vite.config.js            # Vite configuration
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
