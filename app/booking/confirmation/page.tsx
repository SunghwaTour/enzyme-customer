"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Loader2, CreditCard, Smartphone } from "lucide-react"
import { processPayment } from "@/app/actions/payments"
import { useToast } from "@/hooks/use-toast"
import { bookings, payments } from "@/lib/storage"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const bookingId = searchParams.get("id")
  const [booking, setBooking] = useState<any>(null)
  const [payment, setPayment] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!bookingId) {
      router.push("/booking")
      return
    }

    const fetchBookingDetails = async () => {
      const bookingData = bookings.getById(bookingId)
      const paymentData = payments.getByBooking(bookingId)

      setBooking(bookingData)
      setPayment(paymentData)
      setIsLoading(false)
    }

    fetchBookingDetails()
  }, [bookingId, router])

  const handlePayment = async (method: string) => {
    if (!bookingId || !payment) return

    setIsProcessing(true)

    // Load PortOne SDK
    const { IMP } = window as any
    if (!IMP) {
      toast({
        title: "결제 오류",
        description: "결제 모듈을 불러올 수 없습니다",
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }

    // Initialize PortOne (replace with your actual merchant ID)
    IMP.init(process.env.NEXT_PUBLIC_PORTONE_MERCHANT_ID || "imp00000000")

    // Prepare payment data
    const paymentData = {
      pg: method === "card" ? "html5_inicis" : "danal_tpay", // Card or mobile payment
      pay_method: method === "card" ? "card" : "phone",
      merchant_uid: `booking_${bookingId}_${Date.now()}`,
      name: `효소방 예약 - ${booking.rooms?.room_number || "Room"}`,
      amount: payment.amount,
      buyer_email: booking.customer_email || "",
      buyer_name: booking.customer_name,
      buyer_tel: booking.customer_phone,
      buyer_addr: "",
      buyer_postcode: "",
    }

    // Request payment
    IMP.request_pay(paymentData, async (response: any) => {
      if (response.success) {
        // Payment successful, verify on server
        const result = await processPayment(bookingId, method, response.imp_uid, response.merchant_uid)

        setIsProcessing(false)

        if (result.error) {
          toast({
            title: "결제 실패",
            description: result.error,
            variant: "destructive",
          })
        } else {
          toast({
            title: "결제 완료",
            description: "결제가 성공적으로 완료되었습니다",
          })
          router.push("/dashboard")
        }
      } else {
        // Payment failed
        setIsProcessing(false)
        toast({
          title: "결제 실패",
          description: response.error_msg || "결제에 실패했습니다",
          variant: "destructive",
        })
      }
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!booking || !payment) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>예약을 찾을 수 없습니다</CardTitle>
            <CardDescription>예약 정보를 불러올 수 없습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/booking">
              <Button className="w-full">다시 예약하기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-primary">
            효소방
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
            <h1 className="text-3xl font-bold">예약이 완료되었습니다!</h1>
            <p className="text-muted-foreground">결제를 진행해주세요</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>예약 정보</CardTitle>
              <CardDescription>예약 번호: {booking.id.slice(0, 8)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">날짜</p>
                  <p className="font-medium">{new Date(booking.booking_date).toLocaleDateString("ko-KR")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">시간</p>
                  <p className="font-medium">{booking.time_slot}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">이용 시간</p>
                  <p className="font-medium">{booking.duration}분</p>
                </div>
                <div>
                  <p className="text-muted-foreground">방 번호</p>
                  <p className="font-medium">{booking.rooms?.room_number || "-"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">이름</p>
                  <p className="font-medium">{booking.customer_name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">연락처</p>
                  <p className="font-medium">{booking.customer_phone}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>결제 금액</span>
                  <span className="text-primary">₩{payment.amount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>결제 방법 선택</CardTitle>
              <CardDescription>원하시는 결제 방법을 선택하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full h-16 text-lg"
                size="lg"
                onClick={() => handlePayment("card")}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <CreditCard className="mr-2 h-5 w-5" />
                )}
                카드 결제
              </Button>
              <Button
                className="w-full h-16 text-lg bg-transparent"
                variant="outline"
                size="lg"
                onClick={() => handlePayment("mobile")}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Smartphone className="mr-2 h-5 w-5" />
                )}
                모바일 결제
              </Button>
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground text-center">
            결제 후 예약이 최종 확정됩니다. 예약 내역은 대시보드에서 확인하실 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-muted/30 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  )
}
