// "use client"

// import { useState, useEffect } from "react"
// import { X } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useAppointments } from "@/context/AppointmentContext"
// import { useDoctors } from "@/context/DoctorContext"
// import { formatDate } from "@/lib/date-utils"
// import { useToast } from "@/components/ui/use-toast"

// // Appointment types
// const APPOINTMENT_TYPES = [
//   { id: "routine", name: "Routine Checkup", color: "bg-red-500" },
//   { id: "emergency", name: "Emergency", color: "bg-red-500" },
//   { id: "examination", name: "Examination", color: "bg-yellow-400" },
//   { id: "consultation", name: "Consultation", color: "bg-purple-500" },
//   { id: "sick", name: "Sick Visit", color: "bg-blue-500" },
// ]

// export default function AppointmentModal({ isOpen, onClose, selectedDate, appointment }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     time: "",
//     reason: "",
//     type: "routine",
//     doctorId: "",
//   })

//   const { addAppointment, updateAppointment } = useAppointments()
//   const { doctors } = useDoctors()
//   const { toast } = useToast()
//   const isEditing = !!appointment

//   // Set default time to current hour if not editing
//   useEffect(() => {
//     if (!isEditing && selectedDate) {
//       const hours = selectedDate.getHours().toString().padStart(2, "0")
//       const minutes = selectedDate.getMinutes().toString().padStart(2, "0")
//       setFormData((prev) => ({
//         ...prev,
//         time: `${hours}:${minutes}`,
//       }))
//     }
//   }, [selectedDate, isEditing])

//   useEffect(() => {
//     if (appointment) {
//       setFormData({
//         name: appointment.name || "",
//         email: appointment.email || "",
//         phone: appointment.phone || "",
//         time: appointment.time || "",
//         reason: appointment.reason || "",
//         type: appointment.type || "routine",
//         doctorId: appointment.doctorId || "",
//       })
//     } else {
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         time: selectedDate ? `${selectedDate.getHours().toString().padStart(2, "0")}:00` : "",
//         reason: "",
//         type: "routine",
//         doctorId: "",
//       })
//     }
//   }, [appointment, selectedDate])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSelectChange = (name, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     if (!formData.name || !formData.time) {
//       toast({
//         title: "Error",
//         description: "Name and time are required fields",
//         variant: "destructive",
//       })
//       return
//     }

//     // Get doctor initials if a doctor is selected
//     let doctorInitials = ""
//     if (formData.doctorId) {
//       const doctor = doctors.find((d) => d.id === formData.doctorId)
//       if (doctor) {
//         const nameParts = doctor.name.split(" ")
//         doctorInitials = nameParts.map((part) => part[0]).join("")
//       }
//     }

//     const appointmentData = {
//       ...formData,
//       date: selectedDate,
//       id: appointment ? appointment.id : Date.now().toString(),
//       doctorInitials,
//     }

//     if (isEditing) {
//       updateAppointment(appointmentData)
//       toast({
//         title: "Appointment Updated",
//         description: `Your appointment on ${formatDate(selectedDate)} at ${formData.time} has been updated.`,
//       })
//     } else {
//       addAppointment(appointmentData)
//       toast({
//         title: "Appointment Booked",
//         description: `Your appointment has been booked for ${formatDate(selectedDate)} at ${formData.time}.`,
//       })
//     }

//     onClose()
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-card rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-xl font-semibold">{isEditing ? "Edit Appointment" : "Book Appointment"}</h2>
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             <X className="h-5 w-5" />
//           </Button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-4 space-y-4">
//           <div>
//             <p className="text-sm font-medium mb-4">Date: {formatDate(selectedDate)}</p>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="name">Patient Name</Label>
//             <Input
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter patient name"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter email address"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="phone">Phone</Label>
//             <Input
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Enter phone number"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="time">Time</Label>
//             <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="type">Appointment Type</Label>
//             <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select appointment type" />
//               </SelectTrigger>
//               <SelectContent>
//                 {APPOINTMENT_TYPES.map((type) => (
//                   <SelectItem key={type.id} value={type.id}>
//                     <div className="flex items-center">
//                       <span className={`w-2 h-2 rounded-full mr-2 ${type.color}`}></span>
//                       {type.name}
//                     </div>
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="doctor">Doctor</Label>
//             <Select value={formData.doctorId} onValueChange={(value) => handleSelectChange("doctorId", value)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select a doctor" />
//               </SelectTrigger>
//               <SelectContent>
//                 {doctors.map((doctor) => (
//                   <SelectItem key={doctor.id} value={doctor.id}>
//                     {doctor.name} - {doctor.specialty}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="reason">Reason for Visit</Label>
//             <Textarea
//               id="reason"
//               name="reason"
//               value={formData.reason}
//               onChange={handleChange}
//               placeholder="Briefly describe the reason for the appointment"
//               rows={3}
//             />
//           </div>

