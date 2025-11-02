"use server"

import { auth, bookings, rooms, payments } from "@/lib/storage"
import { revalidatePath } from "next/cache"

export async function createBooking(formData: {
  date: string
  time_slot: string
  duration: number
  name: string
  phone: string
  email: string
  amount: number
}) {
  const { user } = auth.getUser()

  if (!user) {
    return { error: "인증이 필요합니다" }
  }

  const availableRooms = rooms.getAvailable()

  if (availableRooms.length === 0) {
    return { error: "사용 가능한 방이 없습니다" }
  }

  const room = availableRooms[0]

  const { booking } = bookings.create({
    user_id: user.id,
    room_id: room.id,
    booking_date: formData.date,
    time_slot: formData.time_slot,
    duration: formData.duration,
    status: "pending",
    customer_name: formData.name,
    customer_phone: formData.phone,
    customer_email: formData.email,
    total_amount: formData.amount,
  })

  if (!booking) {
    return { error: "예약 생성에 실패했습니다" }
  }

  const paymentResult = payments.create({
    booking_id: booking.id,
    amount: formData.amount,
    status: "pending",
    payment_method: "card",
  })

  if (!paymentResult.payment) {
    // Rollback booking if payment creation fails
    bookings.delete(booking.id)
    return { error: "결제 정보 생성에 실패했습니다" }
  }

  revalidatePath("/dashboard")
  revalidatePath("/admin/bookings")

  return { success: true, bookingId: booking.id }
}

export async function getAvailableRooms(date: string, timeSlot: string) {
  const allRooms = rooms.getAvailable()

  const existingBookings = bookings.getByDateAndTime(date, timeSlot)

  const bookedRoomIds = existingBookings.map((b) => b.room_id)
  const availableRooms = allRooms.filter((room) => !bookedRoomIds.includes(room.id))

  return availableRooms.length
}
