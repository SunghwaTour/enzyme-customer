export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  created_at: string
}

export interface Room {
  id: string
  room_number: string
  status: "available" | "occupied" | "maintenance"
  created_at: string
}

export interface Booking {
  id: string
  user_id: string | null
  room_id: string
  booking_date: string
  time_slot: string
  duration: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  customer_name: string
  customer_phone: string
  customer_email: string
  total_amount: number
  created_at: string
  rooms?: Room
}

export interface Payment {
  id: string
  booking_id: string
  amount: number
  status: "pending" | "completed" | "failed" | "refunded"
  payment_method: string
  transaction_id?: string
  created_at: string
}

// Initialize default data
const initializeStorage = () => {
  if (typeof window === "undefined") return

  if (!localStorage.getItem("rooms")) {
    const defaultRooms: Room[] = [
      { id: "1", room_number: "Room 1", status: "available", created_at: new Date().toISOString() },
      { id: "2", room_number: "Room 2", status: "available", created_at: new Date().toISOString() },
      { id: "3", room_number: "Room 3", status: "available", created_at: new Date().toISOString() },
      { id: "4", room_number: "Room 4", status: "available", created_at: new Date().toISOString() },
    ]
    localStorage.setItem("rooms", JSON.stringify(defaultRooms))
  }

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]))
  }

  if (!localStorage.getItem("bookings")) {
    localStorage.setItem("bookings", JSON.stringify([]))
  }

  if (!localStorage.getItem("payments")) {
    localStorage.setItem("payments", JSON.stringify([]))
  }
}

// Auth functions
export const auth = {
  signUp: (email: string, password: string, name?: string, phone?: string) => {
    initializeStorage()
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")

    if (users.find((u) => u.email === email)) {
      return { error: "이미 존재하는 이메일입니다" }
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      name,
      phone,
      created_at: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem(
      "passwords",
      JSON.stringify({ ...JSON.parse(localStorage.getItem("passwords") || "{}"), [email]: password }),
    )
    localStorage.setItem("currentUser", JSON.stringify(newUser))

    return { user: newUser }
  },

  signIn: (email: string, password: string) => {
    initializeStorage()
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")
    const passwords = JSON.parse(localStorage.getItem("passwords") || "{}")

    const user = users.find((u) => u.email === email)
    if (!user || passwords[email] !== password) {
      return { error: "이메일 또는 비밀번호가 올바르지 않습니다" }
    }

    localStorage.setItem("currentUser", JSON.stringify(user))
    return { user }
  },

  signOut: () => {
    localStorage.removeItem("currentUser")
    return { success: true }
  },

  getUser: () => {
    initializeStorage()
    const userStr = localStorage.getItem("currentUser")
    if (!userStr) return { user: null }
    return { user: JSON.parse(userStr) as User }
  },
}

// Rooms functions
export const rooms = {
  getAll: () => {
    initializeStorage()
    return JSON.parse(localStorage.getItem("rooms") || "[]") as Room[]
  },

  getAvailable: () => {
    initializeStorage()
    const allRooms = JSON.parse(localStorage.getItem("rooms") || "[]") as Room[]
    return allRooms.filter((r) => r.status === "available")
  },

  update: (id: string, updates: Partial<Room>) => {
    initializeStorage()
    const allRooms = JSON.parse(localStorage.getItem("rooms") || "[]") as Room[]
    const index = allRooms.findIndex((r) => r.id === id)
    if (index !== -1) {
      allRooms[index] = { ...allRooms[index], ...updates }
      localStorage.setItem("rooms", JSON.stringify(allRooms))
      return { success: true }
    }
    return { error: "Room not found" }
  },
}

// Bookings functions
export const bookings = {
  create: (booking: Omit<Booking, "id" | "created_at">) => {
    initializeStorage()
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]") as Booking[]
    const newBooking: Booking = {
      ...booking,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    }
    allBookings.push(newBooking)
    localStorage.setItem("bookings", JSON.stringify(allBookings))
    return { booking: newBooking }
  },

  getAll: () => {
    initializeStorage()
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]") as Booking[]
    const allRooms = rooms.getAll()

    return allBookings.map((booking) => ({
      ...booking,
      rooms: allRooms.find((r) => r.id === booking.room_id),
    }))
  },

  getByUser: (userId: string) => {
    initializeStorage()
    const allBookings = bookings.getAll()
    return allBookings.filter((b) => b.user_id === userId)
  },

  getById: (id: string) => {
    initializeStorage()
    const allBookings = bookings.getAll()
    return allBookings.find((b) => b.id === id)
  },

  update: (id: string, updates: Partial<Booking>) => {
    initializeStorage()
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]") as Booking[]
    const index = allBookings.findIndex((b) => b.id === id)
    if (index !== -1) {
      allBookings[index] = { ...allBookings[index], ...updates }
      localStorage.setItem("bookings", JSON.stringify(allBookings))
      return { success: true }
    }
    return { error: "Booking not found" }
  },

  delete: (id: string) => {
    initializeStorage()
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]") as Booking[]
    const filtered = allBookings.filter((b) => b.id !== id)
    localStorage.setItem("bookings", JSON.stringify(filtered))
    return { success: true }
  },

  getByDateAndTime: (date: string, timeSlot: string) => {
    initializeStorage()
    const allBookings = bookings.getAll()
    return allBookings.filter(
      (b) =>
        b.booking_date === date && b.time_slot === timeSlot && (b.status === "confirmed" || b.status === "pending"),
    )
  },
}

// Payments functions
export const payments = {
  create: (payment: Omit<Payment, "id" | "created_at">) => {
    initializeStorage()
    const allPayments = JSON.parse(localStorage.getItem("payments") || "[]") as Payment[]
    const newPayment: Payment = {
      ...payment,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    }
    allPayments.push(newPayment)
    localStorage.setItem("payments", JSON.stringify(allPayments))
    return { payment: newPayment }
  },

  getByBooking: (bookingId: string) => {
    initializeStorage()
    const allPayments = JSON.parse(localStorage.getItem("payments") || "[]") as Payment[]
    return allPayments.find((p) => p.booking_id === bookingId)
  },

  getAll: () => {
    initializeStorage()
    return JSON.parse(localStorage.getItem("payments") || "[]") as Payment[]
  },

  update: (id: string, updates: Partial<Payment>) => {
    initializeStorage()
    const allPayments = JSON.parse(localStorage.getItem("payments") || "[]") as Payment[]
    const index = allPayments.findIndex((p) => p.id === id)
    if (index !== -1) {
      allPayments[index] = { ...allPayments[index], ...updates }
      localStorage.setItem("payments", JSON.stringify(allPayments))
      return { success: true }
    }
    return { error: "Payment not found" }
  },
}

// Helper functions for authentication
export const getCurrentUser = () => {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("currentUser")
  if (!userStr) return null
  return JSON.parse(userStr) as User
}

export const logout = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem("currentUser")
}
