"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, DollarSign, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCurrentUser, logout } from "@/lib/storage"
import type { Booking, Room, Payment } from "@/lib/storage"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [stats, setStats] = useState({
    todayBookings: 0,
    totalBookings: 0,
    totalRevenue: 0,
    availableRooms: 0,
    totalRooms: 0,
  })

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth/login")
      return
    }
    setUser(currentUser)

    const bookingsData = localStorage.getItem("bookings")
    const roomsData = localStorage.getItem("rooms")
    const paymentsData = localStorage.getItem("payments")

    const bookings: Booking[] = bookingsData ? JSON.parse(bookingsData) : []
    const rooms: Room[] = roomsData ? JSON.parse(roomsData) : []
    const payments: Payment[] = paymentsData ? JSON.parse(paymentsData) : []

    const today = new Date().toISOString().split("T")[0]
    const todayBookings = bookings.filter((b) => b.booking_date === today)
    const completedPayments = payments.filter((p) => p.status === "completed")
    const totalRevenue = completedPayments.reduce((sum, p) => sum + Number(p.amount), 0)
    const availableRooms = rooms.filter((r) => r.status === "available").length

    setStats({
      todayBookings: todayBookings.length,
      totalBookings: bookings.length,
      totalRevenue,
      availableRooms,
      totalRooms: rooms.length,
    })
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin" className="text-2xl font-semibold text-primary">
            효소방 관리자
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">대시보드</h1>
          <p className="text-muted-foreground">효소방 운영 현황을 한눈에 확인하세요</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">오늘 예약</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.todayBookings}</div>
              <p className="text-xs text-muted-foreground mt-1">건</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">전체 예약</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground mt-1">건</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">총 매출</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₩{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">누적</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">이용 가능 룸</CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.availableRooms}</div>
              <p className="text-xs text-muted-foreground mt-1">/ {stats.totalRooms} 룸</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/admin/bookings">
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>예약 관리</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">예약 내역을 확인하고 관리합니다</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/rooms">
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>룸 관리</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">룸 상태를 확인하고 관리합니다</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/payments">
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>결제 관리</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">결제 내역을 확인하고 관리합니다</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
