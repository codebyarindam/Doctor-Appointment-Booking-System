// "use client"

// import { useState, useEffect } from "react"
// import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { getDaysInMonth, getFirstDayOfMonth, getWeekDays } from "@/lib/date-utils"
// import MonthView from "@/components/MonthView"
// import WeekView from "@/components/WeekView"

// const MONTHS = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ]

// export default function Calendar({ view = "month", onDateClick, onAppointmentClick, appointments }) {
//   const [currentDate, setCurrentDate] = useState(new Date())
//   const [calendarDays, setCalendarDays] = useState([])
//   const [weekDays, setWeekDays] = useState([])

//   // Generate calendar days for month view
//   useEffect(() => {
//     if (view === "month") {
//       generateCalendarDays()
//     } else {
//       generateWeekDays()
//     }
//   }, [currentDate, appointments, view])

//   const generateCalendarDays = () => {
//     const year = currentDate.getFullYear()
//     const month = currentDate.getMonth()

//     const daysInMonth = getDaysInMonth(year, month)
//     const firstDayOfMonth = getFirstDayOfMonth(year, month)

//     // Get days from previous month to fill the first week
//     const daysFromPrevMonth = firstDayOfMonth
//     const prevMonth = month === 0 ? 11 : month - 1
//     const prevMonthYear = month === 0 ? year - 1 : year
//     const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth)

//     const days = []

//     // Add days from previous month
//     for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
//       days.push({
//         date: new Date(prevMonthYear, prevMonth, i),
//         isCurrentMonth: false,
//       })
//     }

