// import { Inter } from "next/font/google"
// import "./globals.css"
// import { AppointmentProvider } from "@/context/AppointmentContext"
// import { ThemeProvider } from "@/context/ThemeContext"
// import { DoctorProvider } from "@/context/DoctorContext"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
//   title: "Doctor Appointment System",
//   description: "Book and manage doctor appointments",
//     generator: 'v0.dev'
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider>
//           <DoctorProvider>
//             <AppointmentProvider>{children}</AppointmentProvider>
//           </DoctorProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }


// import './globals.css'

import { Inter } from "next/font/google"
import "./globals.css"
import { AppointmentProvider } from "@/context/AppointmentContext"
import { ThemeProvider } from "@/context/ThemeContext"
import { DoctorProvider } from "@/context/DoctorContext"
import ErrorBoundary from "@/components/ErrorBoundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Doctor Appointment System",
  description: "Book and manage doctor appointments",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <DoctorProvider>
            <AppointmentProvider>
              <ErrorBoundary>{children}</ErrorBoundary>
            </AppointmentProvider>
          </DoctorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
