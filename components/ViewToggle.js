// "use client"

// import { cn } from "@/lib/utils"
// import { CalendarDays, CalendarRange } from "lucide-react"

// export default function ViewToggle({ view, setView }) {
//   return (
//     <div className="view-toggle">
//       <button className={cn("view-toggle-button", view === "month" && "active")} onClick={() => setView("month")}>
//         <span className="flex items-center gap-1">
//           <CalendarDays className="h-4 w-4" />
//           <span>Month</span>
//         </span>
//       </button>
//       <button className={cn("view-toggle-button", view === "week" && "active")} onClick={() => setView("week")}>
//         <span className="flex items-center gap-1">
//           <CalendarRange className="h-4 w-4" />
//           <span>Week</span>
//         </span>
//       </button>
//       <div className="ml-auto flex space-x-1">
//         <button className={cn("view-toggle-button", view === "day" && "active")} onClick={() => setView("day")}>
//           Day
//         </button>
//         <button className="view-toggle-button">Today</button>
//       </div>
//     </div>
//   )
// }
"use client"

import { cn } from "@/lib/utils"
import { CalendarDays, CalendarRange } from "lucide-react"

export default function ViewToggle({ view, setView }) {
  return (
    <div className="view-toggle bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 border border-teal-100 dark:border-teal-900">
      <button
        className={cn(
          "view-toggle-button",
          view === "month" && "bg-white dark:bg-gray-800 shadow-sm text-teal-700 dark:text-teal-400",
        )}
        onClick={() => setView("month")}
      >
        <span className="flex items-center gap-1">
          <CalendarDays className="h-4 w-4" />
          <span>Month</span>
        </span>
      </button>
      <button
        className={cn(
          "view-toggle-button",
          view === "week" && "bg-white dark:bg-gray-800 shadow-sm text-teal-700 dark:text-teal-400",
        )}
        onClick={() => setView("week")}
      >
        <span className="flex items-center gap-1">
          <CalendarRange className="h-4 w-4" />
          <span>Week</span>
        </span>
      </button>
      <div className="ml-auto flex space-x-1">
        <button
          className={cn(
            "view-toggle-button",
            view === "day" && "bg-white dark:bg-gray-800 shadow-sm text-teal-700 dark:text-teal-400",
          )}
          onClick={() => setView("day")}
        >
          Day
        </button>
        <button
          className="view-toggle-button hover:bg-white dark:hover:bg-gray-800 hover:text-teal-700 dark:hover:text-teal-400"
          onClick={() => setView("month")}
        >
          Today
        </button>
      </div>
    </div>
  )
}