//           <div className="flex justify-end space-x-2 pt-4">
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit">{isEditing ? "Update Appointment" : "Book Appointment"}</Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState, useEffect, useMemo } from "react"
import { X, Calendar, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppointments } from "@/context/AppointmentContext"
import { useDoctors } from "@/context/DoctorContext"
import { formatDate } from "@/lib/date-utils"
import { useToast } from "@/components/ui/use-toast"
import DoctorTab from "@/components/DoctorTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Appointment types
const APPOINTMENT_TYPES = [
  { id: "routine", name: "Routine Checkup", color: "bg-red-500" },
  { id: "emergency", name: "Emergency", color: "bg-red-500" },
  { id: "examination", name: "Examination", color: "bg-yellow-400" },
  { id: "consultation", name: "Consultation", color: "bg-purple-500" },
  { id: "sick", name: "Sick Visit", color: "bg-blue-500" },
]

export default function AppointmentModal({ isOpen, onClose, selectedDate, appointment }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    time: "",
    reason: "",
    type: "routine",
    doctorId: "",
  })
  const [activeTab, setActiveTab] = useState("details")
  const [formErrors, setFormErrors] = useState({})

  const { addAppointment, updateAppointment, appointments } = useAppointments()
  const { doctors } = useDoctors()
  const { toast } = useToast()
  const isEditing = !!appointment

  // Check for appointment conflicts
  const hasConflict = useMemo(() => {
    if (!formData.time || !formData.doctorId) return false

    return appointments.some(
      (apt) =>
        apt.id !== (appointment?.id || "") &&
        apt.doctorId === formData.doctorId &&
        new Date(apt.date).toDateString() === selectedDate.toDateString() &&
        apt.time === formData.time,
    )
  }, [formData.time, formData.doctorId, appointments, selectedDate, appointment])

  // Set default time to current hour if not editing
  useEffect(() => {
    if (!isEditing && selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, "0")
      const minutes = selectedDate.getMinutes().toString().padStart(2, "0")
      setFormData((prev) => ({
        ...prev,
        time: `${hours}:${minutes}`,
      }))
    }
  }, [selectedDate, isEditing])

  useEffect(() => {
    if (appointment) {
      setFormData({
        name: appointment.name || "",
        email: appointment.email || "",
        phone: appointment.phone || "",
        time: appointment.time || "",
        reason: appointment.reason || "",
        type: appointment.type || "routine",
        doctorId: appointment.doctorId || "",
      })
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        time: selectedDate ? `${selectedDate.getHours().toString().padStart(2, "0")}:00` : "",
        reason: "",
        type: "routine",
        doctorId: "",
      })
    }
  }, [appointment, selectedDate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleDoctorSelect = (doctor) => {
    setFormData((prev) => ({
      ...prev,
      doctorId: doctor.id,
    }))
    setActiveTab("details")
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "Patient name is required"
    }

    if (!formData.time) {
      errors.time = "Appointment time is required"
    }

    if (!formData.doctorId) {
      errors.doctorId = "Please select a doctor"
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (hasConflict) {
      errors.time = "This time slot is already booked with this doctor"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      })
      return
    }

    // Get doctor initials if a doctor is selected
    let doctorInitials = ""
    if (formData.doctorId) {
      const doctor = doctors.find((d) => d.id === formData.doctorId)
      if (doctor) {
        const nameParts = doctor.name.split(" ")
        doctorInitials = nameParts.map((part) => part[0]).join("")
      }
    }

    const appointmentData = {
      ...formData,
      date: selectedDate,
      id: appointment ? appointment.id : Date.now().toString(),
      doctorInitials,
    }

    if (isEditing) {
      updateAppointment(appointmentData)
      toast({
        title: "Appointment Updated",
        description: `Your appointment on ${formatDate(selectedDate)} at ${formData.time} has been updated.`,
      })
    } else {
      addAppointment(appointmentData)
      toast({
        title: "Appointment Booked",
        description: `Your appointment has been booked for ${formatDate(selectedDate)} at ${formData.time}.`,
      })
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{isEditing ? "Edit Appointment" : "Book Appointment"}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-4 pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Appointment Details</TabsTrigger>
              <TabsTrigger value="doctor">Select Doctor</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-md">
                <Calendar className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium">{formatDate(selectedDate)}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">
                  Patient Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter patient name"
                  className={formErrors.name ? "border-red-500" : ""}
                />
                {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className={formErrors.email ? "border-red-500" : ""}
                />
                {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">
                  Time <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={formErrors.time ? "border-red-500" : ""}
                  />
                  {hasConflict && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {formErrors.time && <p className="text-xs text-red-500 mt-1">{formErrors.time}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">
                  Appointment Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {APPOINTMENT_TYPES.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${type.color}`}></span>
                          {type.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="doctor">
                    Doctor <span className="text-red-500">*</span>
                  </Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("doctor")}
                    className="text-xs h-6 px-2"
                  >
                    Browse doctors
                  </Button>
                </div>
                <Select value={formData.doctorId} onValueChange={(value) => handleSelectChange("doctorId", value)}>
                  <SelectTrigger className={formErrors.doctorId ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.doctorId && <p className="text-xs text-red-500 mt-1">{formErrors.doctorId}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Briefly describe the reason for the appointment"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">{isEditing ? "Update Appointment" : "Book Appointment"}</Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="doctor">
            <DoctorTab onSelectDoctor={handleDoctorSelect} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
