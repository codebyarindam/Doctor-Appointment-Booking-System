// "use client"

// import { useState, useMemo } from "react"
// import { Search, Filter } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { useDoctors } from "@/context/DoctorContext"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// export default function DoctorSearch({ onSelectDoctor }) {
//   const { doctors } = useDoctors()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [specialty, setSpecialty] = useState("")
//   const [showFilters, setShowFilters] = useState(false)

//   // Get unique specialties for filter dropdown
//   const specialties = useMemo(() => {
//     const uniqueSpecialties = new Set(doctors.map((doctor) => doctor.specialty))
//     return Array.from(uniqueSpecialties)
//   }, [doctors])

//   // Filter doctors based on search term and specialty
//   const filteredDoctors = useMemo(() => {
//     return doctors.filter((doctor) => {
//       const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
//       const matchesSpecialty = !specialty || doctor.specialty === specialty
//       return matchesSearch && matchesSpecialty
//     })
//   }, [doctors, searchTerm, specialty])

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value)
//   }

//   const handleSpecialtyChange = (value) => {
//     setSpecialty(value)
//   }

//   const clearFilters = () => {
//     setSearchTerm("")
//     setSpecialty("")
//   }

//   return (
//     <div className="w-full space-y-4">
//       <div className="flex items-center gap-2">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//           <Input
//             type="text"
//             placeholder="Search doctors by name..."
//             value={searchTerm}
//             onChange={handleSearch}
//             className="pl-10"
//           />
//         </div>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setShowFilters(!showFilters)}
//           className={showFilters ? "bg-primary/10" : ""}
//         >
//           <Filter className="h-4 w-4" />
//         </Button>
//       </div>

//       {/* Filters */}
//       {showFilters && (
//         <div className="p-4 bg-muted/30 rounded-md space-y-4">
//           <div className="space-y-2">
//             <label className="text-sm font-medium">Specialty</label>
//             <Select value={specialty} onValueChange={handleSpecialtyChange}>
//               <SelectTrigger>
//                 <SelectValue placeholder="All specialties" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All specialties</SelectItem>
//                 {specialties.map((spec) => (
//                   <SelectItem key={spec} value={spec}>
//                     {spec}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="flex justify-end">
//             <Button variant="ghost" size="sm" onClick={clearFilters}>
//               Clear filters
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Doctor list */}
//       {filteredDoctors.length > 0 ? (
//         <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
//           {filteredDoctors.map((doctor) => (
//             <div
//               key={doctor.id}
//               className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
//               onClick={() => onSelectDoctor(doctor)}
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
//                   {doctor.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </div>
//                 <div>
//                   <p className="font-medium">{doctor.name}</p>
//                   <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-8 text-muted-foreground">No doctors found matching your criteria</div>
//       )}
//     </div>
//   )
// }
"use client"

import { useState, useMemo } from "react"
import { Search, Filter, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDoctors } from "@/context/DoctorContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function DoctorSearch({ onSelectDoctor }) {
  const { doctors } = useDoctors()
  const [searchTerm, setSearchTerm] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Get unique specialties for filter dropdown
  const specialties = useMemo(() => {
    const uniqueSpecialties = new Set(doctors.map((doctor) => doctor.specialty))
    return Array.from(uniqueSpecialties)
  }, [doctors])

  // Filter doctors based on search term and specialty
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSpecialty = !specialty || doctor.specialty === specialty
      return matchesSearch && matchesSpecialty
    })
  }, [doctors, searchTerm, specialty])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSpecialtyChange = (value) => {
    setSpecialty(value === "all" ? "" : value)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSpecialty("")
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search doctors by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 border-teal-200 dark:border-teal-800 focus-visible:ring-teal-500"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={`border-teal-200 dark:border-teal-800 ${showFilters ? "bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300" : ""}`}
        >
          <Filter className="h-4 w-4 text-teal-500" />
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 rounded-md space-y-4 border border-teal-100 dark:border-teal-900">
          <div className="space-y-2">
            <label className="text-sm font-medium text-teal-700 dark:text-teal-400">Specialty</label>
            <Select value={specialty || "all"} onValueChange={handleSpecialtyChange}>
              <SelectTrigger className="border-teal-200 dark:border-teal-800 focus:ring-teal-500">
                <SelectValue placeholder="All specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All specialties</SelectItem>
                {specialties.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            {specialty && (
              <Badge
                variant="outline"
                className="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800"
              >
                {specialty}{" "}
                <span className="ml-1 cursor-pointer" onClick={() => setSpecialty("")}>
                  ×
                </span>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-teal-600 dark:text-teal-400 hover:text-teal-700 hover:bg-teal-100 dark:hover:bg-teal-900/50"
            >
              Clear filters
            </Button>
          </div>
        </div>
      )}

      {/* Doctor list */}
      {filteredDoctors.length > 0 ? (
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-teal-200 dark:scrollbar-thumb-teal-800">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="p-3 border border-teal-100 dark:border-teal-900 rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/30 cursor-pointer transition-colors group"
              onClick={() => onSelectDoctor(doctor)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-sm">
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-teal-700 dark:text-teal-400">{doctor.name}</p>
                  <p className="text-sm text-teal-600/70 dark:text-teal-300/70">{doctor.specialty}</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-teal-600/70 dark:text-teal-300/70 bg-teal-50/50 dark:bg-teal-900/20 rounded-md">
          No doctors found matching your criteria
        </div>
      )}
    </div>
  )
}
