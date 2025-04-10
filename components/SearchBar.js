// "use client"

// import { useState } from "react"
// import { Search } from "lucide-react"
// import { Input } from "@/components/ui/input"

// export default function SearchBar({ onSearch }) {
//   const [searchTerm, setSearchTerm] = useState("")

//   const handleChange = (e) => {
//     const value = e.target.value
//     setSearchTerm(value)
//     onSearch(value)
//   }

//   return (
//     <div className="search-bar">
//       <Search className="search-icon h-4 w-4" />
//       <Input
//         type="text"
//         placeholder="Search patients, doctors or appointments..."
//         value={searchTerm}
//         onChange={handleChange}
//         className="search-input"
//       />
//     </div>
//   )
// }
"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, User, Calendar, UserRound } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppointments } from "@/context/AppointmentContext"
import { useDoctors } from "@/context/DoctorContext"
import { formatDate } from "@/lib/date-utils"

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState("all") // "all", "patients", "doctors"
  const searchRef = useRef(null)

  const { appointments } = useAppointments()
  const { doctors } = useDoctors()

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      onSearch("")
      return
    }

    const term = searchTerm.toLowerCase()

    // Get unique patients from appointments
    const patientSet = new Set()
    const patientResults = appointments
      .filter((apt) => apt.name.toLowerCase().includes(term))
      .map((apt) => {
        if (!patientSet.has(apt.name)) {
          patientSet.add(apt.name)
          return {
            id: apt.id,
            type: "patient",
            name: apt.name,
            detail: formatDate(new Date(apt.date)),
            appointmentId: apt.id,
          }
        }
        return null
      })
      .filter(Boolean)
      .slice(0, 3)

    // Get matching doctors
    const doctorResults = doctors
      .filter((doc) => doc.name.toLowerCase().includes(term) || doc.specialty.toLowerCase().includes(term))
      .map((doc) => ({
        id: doc.id,
        type: "doctor",
        name: doc.name,
        detail: doc.specialty,
        doctorId: doc.id,
      }))
      .slice(0, 3)

    // Get matching appointments
    const appointmentResults = appointments
      .filter((apt) => apt.reason?.toLowerCase().includes(term) || apt.type.toLowerCase().includes(term))
      .map((apt) => ({
        id: apt.id,
        type: "appointment",
        name: `${apt.name} - ${apt.type}`,
        detail: formatDate(new Date(apt.date)) + " at " + apt.time,
        appointmentId: apt.id,
      }))
      .slice(0, 3)

    let results = []

    if (activeTab === "all") {
      results = [...patientResults, ...doctorResults, ...appointmentResults]
    } else if (activeTab === "patients") {
      results = patientResults
    } else if (activeTab === "doctors") {
      results = doctorResults
    }

    setSearchResults(results.slice(0, 8))
    onSearch(searchTerm)
  }, [searchTerm, appointments, doctors, activeTab, onSearch])

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    setShowResults(value.trim().length > 0)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
    setShowResults(false)
    onSearch("")
  }

  const handleResultClick = (result) => {
    // Here you would typically navigate to the appropriate page or show details
    console.log("Selected result:", result)
    setShowResults(false)

    // Pass the search result to parent component
    if (result.type === "patient" || result.type === "appointment") {
      onSearch(result.name)
    } else if (result.type === "doctor") {
      onSearch(result.name)
    }
  }

  const getIconForResult = (type) => {
    switch (type) {
      case "patient":
        return <User className="h-4 w-4 text-teal-500" />
      case "doctor":
        return <UserRound className="h-4 w-4 text-emerald-500" />
      case "appointment":
        return <Calendar className="h-4 w-4 text-blue-500" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  return (
    <div className="search-bar relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" />
        <Input
          type="text"
          placeholder="Search patients, doctors or appointments..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input pl-10 pr-10 border-teal-200 dark:border-teal-800 focus-visible:ring-teal-500"
          onFocus={() => setShowResults(searchTerm.trim().length > 0)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search results dropdown */}
      {showResults && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-teal-100 dark:border-teal-900 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-teal-100 dark:border-teal-900">
            <button
              className={`flex-1 py-2 text-sm font-medium ${activeTab === "all" ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-500" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium ${activeTab === "patients" ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-500" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("patients")}
            >
              Patients
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium ${activeTab === "doctors" ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-500" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("doctors")}
            >
              Doctors
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto">
              {searchResults.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className="px-4 py-2 hover:bg-teal-50 dark:hover:bg-teal-900/30 cursor-pointer"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-center">
                    <div className="mr-3">{getIconForResult(result.type)}</div>
                    <div>
                      <p className="text-sm font-medium">{result.name}</p>
                      <p className="text-xs text-muted-foreground">{result.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">No results found for "{searchTerm}"</div>
          )}
        </div>
      )}
    </div>
  )
}
