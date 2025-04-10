"use client"

import { isSameDay } from "@/lib/date-utils"
import { getAppointmentColor } from "@/lib/date-utils"
import { cn } from "@/lib/utils"

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM

export default function WeekView({ weekDays, appointments, onDateClick, onAppointmentClick }) {
  // Get appointments for a specific date
  const getAppointmentsForDateTime = (date, hour) => {
    return appointments.filter((appointment) => {
      if (!isSameDay(new Date(appointment.date), date)) return false

      const appointmentHour = Number.parseInt(appointment.time.split(":")[0])
      return appointmentHour === hour
    })
  }

  // Calculate position and height for appointment
  const getAppointmentStyle = (appointment) => {
    const [hours, minutes] = appointment.time.split(":").map(Number)
    const top = (minutes / 60) * 100

    // Default height is 50px (50 minutes)
    const height = 50

    return {
      top: `${top}%`,
      height: `${height}px`,
    }
  }

  return (
    <div>
      {/* Day headers */}
      <div className="grid grid-cols-8 border-b">
        <div className="p-2"></div> {/* Empty cell for time column */}
        {weekDays.map((date, index) => {
          const isToday = isSameDay(date, new Date())

          return (
            <div key={index} className={cn("text-center p-2 font-medium border-l", isToday && "bg-primary/5")}>
              <div className="text-xs text-muted-foreground">{DAYS_OF_WEEK[date.getDay()]}</div>
              <div className={cn("text-sm mt-1", isToday && "text-primary font-bold")}>{date.getDate()}</div>
            </div>
          )
        })}
      </div>

      {/* Time grid */}
      <div className="grid grid-cols-8">
        {/* Time labels */}
        <div className="col-span-1">
          {HOURS.map((hour) => (
            <div key={hour} className="h-16 border-r relative">
              <div className="absolute -top-2 right-2 text-xs text-muted-foreground">
                {hour % 12 === 0 ? 12 : hour % 12}:00 {hour >= 12 ? "PM" : "AM"}
              </div>
            </div>
          ))}
        </div>

        {/* Week days columns */}
        {weekDays.map((date, dayIndex) => (
          <div key={dayIndex} className="col-span-1">
            {HOURS.map((hour) => {
              const cellAppointments = getAppointmentsForDateTime(date, hour)
              const isToday = isSameDay(date, new Date())

              return (
                <div
                  key={hour}
                  className={cn("h-16 border-r border-b relative", isToday && "bg-primary/5")}
                  onClick={() => {
                    const newDate = new Date(date)
                    newDate.setHours(hour)
                    onDateClick(newDate)
                  }}
                >
                  {cellAppointments.map((appointment, i) => (
                    <div
                      key={i}
                      className={cn("appointment-card", getAppointmentColor(appointment.type))}
                      style={getAppointmentStyle(appointment)}
                      onClick={(e) => {
                        e.stopPropagation()
                        onAppointmentClick(appointment)
                      }}
                    >
                      {appointment.time} {appointment.name.split(" ")[0]}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
