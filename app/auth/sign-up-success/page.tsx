import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-muted/30">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link href="/" className="text-3xl font-semibold text-primary">
            효소방
          </Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">회원가입 완료</CardTitle>
            <CardDescription>이메일을 확인해주세요</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              가입하신 이메일 주소로 인증 링크를 보내드렸습니다.
              <br />
              이메일을 확인하고 인증을 완료해주세요.
            </p>
            <Link href="/auth/login">
              <Button className="w-full">로그인 페이지로 이동</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