//     // Add days from current month
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push({
//         date: new Date(year, month, i),
//         isCurrentMonth: true,
//       })
//     }

//     // Add days from next month to complete the grid (6 rows of 7 days)
//     const remainingDays = 42 - days.length
//     const nextMonth = month === 11 ? 0 : month + 1
//     const nextMonthYear = month === 11 ? year + 1 : year

//     for (let i = 1; i <= remainingDays; i++) {
//       days.push({
//         date: new Date(nextMonthYear, nextMonth, i),
//         isCurrentMonth: false,
//       })
//     }

//     setCalendarDays(days)
//   }

//   const generateWeekDays = () => {
//     const days = getWeekDays(currentDate)
//     setWeekDays(days)
//   }

//   const prevPeriod = () => {
//     if (view === "month") {
//       setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
//     } else {
//       const newDate = new Date(currentDate)
//       newDate.setDate(newDate.getDate() - 7)
//       setCurrentDate(newDate)
//     }
//   }

//   const nextPeriod = () => {
//     if (view === "month") {
//       setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
//     } else {
//       const newDate = new Date(currentDate)
//       newDate.setDate(newDate.getDate() + 7)
//       setCurrentDate(newDate)
//     }
//   }

//   // Get title for the current view (month or week)
//   const getViewTitle = () => {
//     if (view === "month") {
//       return `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`
//     } else {
//       const startDate = weekDays[0]
//       const endDate = weekDays[6]

//       if (startDate && endDate) {
//         if (startDate.getMonth() === endDate.getMonth()) {
//           return `${MONTHS[startDate.getMonth()]} ${startDate.getDate()} - ${endDate.getDate()}, ${startDate.getFullYear()}`
//         } else {
//           return `${MONTHS[startDate.getMonth()]} ${startDate.getDate()} - ${MONTHS[endDate.getMonth()]} ${endDate.getDate()}, ${startDate.getFullYear()}`
//         }
//       }
//       return ""
//     }
//   }

//   return (
//     <div className="w-full">
//       {/* Calendar header */}
//       <div className="flex items-center justify-between p-4 border-b">
//         <div className="flex items-center">
//           <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
//           <h2 className="text-xl font-semibold">{getViewTitle()}</h2>
//         </div>
//         <div className="flex space-x-2">
//           <Button variant="outline" size="icon" onClick={prevPeriod} className="h-8 w-8">
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <Button variant="outline" size="icon" onClick={nextPeriod} className="h-8 w-8">
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       {/* Calendar body */}
//       {view === "month" ? (
//         <MonthView
//           calendarDays={calendarDays}
//           appointments={appointments}
//           onDateClick={onDateClick}
//           onAppointmentClick={onAppointmentClick}
//         />
//       ) : (
//         <WeekView
//           weekDays={weekDays}
//           appointments={appointments}
//           onDateClick={onDateClick}
//           onAppointmentClick={onAppointmentClick}
//         />
//       )}
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDaysInMonth, getFirstDayOfMonth, getWeekDays } from "@/lib/date-utils"
import MonthView from "@/components/MonthView"
import WeekView from "@/components/WeekView"

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function Calendar({ view = "month", onDateClick, onAppointmentClick, appointments }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState([])
  const [weekDays, setWeekDays] = useState([])

  // Generate calendar days for month view
  useEffect(() => {
    if (view === "month") {
      generateCalendarDays()
    } else {
      generateWeekDays()
    }
  }, [currentDate, appointments, view])

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    // Get days from previous month to fill the first week
    const daysFromPrevMonth = firstDayOfMonth
    const prevMonth = month === 0 ? 11 : month - 1
    const prevMonthYear = month === 0 ? year - 1 : year
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth)

    const days = []

    // Add days from previous month
    for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
      days.push({
        date: new Date(prevMonthYear, prevMonth, i),
        isCurrentMonth: false,
      })
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      })
    }

    // Add days from next month to complete the grid (6 rows of 7 days)
    const remainingDays = 42 - days.length
    const nextMonth = month === 11 ? 0 : month + 1
    const nextMonthYear = month === 11 ? year + 1 : year

    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(nextMonthYear, nextMonth, i),
        isCurrentMonth: false,
      })
    }

    setCalendarDays(days)
  }

  const generateWeekDays = () => {
    const days = getWeekDays(currentDate)
    setWeekDays(days)
  }

  const prevPeriod = () => {
    if (view === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    } else {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() - 7)
      setCurrentDate(newDate)
    }
  }

  const nextPeriod = () => {
    if (view === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    } else {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() + 7)
      setCurrentDate(newDate)
    }
  }

  // Get title for the current view (month or week)
  const getViewTitle = () => {
    if (view === "month") {
      return `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    } else {
      const startDate = weekDays[0]
      const endDate = weekDays[6]

      if (startDate && endDate) {
        if (startDate.getMonth() === endDate.getMonth()) {
          return `${MONTHS[startDate.getMonth()]} ${startDate.getDate()} - ${endDate.getDate()}, ${startDate.getFullYear()}`
        } else {
          return `${MONTHS[startDate.getMonth()]} ${startDate.getDate()} - ${MONTHS[endDate.getMonth()]} ${endDate.getDate()}, ${startDate.getFullYear()}`
        }
      }
      return ""
    }
  }

  return (
    <div className="w-full">
      {/* Calendar header */}
      <div className="flex items-center justify-between p-4 border-b border-teal-100 dark:border-teal-900 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30">
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-teal-500" />
          <h2 className="text-xl font-semibold text-teal-700 dark:text-teal-400">{getViewTitle()}</h2>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPeriod}
            className="h-8 w-8 border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-700 dark:hover:text-teal-400"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPeriod}
            className="h-8 w-8 border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-700 dark:hover:text-teal-400"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar body */}
      {view === "month" ? (
        <MonthView
          calendarDays={calendarDays}
          appointments={appointments}
          onDateClick={onDateClick}
          onAppointmentClick={onAppointmentClick}
        />
      ) : (
        <WeekView
          weekDays={weekDays}
          appointments={appointments}
          onDateClick={onDateClick}
          onAppointmentClick={onAppointmentClick}
        />
      )}
    </div>
  )
}
