"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Home, CreditCard, Smartphone, CheckCircle2 } from "lucide-react"
import { createBooking } from "@/app/actions/bookings"
import { processPayment } from "@/app/actions/payments"

type Step = "welcome" | "duration" | "datetime" | "info" | "payment" | "complete"

export default function KioskPage() {
  const [step, setStep] = useState<Step>("welcome")
  const [duration, setDuration] = useState("60")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeSlot, setTimeSlot] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [bookingId, setBookingId] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

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

  const handleCreateBooking = async () => {
    if (!date || !timeSlot || !name || !phone) {
      return
    }

    setIsProcessing(true)

    const result = await createBooking({
      date: date.toISOString().split("T")[0],
      time_slot: timeSlot,
      duration: Number.parseInt(duration),
      name,
      phone,
      email: email || `${phone}@temp.com`,
      amount: prices[duration as keyof typeof prices],
    })

    setIsProcessing(false)

    if (result.error) {
      alert(result.error)
    } else if (result.bookingId) {
      setBookingId(result.bookingId)
      setStep("payment")
    }
  }

  const handlePayment = async (method: string) => {
    if (!bookingId) return

    setIsProcessing(true)

    const { IMP } = window as any
    if (!IMP) {
      alert("결제 모듈을 불러올 수 없습니다")
      setIsProcessing(false)
      return
    }

    IMP.init(process.env.NEXT_PUBLIC_PORTONE_MERCHANT_ID || "imp00000000")

    const paymentData = {
      pg: method === "card" ? "html5_inicis" : "danal_tpay",
      pay_method: method === "card" ? "card" : "phone",
      merchant_uid: `kiosk_${bookingId}_${Date.now()}`,
      name: `효소방 예약 - ${duration}분`,
      amount: prices[duration as keyof typeof prices],
      buyer_name: name,
      buyer_tel: phone,
      buyer_email: email || `${phone}@temp.com`,
    }

    IMP.request_pay(paymentData, async (response: any) => {
      if (response.success) {
        const result = await processPayment(bookingId, method, response.imp_uid, response.merchant_uid)

        setIsProcessing(false)

        if (result.error) {
          alert(result.error)
        } else {
          setStep("complete")
          setTimeout(() => {
            resetKiosk()
          }, 5000)
        }
      } else {
        setIsProcessing(false)
        alert(response.error_msg || "결제에 실패했습니다")
      }
    })
  }

  const resetKiosk = () => {
    setStep("welcome")
    setDuration("60")
    setDate(new Date())
    setTimeSlot("")
    setName("")
    setPhone("")
    setEmail("")
    setBookingId("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Welcome Screen */}
        {step === "welcome" && (
          <Card className="text-center shadow-2xl">
            <CardHeader className="space-y-6 py-12">
              <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Home className="w-12 h-12 text-primary" />
              </div>
              <div>
                <CardTitle className="text-5xl mb-4">효소방에 오신 것을 환영합니다</CardTitle>
                <CardDescription className="text-xl">화면을 터치하여 예약을 시작하세요</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-12">
              <Button size="lg" className="text-2xl h-20 px-16" onClick={() => setStep("duration")}>
                예약 시작하기
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Duration Selection */}
        {step === "duration" && (
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-4xl">이용 시간을 선택하세요</CardTitle>
              <CardDescription className="text-lg">원하시는 이용 시간을 선택해주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={duration} onValueChange={setDuration}>
                <div className="flex items-center space-x-4 p-6 border-2 rounded-xl hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="30" id="kiosk-30" className="w-6 h-6" />
                  <Label htmlFor="kiosk-30" className="flex-1 cursor-pointer text-2xl">
                    <div className="font-semibold">30분</div>
                    <div className="text-lg text-muted-foreground">₩25,000</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-4 p-6 border-2 rounded-xl hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="60" id="kiosk-60" className="w-6 h-6" />
                  <Label htmlFor="kiosk-60" className="flex-1 cursor-pointer text-2xl">
                    <div className="font-semibold">60분 (추천)</div>
                    <div className="text-lg text-muted-foreground">₩40,000</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-4 p-6 border-2 rounded-xl hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="90" id="kiosk-90" className="w-6 h-6" />
                  <Label htmlFor="kiosk-90" className="flex-1 cursor-pointer text-2xl">
                    <div className="font-semibold">90분</div>
                    <div className="text-lg text-muted-foreground">₩55,000</div>
                  </Label>
                </div>
              </RadioGroup>

              <div className="flex gap-4 pt-6">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 h-16 text-xl bg-transparent"
                  onClick={() => setStep("welcome")}
                >
                  이전
                </Button>
                <Button size="lg" className="flex-1 h-16 text-xl" onClick={() => setStep("datetime")}>
                  다음
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Date & Time Selection */}
        {step === "datetime" && (
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-4xl">날짜와 시간을 선택하세요</CardTitle>
              <CardDescription className="text-lg">방문하실 날짜와 시간을 선택해주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-xl mb-4 block">날짜 선택</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border scale-125 mx-auto"
                />
              </div>

              <div>
                <Label className="text-xl mb-4 block">시간 선택</Label>
                <div className="grid grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={timeSlot === slot ? "default" : "outline"}
                      onClick={() => setTimeSlot(slot)}
                      className="h-16 text-xl"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 h-16 text-xl bg-transparent"
                  onClick={() => setStep("duration")}
                >
                  이전
                </Button>
                <Button
                  size="lg"
                  className="flex-1 h-16 text-xl"
                  onClick={() => setStep("info")}
                  disabled={!date || !timeSlot}
                >
                  다음
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Customer Info */}
        {step === "info" && (
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-4xl">고객 정보를 입력하세요</CardTitle>
              <CardDescription className="text-lg">예약 확인을 위한 정보를 입력해주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="kiosk-name" className="text-xl mb-2 block">
                    이름 *
                  </Label>
                  <Input
                    id="kiosk-name"
                    placeholder="홍길동"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-16 text-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="kiosk-phone" className="text-xl mb-2 block">
                    연락처 *
                  </Label>
                  <Input
                    id="kiosk-phone"
                    type="tel"
                    placeholder="010-1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-16 text-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="kiosk-email" className="text-xl mb-2 block">
                    이메일 (선택)
                  </Label>
                  <Input
                    id="kiosk-email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-16 text-xl"
                  />
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg space-y-2">
                <div className="flex justify-between text-lg">
                  <span>이용 시간</span>
                  <span className="font-semibold">{duration}분</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>날짜</span>
                  <span className="font-semibold">{date?.toLocaleDateString("ko-KR")}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>시간</span>
                  <span className="font-semibold">{timeSlot}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>총 금액</span>
                    <span className="text-primary">₩{prices[duration as keyof typeof prices].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 h-16 text-xl bg-transparent"
                  onClick={() => setStep("datetime")}
                >
                  이전
                </Button>
                <Button
                  size="lg"
                  className="flex-1 h-16 text-xl"
                  onClick={handleCreateBooking}
                  disabled={!name || !phone || isProcessing}
                >
                  {isProcessing ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : null}
                  {isProcessing ? "처리 중..." : "다음"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment */}
        {step === "payment" && (
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-4xl">결제 방법을 선택하세요</CardTitle>
              <CardDescription className="text-lg">원하시는 결제 방법을 선택해주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg">
                <div className="flex justify-between text-2xl font-bold">
                  <span>결제 금액</span>
                  <span className="text-primary">₩{prices[duration as keyof typeof prices].toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full h-24 text-2xl"
                  onClick={() => handlePayment("card")}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="mr-3 h-8 w-8 animate-spin" />
                  ) : (
                    <CreditCard className="mr-3 h-8 w-8" />
                  )}
                  카드 결제
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-24 text-2xl bg-transparent"
                  onClick={() => handlePayment("mobile")}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="mr-3 h-8 w-8 animate-spin" />
                  ) : (
                    <Smartphone className="mr-3 h-8 w-8" />
                  )}
                  모바일 결제
                </Button>
              </div>

              <Button
                size="lg"
                variant="ghost"
                className="w-full h-16 text-xl"
                onClick={() => setStep("info")}
                disabled={isProcessing}
              >
                취소
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Complete */}
        {step === "complete" && (
          <Card className="text-center shadow-2xl">
            <CardHeader className="space-y-6 py-12">
              <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
              <div>
                <CardTitle className="text-5xl mb-4">결제가 완료되었습니다!</CardTitle>
                <CardDescription className="text-xl">예약이 확정되었습니다</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-12 space-y-6">
              <div className="bg-muted/50 p-8 rounded-lg space-y-3 text-left max-w-md mx-auto">
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">예약 번호</span>
                  <span className="font-semibold">{bookingId.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">날짜</span>
                  <span className="font-semibold">{date?.toLocaleDateString("ko-KR")}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">시간</span>
                  <span className="font-semibold">{timeSlot}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">이용 시간</span>
                  <span className="font-semibold">{duration}분</span>
                </div>
              </div>

              <p className="text-xl text-muted-foreground">편안한 시간 되세요!</p>
              <p className="text-lg text-muted-foreground">5초 후 자동으로 처음 화면으로 돌아갑니다</p>

              <Button size="lg" className="text-xl h-16 px-12" onClick={resetKiosk}>
                처음으로
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
