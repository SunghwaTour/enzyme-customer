"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getCurrentUser, logout } from "@/lib/storage"
import type { Booking, Room } from "@/lib/storage"

type BookingWithRoom = Booking & {
  room?: Room
}

export default function AdminBookingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [bookings, setBookings] = useState<BookingWithRoom[]>([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth/login")
      return
    }
    setUser(currentUser)

    const bookingsData = localStorage.getItem("bookings")
    const roomsData = localStorage.getItem("rooms")

    const bookingsList: Booking[] = bookingsData ? JSON.parse(bookingsData) : []
    const roomsList: Room[] = roomsData ? JSON.parse(roomsData) : []

    // Join bookings with rooms
    const bookingsWithRooms = bookingsList.map((booking) => ({
      ...booking,
      room: roomsList.find((r) => r.id === booking.room_id),
    }))

    // Sort by date and time
    bookingsWithRooms.sort((a, b) => {
      const dateCompare = b.booking_date.localeCompare(a.booking_date)
      if (dateCompare !== 0) return dateCompare
      return b.time_slot.localeCompare(a.time_slot)
    })

    setBookings(bookingsWithRooms)
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      confirmed: "default",
      completed: "outline",
      cancelled: "destructive",
    }
    return variants[status] || "default"
  }

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      pending: "대기중",
      confirmed: "확정",
      completed: "완료",
      cancelled: "취소",
    }
    return texts[status] || status
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
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          대시보드로 돌아가기
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">예약 관리</h1>
          <p className="text-muted-foreground">모든 예약 내역을 확인하고 관리합니다</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>예약 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>예약 날짜</TableHead>
                  <TableHead>시간</TableHead>
                  <TableHead>룸</TableHead>
                  <TableHead>고객명</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>이용 시간</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{new Date(booking.booking_date).toLocaleDateString("ko-KR")}</TableCell>
                      <TableCell>{booking.time_slot}</TableCell>
                      <TableCell>{booking.room?.room_number || "-"}</TableCell>
                      <TableCell>{booking.customer_name || "-"}</TableCell>
                      <TableCell>{booking.customer_phone || "-"}</TableCell>
                      <TableCell>{booking.duration}분</TableCell>
                      <TableCell>₩{Number(booking.total_amount).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(booking.status)}>{getStatusText(booking.status)}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground">
                      예약 내역이 없습니다
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
