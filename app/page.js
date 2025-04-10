// "use client"

// import { useState, useEffect } from "react"
// import Calendar from "@/components/Calendar"
// import AppointmentModal from "@/components/AppointmentModal"
// import { useAppointments } from "@/context/AppointmentContext"
// import { useTheme } from "@/context/ThemeContext"
// import { SunIcon, MoonIcon, PlusIcon } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Toaster } from "@/components/ui/toaster"
// import AppointmentDetails from "@/components/AppointmentDetails"
// import Sidebar from "@/components/Sidebar"
// import SearchBar from "@/components/SearchBar"
// import ViewToggle from "@/components/ViewToggle"
// import { useDoctors } from "@/context/DoctorContext"

// export default function Home() {
//   const [selectedDate, setSelectedDate] = useState(null)
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [selectedAppointment, setSelectedAppointment] = useState(null)
//   const [isDetailsOpen, setIsDetailsOpen] = useState(false)
//   const [view, setView] = useState("month") // "month" or "week"
//   const [searchQuery, setSearchQuery] = useState("")
//   const { appointments } = useAppointments()
//   const { doctors } = useDoctors()
//   const { theme, toggleTheme } = useTheme()

//   // Set current date on initial load
//   useEffect(() => {
//     setSelectedDate(new Date())
//   }, [])

//   const handleDateClick = (date) => {
//     setSelectedDate(date)
//     setSelectedAppointment(null)
//     setIsModalOpen(true)
//   }

//   const handleAppointmentClick = (appointment) => {
//     setSelectedAppointment(appointment)
//     setIsDetailsOpen(true)
//   }

//   const closeModal = () => {
//     setIsModalOpen(false)
//     setSelectedAppointment(null)
//   }

//   const closeDetails = () => {
//     setIsDetailsOpen(false)
//     setSelectedAppointment(null)
//   }

//   const handleEditAppointment = (appointment) => {
//     setSelectedDate(new Date(appointment.date))
//     setSelectedAppointment(appointment)
//     setIsDetailsOpen(false)
//     setIsModalOpen(true)
//   }

//   const handleSearch = (query) => {
//     setSearchQuery(query)
//   }

//   // Filter appointments based on search query
//   const filteredAppointments = searchQuery
//     ? appointments.filter(
//         (appointment) =>
//           appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           (appointment.doctorId &&
//             doctors
//               .find((d) => d.id === appointment.doctorId)
//               ?.name.toLowerCase()
//               .includes(searchQuery.toLowerCase())) ||
//           (appointment.reason && appointment.reason.toLowerCase().includes(searchQuery.toLowerCase())) ||
//           (appointment.type && appointment.type.toLowerCase().includes(searchQuery.toLowerCase())),
//       )
//     : appointments

//   return (
//     <div className="flex h-screen bg-background">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content */}
//       <main className="flex-1 overflow-auto">
//         <div className="p-4 md:p-6">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//             <h1 className="text-2xl font-bold text-teal-700 dark:text-teal-400">Appointments</h1>

//             <div className="flex items-center gap-4 w-full md:w-auto">
//               <SearchBar onSearch={handleSearch} />

//               <div className="flex items-center gap-2 ml-auto">
//                 <div className="flex items-center">
//                   <SunIcon className="h-4 w-4 mr-1 text-yellow-500" />
//                   <button
//                     className={`relative inline-flex h-5 w-10 items-center rounded-full ${
//                       theme === "dark" ? "bg-teal-600" : "bg-gray-200"
//                     }`}
//                     onClick={toggleTheme}
//                   >
//                     <span className="sr-only">Toggle theme</span>
//                     <span
//                       className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
//                         theme === "dark" ? "translate-x-5" : "translate-x-1"
//                       }`}
//                     />
//                   </button>
//                   <MoonIcon className="h-4 w-4 ml-1 text-indigo-400" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* View toggle */}
//           <ViewToggle view={view} setView={setView} />

//           {/* Calendar */}
//           <div className="bg-card rounded-lg shadow-sm overflow-hidden border border-teal-100 dark:border-teal-900">
//             <Calendar
//               view={view}
//               onDateClick={handleDateClick}
//               onAppointmentClick={handleAppointmentClick}
//               appointments={filteredAppointments}
//             />
//           </div>

