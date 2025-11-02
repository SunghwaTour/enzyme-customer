"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth, bookings } from "@/lib/storage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userBookings, setUserBookings] = useState<any[]>([])

  useEffect(() => {
    const { user: currentUser } = auth.getUser()

    if (!currentUser) {
      router.push("/auth/login")
      return
    }

    setUser(currentUser)

    const bookingsList = bookings.getByUser(currentUser.id)
    setUserBookings(bookingsList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
  }, [router])

  const handleSignOut = () => {
    auth.signOut()
    router.push("/")
    router.refresh()
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
          <Link href="/" className="text-2xl font-semibold text-primary">
            효소방
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">내 예약</h1>
          <p className="text-muted-foreground">예약 내역을 확인하고 관리하세요</p>
        </div>

        <div className="mb-6">
          <Link href="/booking">
            <Button>새 예약 만들기</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>예약 내역</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>예약 날짜</TableHead>
                  <TableHead>시간</TableHead>
                  <TableHead>룸</TableHead>
                  <TableHead>이용 시간</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userBookings && userBookings.length > 0 ? (
                  userBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{new Date(booking.booking_date).toLocaleDateString("ko-KR")}</TableCell>
                      <TableCell>{booking.time_slot}</TableCell>
                      <TableCell>{booking.rooms?.room_number || "-"}</TableCell>
                      <TableCell>{booking.duration}분</TableCell>
                      <TableCell>₩{Number(booking.total_amount).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(booking.status)}>{getStatusText(booking.status)}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
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
