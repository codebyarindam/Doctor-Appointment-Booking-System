// "use client"

// import { isSameDay } from "@/lib/date-utils"
// import { getAppointmentColor } from "@/lib/date-utils"
// import { cn } from "@/lib/utils"

// const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// export default function MonthView({ calendarDays, appointments, onDateClick, onAppointmentClick }) {
//   // Get appointments for a specific date
//   const getAppointmentsForDate = (date) => {
//     return appointments.filter((appointment) => isSameDay(new Date(appointment.date), date))
//   }

//   return (
//     <div>
//       {/* Day headers */}
//       <div className="calendar-grid border-b">
//         {DAYS_OF_WEEK.map((day) => (
//           <div key={day} className="text-center font-medium py-2 text-sm text-muted-foreground">
//             {day}
//           </div>
//         ))}
//       </div>

//       {/* Calendar grid */}
//       <div className="calendar-grid">
//         {calendarDays.map((day, index) => {
//           const dayAppointments = getAppointmentsForDate(day.date)
//           const isToday = isSameDay(day.date, new Date())

//           return (
//             <div
//               key={index}
//               className={cn(
//                 "calendar-day border p-1 md:p-2",
//                 !day.isCurrentMonth && "outside-month",
//                 isToday && "today",
//               )}
//               onClick={() => onDateClick(day.date)}
//             >
//               <div className="flex justify-between items-start">
//                 <div
//                   className={cn(
//                     "text-xs md:text-sm font-medium",
//                     !day.isCurrentMonth && "text-muted-foreground",
//                     isToday && "text-primary",
//                   )}
//                 >
//                   {day.date.getDate()}
//                 </div>

//                 {/* Doctor initials for the first appointment */}
//                 {dayAppointments.length > 0 && dayAppointments[0].doctorId && (
//                   <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs">
//                     {dayAppointments[0].doctorInitials || "Dr"}
//                   </div>
//                 )}
//               </div>

//               {/* Appointment pills */}
//               {dayAppointments.length > 0 && (
//                 <div className="mt-1 flex flex-col gap-1">
//                   {dayAppointments.length <= 2 ? (
//                     dayAppointments.map((appointment, i) => (
//                       <div
//                         key={i}
//                         className={cn(
//                           "text-xs truncate p-1 rounded cursor-pointer",
//                           getAppointmentColor(appointment.type),
//                         )}
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           onAppointmentClick(appointment)
//                         }}
//                       >
//                         {appointment.time} {appointment.name.split(" ")[0]}
//                       </div>
//                     ))
//                   ) : (
//                     <>
//                       <div
//                         className={cn(
//                           "text-xs truncate p-1 rounded cursor-pointer",
//                           getAppointmentColor(dayAppointments[0].type),
//                         )}
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           onAppointmentClick(dayAppointments[0])
//                         }}
//                       >
//                         {dayAppointments[0].time} {dayAppointments[0].name.split(" ")[0]}
//                       </div>
//                       <div
//                         className="text-xs p-1 rounded bg-muted text-muted-foreground cursor-pointer text-center"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           // Show all appointments for this day
//                           onAppointmentClick(dayAppointments[0])
//                         }}
//                       >
//                         +{dayAppointments.length - 1} more
//                       </div>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }
"use client"

import { isSameDay } from "@/lib/date-utils"
import { getAppointmentColor } from "@/lib/date-utils"
import { cn } from "@/lib/utils"

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function MonthView({ calendarDays, appointments, onDateClick, onAppointmentClick }) {
  // Get appointments for a specific date
  const getAppointmentsForDate = (date) => {
    return appointments.filter((appointment) => isSameDay(new Date(appointment.date), date))
  }

  return (
    <div>
      {/* Day headers */}
      <div className="calendar-grid border-b border-teal-100 dark:border-teal-900 bg-gradient-to-r from-teal-50/50 to-emerald-50/50 dark:from-teal-950/20 dark:to-emerald-950/20">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center font-medium py-2 text-sm text-teal-700 dark:text-teal-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="calendar-grid">
        {calendarDays.map((day, index) => {
          const dayAppointments = getAppointmentsForDate(day.date)
          const isToday = isSameDay(day.date, new Date())

          return (
            <div
              key={index}
              className={cn(
                "calendar-day border-teal-100 dark:border-teal-900 border p-1 md:p-2",
                !day.isCurrentMonth && "outside-month bg-teal-50/30 dark:bg-teal-950/10",
                isToday && "today",
                day.isCurrentMonth && "bg-white dark:bg-gray-800",
              )}
              onClick={() => onDateClick(day.date)}
            >
              <div className="flex justify-between items-start">
                <div
                  className={cn(
                    "text-xs md:text-sm font-medium",
                    !day.isCurrentMonth && "text-teal-400/50 dark:text-teal-600/50",
                    isToday && "text-teal-600 dark:text-teal-400",
                  )}
                >
                  {day.date.getDate()}
                </div>

                {/* Doctor initials for the first appointment */}
                {dayAppointments.length > 0 && dayAppointments[0].doctorId && (
                  <div className="flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-400 text-white rounded-full w-5 h-5 text-xs shadow-sm">
                    {dayAppointments[0].doctorInitials || "Dr"}
                  </div>
                )}
              </div>

              {/* Appointment pills */}
              {dayAppointments.length > 0 && (
                <div className="mt-1 flex flex-col gap-1">
                  {dayAppointments.length <= 2 ? (
                    dayAppointments.map((appointment, i) => (
                      <div
                        key={i}
                        className={cn(
                          "text-xs truncate p-1 rounded cursor-pointer shadow-sm",
                          getAppointmentColor(appointment.type),
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          onAppointmentClick(appointment)
                        }}
                      >
                        <span className="font-medium">{appointment.time}</span> {appointment.name.split(" ")[0]}
                      </div>
                    ))
                  ) : (
                    <>
                      <div
                        className={cn(
                          "text-xs truncate p-1 rounded cursor-pointer shadow-sm",
                          getAppointmentColor(dayAppointments[0].type),
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          onAppointmentClick(dayAppointments[0])
                        }}
                      >
                        <span className="font-medium">{dayAppointments[0].time}</span>{" "}
                        {dayAppointments[0].name.split(" ")[0]}
                      </div>
                      <div
                        className="text-xs p-1 rounded bg-gradient-to-r from-teal-200 to-emerald-200 dark:from-teal-900/50 dark:to-emerald-900/50 text-teal-800 dark:text-teal-300 cursor-pointer text-center shadow-sm border border-teal-300 dark:border-teal-800"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Show all appointments for this day
                          onAppointmentClick(dayAppointments[0])
                        }}
                      >
                        +{dayAppointments.length - 1} more
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