//           {/* Add appointment button (mobile) */}
//           <Button
//             className="fixed bottom-4 right-4 rounded-full h-12 w-12 md:hidden shadow-lg bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
//             onClick={() => {
//               setSelectedDate(new Date())
//               setSelectedAppointment(null)
//               setIsModalOpen(true)
//             }}
//           >
//             <PlusIcon className="h-6 w-6" />
//           </Button>
//         </div>

//         {/* Modals */}
//         {isModalOpen && (
//           <AppointmentModal
//             isOpen={isModalOpen}
//             onClose={closeModal}
//             selectedDate={selectedDate}
//             appointment={selectedAppointment}
//           />
//         )}

//         {isDetailsOpen && selectedAppointment && (
//           <AppointmentDetails
//             isOpen={isDetailsOpen}
//             onClose={closeDetails}
//             appointment={selectedAppointment}
//             onEdit={handleEditAppointment}
//           />
//         )}
//       </main>
//       <Toaster />
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import Calendar from "@/components/Calendar"
import AppointmentModal from "@/components/AppointmentModal"
import { useAppointments } from "@/context/AppointmentContext"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import AppointmentDetails from "@/components/AppointmentDetails"
import Sidebar from "@/components/Sidebar"
import SearchBar from "@/components/SearchBar"
import ViewToggle from "@/components/ViewToggle"
import { useDoctors } from "@/context/DoctorContext"
import ThemeToggle from "@/components/ThemeToggle"

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [view, setView] = useState("month") // "month" or "week"
  const [searchQuery, setSearchQuery] = useState("")
  const { appointments } = useAppointments()
  const { doctors } = useDoctors()

  // Set current date on initial load
  useEffect(() => {
    setSelectedDate(new Date())
  }, [])

  const handleDateClick = (date) => {
    setSelectedDate(date)
    setSelectedAppointment(null)
    setIsModalOpen(true)
  }

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment)
    setIsDetailsOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedAppointment(null)
  }

  const closeDetails = () => {
    setIsDetailsOpen(false)
    setSelectedAppointment(null)
  }

  const handleEditAppointment = (appointment) => {
    setSelectedDate(new Date(appointment.date))
    setSelectedAppointment(appointment)
    setIsDetailsOpen(false)
    setIsModalOpen(true)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  // Filter appointments based on search query
  const filteredAppointments = searchQuery
    ? appointments.filter(
        (appointment) =>
          appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (appointment.doctorId &&
            doctors
              .find((d) => d.id === appointment.doctorId)
              ?.name.toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (appointment.reason && appointment.reason.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (appointment.type && appointment.type.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : appointments

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-teal-700 dark:text-teal-400">Appointments</h1>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <SearchBar onSearch={handleSearch} />

              <div className="flex items-center gap-2 ml-auto">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* View toggle */}
          <ViewToggle view={view} setView={setView} />

          {/* Calendar */}
          <div className="bg-card rounded-lg shadow-sm overflow-hidden border border-teal-100 dark:border-teal-900">
            <Calendar
              view={view}
              onDateClick={handleDateClick}
              onAppointmentClick={handleAppointmentClick}
              appointments={filteredAppointments}
            />
          </div>

          {/* Add appointment button (mobile) */}
          <Button
            className="fixed bottom-4 right-4 rounded-full h-12 w-12 md:hidden shadow-lg bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
            onClick={() => {
              setSelectedDate(new Date())
              setSelectedAppointment(null)
              setIsModalOpen(true)
            }}
            aria-label="Add appointment"
          >
            <PlusIcon className="h-6 w-6" />
          </Button>
        </div>

        {/* Modals */}
        {isModalOpen && (
          <AppointmentModal
            isOpen={isModalOpen}
            onClose={closeModal}
            selectedDate={selectedDate}
            appointment={selectedAppointment}
          />
        )}

        {isDetailsOpen && selectedAppointment && (
          <AppointmentDetails
            isOpen={isDetailsOpen}
            onClose={closeDetails}
            appointment={selectedAppointment}
            onEdit={handleEditAppointment}
          />
        )}
      </main>
      <Toaster />
    </div>
  )
}
