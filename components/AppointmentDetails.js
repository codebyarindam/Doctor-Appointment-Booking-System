"use client"

import { X, Edit2, Trash2, Clock, User, Phone, Mail, FileText, UserIcon as UserMd } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/date-utils"
import { useAppointments } from "@/context/AppointmentContext"
import { useDoctors } from "@/context/DoctorContext"
import { useToast } from "@/components/ui/use-toast"
import { getAppointmentColor } from "@/lib/date-utils"
import { cn } from "@/lib/utils"

export default function AppointmentDetails({ isOpen, onClose, appointment, onEdit }) {
  const { deleteAppointment } = useAppointments()
  const { doctors } = useDoctors()
  const { toast } = useToast()

  if (!isOpen || !appointment) return null

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      deleteAppointment(appointment.id)
      toast({
        title: "Appointment Deleted",
        description: "Your appointment has been successfully deleted.",
      })
      onClose()
    }
  }

  const getAppointmentTypeName = (type) => {
    const types = {
      routine: "Routine Checkup",
      emergency: "Emergency",
      examination: "Examination",
      consultation: "Consultation",
      sick: "Sick Visit",
    }
    return types[type] || type
  }

  const getDoctor = (doctorId) => {
    return doctors.find((d) => d.id === doctorId)
  }

  const doctor = appointment.doctorId ? getDoctor(appointment.doctorId) : null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Appointment Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          {/* Appointment type badge */}
          <div
            className={cn(
              "inline-block px-3 py-1 rounded-full text-sm font-medium mb-4",
              getAppointmentColor(appointment.type),
            )}
          >
            {getAppointmentTypeName(appointment.type)}
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Date & Time</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(appointment.date)} at {appointment.time}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Patient</p>
                <p className="text-sm text-muted-foreground">{appointment.name}</p>
              </div>
            </div>

            {doctor && (
              <div className="flex items-start gap-3">
                <UserMd className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Doctor</p>
                  <p className="text-sm text-muted-foreground">
                    {doctor.name} - {doctor.specialty}
                  </p>
                </div>
              </div>
            )}

            {appointment.phone && (
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                </div>
              </div>
            )}

            {appointment.email && (
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{appointment.email}</p>
                </div>
              </div>
            )}

            {appointment.reason && (
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Reason for Visit</p>
                  <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="secondary" onClick={() => onEdit(appointment)} className="flex items-center gap-1">
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" onClick={handleDelete} className="flex items-center gap-1">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
