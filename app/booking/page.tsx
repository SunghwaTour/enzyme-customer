"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Loader2 } from "lucide-react"
import { createBooking } from "@/app/actions/bookings"
import { useToast } from "@/hooks/use-toast"

export default function BookingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [duration, setDuration] = useState("60")
  const [timeSlot, setTimeSlot] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ]

  const prices = {
    "30": 25000,
    "60": 40000,
    "90": 55000,
  }

  const handleSubmit = async () => {
    if (!date || !timeSlot || !name || !phone || !email) {
      toast({
        title: "입력 오류",
        description: "모든 필드를 입력해주세요",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    const result = await createBooking({
      date: date.toISOString().split("T")[0],
      time_slot: timeSlot,
      duration: Number.parseInt(duration),
      name,
      phone,
      email,
      amount: prices[duration as keyof typeof prices],
    })

    setIsSubmitting(false)

    if (result.error) {
      toast({
        title: "예약 실패",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "예약 완료",
        description: "예약이 성공적으로 완료되었습니다",
      })
      router.push(`/booking/confirmation?id=${result.bookingId}`)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-primary">
            효소방
          </Link>
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              로그인
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" />
          홈으로 돌아가기
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">예약하기</h1>
          <p className="text-muted-foreground mb-8">원하는 날짜와 시간을 선택하세요</p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>이용 시간 선택</CardTitle>
                  <CardDescription>원하는 이용 시간을 선택하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={duration} onValueChange={setDuration}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                      <RadioGroupItem value="30" id="30" />
                      <Label htmlFor="30" className="flex-1 cursor-pointer">
                        <div className="font-semibold">30분</div>
                        <div className="text-sm text-muted-foreground">₩25,000</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                      <RadioGroupItem value="60" id="60" />
                      <Label htmlFor="60" className="flex-1 cursor-pointer">
                        <div className="font-semibold">60분 (인기)</div>
                        <div className="text-sm text-muted-foreground">₩40,000</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                      <RadioGroupItem value="90" id="90" />
                      <Label htmlFor="90" className="flex-1 cursor-pointer">
                        <div className="font-semibold">90분</div>
                        <div className="text-sm text-muted-foreground">₩55,000</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>날짜 선택</CardTitle>
                  <CardDescription>방문하실 날짜를 선택하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>시간 선택</CardTitle>
                  <CardDescription>이용 시작 시간을 선택하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={timeSlot === slot ? "default" : "outline"}
                        onClick={() => setTimeSlot(slot)}
                        className="w-full"
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>예약 정보</CardTitle>
                  <CardDescription>선택하신 예약 내용을 확인하세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">이용 시간</span>
                      <span className="font-medium">{duration}분</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">날짜</span>
                      <span className="font-medium">{date?.toLocaleDateString("ko-KR")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">시간</span>
                      <span className="font-medium">{timeSlot || "선택 안 됨"}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>총 금액</span>
                      <span className="text-primary">₩{prices[duration as keyof typeof prices].toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">이름</Label>
                      <Input id="name" placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">연락처</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="010-1234-5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!date || !timeSlot || !name || !phone || !email || isSubmitting}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        처리 중...
                      </>
                    ) : (
                      "예약 완료하기"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">예약 완료 후 결제 페이지로 이동합니다</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
