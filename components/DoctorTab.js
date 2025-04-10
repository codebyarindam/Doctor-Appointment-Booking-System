// "use client"

// import { useState } from "react"
// import { useDoctors } from "@/context/DoctorContext"
// import DoctorSearch from "@/components/DoctorSearch"
// import { Button } from "@/components/ui/button"
// import { Calendar, MapPin, Phone, Mail, Star } from "lucide-react"

// export default function DoctorTab({ onSelectDoctor }) {
//   const { doctors } = useDoctors()
//   const [selectedDoctor, setSelectedDoctor] = useState(null)

//   const handleSelectDoctor = (doctor) => {
//     setSelectedDoctor(doctor)
//     if (onSelectDoctor) {
//       onSelectDoctor(doctor)
//     }
//   }

//   // Mock data for doctor details
//   const doctorDetails = {
//     availability: [
//       { day: "Monday", hours: "9:00 AM - 5:00 PM" },
//       { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
//       { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
//       { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
//       { day: "Friday", hours: "9:00 AM - 3:00 PM" },
//     ],
//     location: "Medical Center, Floor 3, Room 302",
//     contact: {
//       phone: "+1 (555) 123-4567",
//       email: "doctor@example.com",
//     },
//     rating: 4.8,
//     reviews: 124,
//     about:
//       "Dr. Smith is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. He specializes in preventive cardiology and heart failure management.",
//   }

//   return (
//     <div className="grid md:grid-cols-2 gap-6">
//       <div className="md:border-r md:pr-6">
//         <h3 className="text-lg font-semibold mb-4">Find a Doctor</h3>
//         <DoctorSearch onSelectDoctor={handleSelectDoctor} />
//       </div>

//       <div>
//         {selectedDoctor ? (
//           <div className="space-y-6">
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
//                 {selectedDoctor.name
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")}
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDoctor.name}</h3>
//                 <p className="text-muted-foreground">{selectedDoctor.specialty}</p>
//                 <div className="flex items-center mt-1 text-sm">
//                   <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
//                   <span className="ml-1">{doctorDetails.rating}</span>
//                   <span className="text-muted-foreground ml-1">({doctorDetails.reviews} reviews)</span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h4 className="text-sm font-semibold mb-2">About</h4>
//               <p className="text-sm text-muted-foreground">{doctorDetails.about}</p>
//             </div>

//             <div>
//               <h4 className="text-sm font-semibold mb-2">Availability</h4>
//               <div className="space-y-1">
//                 {doctorDetails.availability.map((slot, index) => (
//                   <div key={index} className="flex text-sm">
//                     <span className="w-24 font-medium">{slot.day}:</span>
//                     <span className="text-muted-foreground">{slot.hours}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-start gap-2 text-sm">
//                 <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
//                 <span>{doctorDetails.location}</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <Phone className="h-4 w-4 text-muted-foreground" />
//                 <span>{doctorDetails.contact.phone}</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <Mail className="h-4 w-4 text-muted-foreground" />
//                 <span>{doctorDetails.contact.email}</span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <Button onClick={() => onSelectDoctor(selectedDoctor)} className="w-full">
//                 <Calendar className="mr-2 h-4 w-4" />
//                 Book Appointment
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center h-full py-12 text-center">
//             <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
//               <Calendar className="h-8 w-8 text-muted-foreground" />
//             </div>
//             <h3 className="text-lg font-medium mb-2">No Doctor Selected</h3>
//             <p className="text-sm text-muted-foreground mb-6">
//               Please select a doctor from the list to view their details and schedule an appointment.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { useDoctors } from "@/context/DoctorContext"
import DoctorSearch from "@/components/DoctorSearch"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Phone, Mail, Star, Clock } from "lucide-react"

export default function DoctorTab({ onSelectDoctor }) {
  const { doctors } = useDoctors()
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor)
    if (onSelectDoctor) {
      onSelectDoctor(doctor)
    }
  }

  // Mock data for doctor details
  const getDoctorDetails = (doctor) => ({
    availability: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 3:00 PM" },
    ],
    location: "Medical Center, Floor 3, Room 302",
    contact: {
      phone: "+1 (555) 123-4567",
      email: `${doctor?.name?.split(" ")[1]?.toLowerCase() || "doctor"}@medica.com`,
    },
    rating: 4.8,
    reviews: 124,
    about: `${doctor?.name || "Our doctor"} is a board-certified ${doctor?.specialty?.toLowerCase() || "specialist"} with over 15 years of experience. ${doctor?.name?.split(" ")[0] || "They"} specializes in preventive care and comprehensive treatment approaches.`,
  })

  const doctorDetails = selectedDoctor ? getDoctorDetails(selectedDoctor) : null

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="md:border-r md:pr-6">
        <h3 className="text-lg font-semibold mb-4 text-teal-700 dark:text-teal-400">Find a Doctor</h3>
        <DoctorSearch onSelectDoctor={handleSelectDoctor} />
      </div>

      <div>
        {selectedDoctor ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-400 flex items-center justify-center text-white font-bold text-xl shadow-md">
                {selectedDoctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h3 className="text-xl font-bold text-teal-700 dark:text-teal-400">{selectedDoctor.name}</h3>
                <p className="text-teal-600/70 dark:text-teal-300/70">{selectedDoctor.specialty}</p>
                <div className="flex items-center mt-1 text-sm">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(doctorDetails.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-1 font-medium">{doctorDetails.rating}</span>
                  <span className="text-muted-foreground ml-1">({doctorDetails.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 p-4 rounded-lg">
              <h4 className="text-sm font-semibold mb-2 text-teal-700 dark:text-teal-400">About</h4>
              <p className="text-sm text-teal-700/80 dark:text-teal-300/80">{doctorDetails.about}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-teal-100 dark:border-teal-900">
              <h4 className="text-sm font-semibold mb-2 flex items-center text-teal-700 dark:text-teal-400">
                <Clock className="h-4 w-4 mr-1" /> Availability
              </h4>
              <div className="space-y-1">
                {doctorDetails.availability.map((slot, index) => (
                  <div key={index} className="flex text-sm">
                    <span className="w-24 font-medium text-teal-600 dark:text-teal-400">{slot.day}:</span>
                    <span className="text-teal-600/70 dark:text-teal-300/70">{slot.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-teal-500" />
                <span className="text-teal-700 dark:text-teal-300">{doctorDetails.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-teal-500" />
                <span className="text-teal-700 dark:text-teal-300">{doctorDetails.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-teal-500" />
                <span className="text-teal-700 dark:text-teal-300">{doctorDetails.contact.email}</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={() => onSelectDoctor(selectedDoctor)}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-teal-500" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-teal-700 dark:text-teal-400">No Doctor Selected</h3>
            <p className="text-sm text-teal-600/70 dark:text-teal-300/70 mb-6">
              Please select a doctor from the list to view their details and schedule an appointment.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
