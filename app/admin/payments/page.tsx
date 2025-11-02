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
import type { Payment, Booking } from "@/lib/storage"

type PaymentWithBooking = Payment & {
  booking?: Booking
}

export default function AdminPaymentsPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [payments, setPayments] = useState<PaymentWithBooking[]>([])
  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth/login")
      return
    }
    setUser(currentUser)

    const paymentsData = localStorage.getItem("payments")
    const bookingsData = localStorage.getItem("bookings")

    const paymentsList: Payment[] = paymentsData ? JSON.parse(paymentsData) : []
    const bookingsList: Booking[] = bookingsData ? JSON.parse(bookingsData) : []

    // Join payments with bookings
    const paymentsWithBookings = paymentsList.map((payment) => ({
      ...payment,
      booking: bookingsList.find((b) => b.id === payment.booking_id),
    }))

    // Sort by created date
    paymentsWithBookings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    setPayments(paymentsWithBookings)

    // Calculate total revenue
    const revenue = paymentsList
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + Number(p.amount), 0)
    setTotalRevenue(revenue)
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      completed: "default",
      failed: "destructive",
      refunded: "outline",
    }
    return variants[status] || "default"
  }

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      pending: "대기중",
      completed: "완료",
      failed: "실패",
      refunded: "환불",
    }
    return texts[status] || status
  }

  const getMethodText = (method: string) => {
    const texts: Record<string, string> = {
      card: "카드",
      cash: "현금",
      kiosk: "키오스크",
    }
    return texts[method] || method
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
          <h1 className="text-3xl font-bold mb-2">결제 관리</h1>
          <p className="text-muted-foreground">결제 내역을 확인하고 관리합니다</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>총 매출</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">₩{totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-2">완료된 결제 기준</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>결제 내역</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>결제일시</TableHead>
                  <TableHead>고객명</TableHead>
                  <TableHead>예약일</TableHead>
                  <TableHead>결제 방법</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>거래 ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{new Date(payment.created_at).toLocaleString("ko-KR")}</TableCell>
                      <TableCell>{payment.booking?.customer_name || "-"}</TableCell>
                      <TableCell>
                        {payment.booking?.booking_date
                          ? new Date(payment.booking.booking_date).toLocaleDateString("ko-KR")
                          : "-"}
                      </TableCell>
                      <TableCell>{getMethodText(payment.payment_method)}</TableCell>
                      <TableCell className="font-medium">₩{Number(payment.amount).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(payment.status)}>
                          {getStatusText(payment.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{payment.transaction_id || "-"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      결제 내역이 없습니다
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
