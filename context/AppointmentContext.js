"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AppointmentContext = createContext()

// Sample appointments data
const sampleAppointments = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "123-456-7890",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: "09:00",
    reason: "Annual checkup",
    type: "routine",
    doctorId: "1",
    doctorInitials: "JS",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "234-567-8901",
    date: new Date(),
    time: "14:30",
    reason: "Fever and headache",
    type: "sick",
    doctorId: "2",
    doctorInitials: "SJ",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "345-678-9012",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: "11:15",
    reason: "COVID-19 test",
    type: "examination",
    doctorId: "3",
    doctorInitials: "MB",
  },
  {
    id: "4",
    name: "Emily Wilson",
    email: "emily@example.com",
    phone: "456-789-0123",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    time: "16:00",
    reason: "Neck pain",
    type: "consultation",
    doctorId: "5",
    doctorInitials: "JW",
  },
  {
    id: "5",
    name: "David Lee",
    email: "david@example.com",
    phone: "567-890-1234",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    time: "10:30",
    reason: "Routine checkup",
    type: "routine",
    doctorId: "4",
    doctorInitials: "ED",
  },
]

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load appointments from localStorage or use sample data
    const savedAppointments = localStorage.getItem("appointments")
    if (savedAppointments) {
      try {
        // Convert date strings back to Date objects
        const parsedAppointments = JSON.parse(savedAppointments).map((appt) => ({
          ...appt,
          date: new Date(appt.date),
        }))
        setAppointments(parsedAppointments)
      } catch (error) {
        console.error("Failed to parse appointments from localStorage", error)
        setAppointments(sampleAppointments)
      }
    } else {
      // Use sample data for initial load
      setAppointments(sampleAppointments)
      localStorage.setItem("appointments", JSON.stringify(sampleAppointments))
    }
    setLoading(false)
  }, [])

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("appointments", JSON.stringify(appointments))
    }
  }, [appointments, loading])

  const addAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment])
  }

  const updateAppointment = (updatedAppointment) => {
    setAppointments((prev) =>
      prev.map((appointment) => (appointment.id === updatedAppointment.id ? updatedAppointment : appointment)),
    )
  }

  const deleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((appointment) => appointment.id !== id))
  }

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        addAppointment,
        updateAppointment,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointments() {
  const context = useContext(AppointmentContext)
  if (!context) {
    throw new Error("useAppointments must be used within an AppointmentProvider")
  }
  return context
}
