"use client"

import { createContext, useContext, useState, useEffect } from "react"

const DoctorContext = createContext()

// Sample doctors data
const sampleDoctors = [
  { id: "1", name: "Dr. John Smith", specialty: "Cardiologist", avatar: "/placeholder.svg" },
  { id: "2", name: "Dr. Sarah Johnson", specialty: "Pediatrician", avatar: "/placeholder.svg" },
  { id: "3", name: "Dr. Michael Brown", specialty: "Neurologist", avatar: "/placeholder.svg" },
  { id: "4", name: "Dr. Emily Davis", specialty: "Dermatologist", avatar: "/placeholder.svg" },
  { id: "5", name: "Dr. James Wilson", specialty: "Orthopedic", avatar: "/placeholder.svg" },
]

export function DoctorProvider({ children }) {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load doctors from localStorage or use sample data
    const savedDoctors = localStorage.getItem("doctors")
    if (savedDoctors) {
      try {
        setDoctors(JSON.parse(savedDoctors))
      } catch (error) {
        console.error("Failed to parse doctors from localStorage", error)
        setDoctors(sampleDoctors)
      }
    } else {
      // Use sample data for initial load
      setDoctors(sampleDoctors)
      localStorage.setItem("doctors", JSON.stringify(sampleDoctors))
    }
    setLoading(false)
  }, [])

  // Save doctors to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("doctors", JSON.stringify(doctors))
    }
  }, [doctors, loading])

  const addDoctor = (doctor) => {
    const newDoctor = {
      ...doctor,
      id: Date.now().toString(),
    }
    setDoctors((prev) => [...prev, newDoctor])
  }

  const updateDoctor = (updatedDoctor) => {
    setDoctors((prev) => prev.map((doctor) => (doctor.id === updatedDoctor.id ? updatedDoctor : doctor)))
  }

  const deleteDoctor = (id) => {
    setDoctors((prev) => prev.filter((doctor) => doctor.id !== id))
  }

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        loading,
        addDoctor,
        updateDoctor,
        deleteDoctor,
      }}
    >
      {children}
    </DoctorContext.Provider>
  )
}

export function useDoctors() {
  const context = useContext(DoctorContext)
  if (!context) {
    throw new Error("useDoctors must be used within a DoctorProvider")
  }
  return context
}
