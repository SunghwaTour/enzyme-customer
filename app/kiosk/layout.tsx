import type React from "react"
export default function KioskLayout({ children }: { children: React.ReactNode }) {
  return <div className="kiosk-mode">{children}</div>
}
