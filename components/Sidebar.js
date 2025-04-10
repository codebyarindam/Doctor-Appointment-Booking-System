"use client"

import { useState } from "react"
import Link from "next/link"
import { LayoutDashboard, Calendar, Users, FileText, MessageSquare, Settings, LogOut, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen)
  }

  const menuItems = [
    { name: "Overview", icon: <LayoutDashboard className="w-5 h-5" />, href: "#", active: false },
    { name: "Appointments", icon: <Calendar className="w-5 h-5" />, href: "#", active: true },
    { name: "Doctors", icon: <Users className="w-5 h-5" />, href: "#", active: false },
    { name: "Pathology Results", icon: <FileText className="w-5 h-5" />, href: "#", active: false },
    { name: "Chats", icon: <MessageSquare className="w-5 h-5" />, href: "#", active: false, badge: 2 },
  ]

  const accountItems = [
    { name: "Settings", icon: <Settings className="w-5 h-5" />, href: "#" },
    { name: "Logout", icon: <LogOut className="w-5 h-5" />, href: "#" },
  ]

  const SidebarContent = () => (
    <>
      <div className="p-4 flex items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.003-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
          <span className="text-xl font-bold">Capricon Technology</span>
        </div>
        <button className="ml-auto md:hidden" onClick={toggleMobile}>
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="px-3 py-2">
        <p className="px-4 text-xs font-medium text-muted-foreground mb-2">MENU</p>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className={cn("sidebar-item", item.active && "active")}>
              {item.icon}
              <span>{item.name}</span>
              {item.badge && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto px-3 py-2">
        <p className="px-4 text-xs font-medium text-muted-foreground mb-2">ACCOUNT</p>
        <nav className="space-y-1">
          {accountItems.map((item) => (
            <Link key={item.name} href={item.href} className="sidebar-item">
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 mt-2 bg-primary/5 mx-3 rounded-lg">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium">Emergency Hotlines:</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          <p>+234 90 123 4567</p>
          <p>+234 80 987 6543</p>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-40 md:hidden bg-background rounded-md p-2 shadow-md"
        onClick={toggleMobile}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-background/80 backdrop-blur-sm transition-opacity md:hidden",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={toggleMobile}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card flex flex-col border-r transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
