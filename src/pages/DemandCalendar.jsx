import { useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Package,
  AlertCircle,
  Clock
} from "lucide-react"

/* ---------------- CONSTANTS ---------------- */

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]

const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

/* ---------------- DEMO INTELLIGENCE DATA ---------------- */

function getFestivalData(year, month) {
  const data = {}
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const festivals = {
    5:  { name: "Local Festival", icon: "🎉", impact: "High" },
    12: { name: "Holiday Sale", icon: "🛍️", impact: "High" },
    18: { name: "Community Event", icon: "🎊", impact: "Medium" },
    27: { name: "Diwali", icon: "🪔", impact: "Very High" },
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6

    let demand = "Normal"
    let categories = []

    if (festivals[d]) {
      demand = festivals[d].impact
      categories = [
        { name: "Snacks & Sweets", level: "Very High" },
        { name: "Beverages", level: "High" },
        { name: "Personal Care", level: "High" },
        { name: "Home Essentials", level: "Medium" },
      ]
    } else if (isWeekend) {
      demand = "Medium"
      categories = [
        { name: "Snacks", level: "Medium" },
        { name: "Beverages", level: "Medium" },
      ]
    } else {
      categories = [
        { name: "Daily Essentials", level: "Normal" },
      ]
    }

    data[d] = {
      festival: festivals[d] || null,
      demand,
      categories,
    }
  }

  return data
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function FestivalDemandCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const data = getFestivalData(year, month)

  const today = new Date()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const daysUntil = (day) => {
    const target = new Date(year, month, day)
    return Math.ceil((target - today) / (1000 * 60 * 60 * 24))
  }

  const demandColor = (level) => {
    if (level === "Very High") return "bg-red-50 border-red-300 text-red-700"
    if (level === "High") return "bg-orange-50 border-orange-300 text-orange-700"
    if (level === "Medium") return "bg-yellow-50 border-yellow-300 text-yellow-700"
    return "bg-white border-gray-200 text-gray-700"
  }

  /* ---------------- CALENDAR CELLS ---------------- */

  const cells = []
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} />)
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayData = data[d]
    const diff = daysUntil(d)
    const isPast = diff < 0

    cells.push(
      <button
        key={d}
        disabled={isPast}
        onClick={() => setSelectedDay({ day: d, diff, ...dayData })}
        className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition
          ${isPast ? "opacity-40 cursor-not-allowed" : demandColor(dayData.demand)}
        `}
      >
        <div className="font-semibold">{d}</div>
        {dayData.festival && <div className="text-lg">{dayData.festival.icon}</div>}
        {diff >= 1 && diff <= 7 && dayData.demand !== "Normal" && (
          <div className="mt-1 text-[10px] px-2 py-0.5 bg-blue-600 text-white rounded-full">
            {diff}d
          </div>
        )}
      </button>
    )
  }

  /* ---------------- INSIGHT PANEL ---------------- */

  const InsightPanel = () => selectedDay && (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold">
              {selectedDay.festival
                ? selectedDay.festival.name
                : `${MONTHS[month]} ${selectedDay.day}`}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {selectedDay.diff === 0 && "Today"}
              {selectedDay.diff === 1 && "Tomorrow"}
              {selectedDay.diff > 1 && `${selectedDay.diff} days away`}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Historically sees higher footfall and larger basket sizes.
            </p>
          </div>
          {selectedDay.festival && (
            <span className="text-4xl">{selectedDay.festival.icon}</span>
          )}
        </div>
      </div>

      {/* Demand */}
      <div className={`p-4 rounded-xl border-2 ${demandColor(selectedDay.demand)}`}>
        <div className="text-center font-bold text-xl">
          {selectedDay.demand} Impact Day
        </div>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-5 h-5 text-gray-600" />
          <h4 className="font-semibold">Categories to Scale</h4>
        </div>
        <div className="space-y-2">
          {selectedDay.categories.map((c, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
            >
              <span className="text-sm font-medium">{c.name}</span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {c.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border rounded-xl p-4">
        <h4 className="font-semibold mb-2">Recommended Actions</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Increase category-level procurement</li>
          <li>• Repeat last successful festival order</li>
          <li>• Lock vendor supply early</li>
        </ul>
      </div>

      <p className="text-xs text-gray-500">
        Insights based on historical festival and seasonal retail trends.
      </p>
    </div>
  )

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Festival Demand Calendar</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow border">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
                <ChevronLeft />
              </button>
              <h2 className="font-bold text-xl">
                {MONTHS[month]} {year}
              </h2>
              <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
                <ChevronRight />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {WEEKDAYS.map(d => (
                <div key={d} className="text-xs font-semibold text-center text-gray-500">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {cells}
            </div>
          </div>

          {/* Desktop Panel */}
          {!isMobile && (
            <div className="bg-white rounded-2xl p-6 shadow border sticky top-4">
              {selectedDay
                ? <InsightPanel />
                : <p className="text-gray-400 text-center mt-20">
                    Select a date to view insights
                  </p>}
            </div>
          )}
        </div>

        {/* Mobile Panel */}
        {isMobile && selectedDay && (
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-xl max-h-[85vh] overflow-y-auto">
            <InsightPanel />
          </div>
        )}
      </div>
    </div>
  )
}
