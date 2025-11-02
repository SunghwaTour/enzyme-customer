"use server"

import { payments, bookings } from "@/lib/storage"
import { revalidatePath } from "next/cache"

export async function verifyPortOnePayment(impUid: string, merchantUid: string, amount: number) {
  // In production, verify the payment with PortOne API
  // This is a server-side verification to prevent tampering

  try {
    // TODO: Add actual PortOne API verification
    // const response = await fetch('https://api.iamport.kr/payments/' + impUid, {
    //   headers: { 'Authorization': process.env.PORTONE_API_KEY }
    // })

    // For now, simulate successful verification
    return { success: true, verified: true }
  } catch (error) {
    return { success: false, error: "결제 검증에 실패했습니다" }
  }
}

export async function processPayment(bookingId: string, paymentMethod: string, impUid?: string, merchantUid?: string) {
  const payment = payments.getByBooking(bookingId)

  if (!payment) {
    return { error: "결제 정보를 찾을 수 없습니다" }
  }

  if (impUid && merchantUid) {
    const verification = await verifyPortOnePayment(impUid, merchantUid, payment.amount)
    if (!verification.success) {
      return { error: verification.error || "결제 검증에 실패했습니다" }
    }
  }

  const updateResult = payments.update(payment.id, {
    status: "completed",
    payment_method: paymentMethod,
    transaction_id: impUid || undefined,
  })

  if (updateResult.error) {
    return { error: "결제 처리에 실패했습니다" }
  }

  const bookingUpdateResult = bookings.update(bookingId, { status: "confirmed" })

  if (bookingUpdateResult.error) {
    return { error: "예약 확인에 실패했습니다" }
  }

  revalidatePath("/dashboard")
  revalidatePath("/admin/bookings")
  revalidatePath("/admin/payments")

  return { success: true }
}

export async function cancelPayment(bookingId: string) {
  const payment = payments.getByBooking(bookingId)

  if (!payment) {
    return { error: "결제 정보를 찾을 수 없습니다" }
  }

  const paymentResult = payments.update(payment.id, { status: "refunded" })

  if (paymentResult.error) {
    return { error: "결제 취소에 실패했습니다" }
  }

  const bookingResult = bookings.update(bookingId, { status: "cancelled" })

  if (bookingResult.error) {
    return { error: "예약 취소에 실패했습니다" }
  }

  revalidatePath("/dashboard")
  revalidatePath("/admin/bookings")
  revalidatePath("/admin/payments")

  return { success: true }
}
