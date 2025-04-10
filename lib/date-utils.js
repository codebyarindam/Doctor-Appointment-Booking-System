// // Get days in a month
// export function getDaysInMonth(year, month) {
//   return new Date(year, month + 1, 0).getDate()
// }

// // Get the day of the week for the first day of the month (0-6)
// export function getFirstDayOfMonth(year, month) {
//   return new Date(year, month, 1).getDay()
// }

// // Check if two dates are the same day
// export function isSameDay(date1, date2) {
//   if (!date1 || !date2) return false

//   return (
//     date1.getDate() === date2.getDate() &&
//     date1.getMonth() === date2.getMonth() &&
//     date1.getFullYear() === date2.getFullYear()
//   )
// }

// // Format date to readable string
// export function formatDate(date) {
//   if (!date) return ""

//   const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" }
//   return new Date(date).toLocaleDateString("en-US", options)
// }

// // Get days for a week view
// export function getWeekDays(date) {
//   const result = []
//   const startOfWeek = new Date(date)

//   // Set to the first day of the week (Sunday)
//   startOfWeek.setDate(date.getDate() - date.getDay())

//   // Get all 7 days of the week
//   for (let i = 0; i < 7; i++) {
//     const day = new Date(startOfWeek)
//     day.setDate(startOfWeek.getDate() + i)
//     result.push(day)
//   }

//   return result
// }

// // Get color class for appointment type
// export function getAppointmentColor(type) {
//   const colors = {
//     routine: "appointment-routine",
//     emergency: "appointment-emergency",
//     examination: "appointment-examination",
//     consultation: "appointment-consultation",
//     sick: "appointment-sick",
//   }

//   return colors[type] || "bg-primary text-primary-foreground"
// }
/// Get days in a month
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

// Get the day of the week for the first day of the month (0-6)
export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

// Check if two dates are the same day
export function isSameDay(date1, date2) {
  if (!date1 || !date2) return false

  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

// Format date to readable string
export function formatDate(date) {
  if (!date) return ""

  const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

// Get days for a week view
export function getWeekDays(date) {
  const result = []
  const startOfWeek = new Date(date)

  // Set to the first day of the week (Sunday)
  startOfWeek.setDate(date.getDate() - date.getDay())

  // Get all 7 days of the week
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    result.push(day)
  }

  return result
}

// Get color class for appointment type
export function getAppointmentColor(type) {
  const colors = {
    routine: "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border border-teal-700/20",
    emergency: "bg-gradient-to-r from-red-600 to-rose-600 text-white border border-red-700/20",
    examination: "bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-medium border border-yellow-600/20",
    consultation: "bg-gradient-to-r from-purple-600 to-violet-600 text-white border border-purple-700/20",
    sick: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-blue-700/20",
  }

  return colors[type] || "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border border-teal-700/20"
}
