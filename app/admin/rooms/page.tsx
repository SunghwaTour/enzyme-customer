"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getCurrentUser, logout } from "@/lib/storage"
import type { Room } from "@/lib/storage"

export default function AdminRoomsPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth/login")
      return
    }
    setUser(currentUser)

    const roomsData = localStorage.getItem("rooms")
    const roomsList: Room[] = roomsData ? JSON.parse(roomsData) : []

    // Sort by room number
    roomsList.sort((a, b) => a.room_number.localeCompare(b.room_number))

    setRooms(roomsList)
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      available: "default",
      occupied: "secondary",
      maintenance: "destructive",
    }
    return variants[status] || "default"
  }

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      available: "이용 가능",
      occupied: "사용중",
      maintenance: "점검중",
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
          <h1 className="text-3xl font-bold mb-2">룸 관리</h1>
          <p className="text-muted-foreground">효소방 룸 상태를 확인하고 관리합니다</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <Card key={room.id} className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{room.room_number}</span>
                    <Badge variant={getStatusBadge(room.status)}>{getStatusText(room.status)}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">상태</span>
                      <span className="font-medium">{getStatusText(room.status)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">등록일</span>
                      <span className="font-medium">{new Date(room.created_at).toLocaleDateString("ko-KR")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-full">
              <CardContent className="py-8 text-center text-muted-foreground">등록된 룸이 없습니다</CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
