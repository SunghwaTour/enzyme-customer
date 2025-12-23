import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Clock, Shield, Leaf } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-primary">
            효소방
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#benefits" className="text-sm hover:text-primary transition-colors">
              효능
            </Link>
            <Link href="#pricing" className="text-sm hover:text-primary transition-colors">
              가격
            </Link>
            <Link href="#how-it-works" className="text-sm hover:text-primary transition-colors">
              이용방법
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                로그인
              </Button>
            </Link>
            <Link href="/booking">
              <Button size="sm">예약하기</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              자연의 힘으로
              <br />
              <span className="text-primary">건강한 휴식</span>을 경험하세요
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
              24시간 무인 운영 효소방에서 편안하게 디톡스와 힐링을 즐기세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="w-full sm:w-auto">
                  지금 예약하기
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  이용방법 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">효소방의 효능</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              천연 효소의 발효열로 몸속 노폐물을 배출하고 건강을 회복합니다
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">디톡스 효과</h3>
                <p className="text-muted-foreground">발효열을 통해 땀을 배출하며 체내 독소와 노폐물을 제거합니다</p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">피부 개선</h3>
                <p className="text-muted-foreground">천연 효소 성분이 피부에 영양을 공급하고 탄력을 높여줍니다</p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">면역력 강화</h3>
                <p className="text-muted-foreground">체온 상승으로 혈액순환이 개선되고 면역력이 향상됩니다</p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">스트레스 해소</h3>
                <p className="text-muted-foreground">따뜻한 효소에 몸을 맡기며 깊은 이완과 휴식을 취할 수 있습니다</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">이용 요금</h2>
            <p className="text-muted-foreground">합리적인 가격으로 건강을 챙기세요</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">30분</h3>
                <div className="text-4xl font-bold text-primary mb-4">₩25,000</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 1인 이용</li>
                  <li>• 샤워 시설 제공</li>
                  <li>• 수건 제공</li>
                </ul>
                <Link href="/booking" className="block mt-6">
                  <Button className="w-full bg-transparent" variant="outline">
                    예약하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-2 border-primary shadow-lg scale-105">
              <CardContent className="pt-6">
                <div className="text-xs font-semibold text-primary mb-2">인기</div>
                <h3 className="text-2xl font-bold mb-2">60분</h3>
                <div className="text-4xl font-bold text-primary mb-4">₩40,000</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 1인 이용</li>
                  <li>• 샤워 시설 제공</li>
                  <li>• 수건 제공</li>
                  <li>• 음료 제공</li>
                </ul>
                <Link href="/booking" className="block mt-6">
                  <Button className="w-full">예약하기</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">90분</h3>
                <div className="text-4xl font-bold text-primary mb-4">₩55,000</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 1인 이용</li>
                  <li>• 샤워 시설 제공</li>
                  <li>• 수건 제공</li>
                  <li>• 음료 제공</li>
                  <li>• 마사지 쿠션</li>
                </ul>
                <Link href="/booking" className="block mt-6">
                  <Button className="w-full bg-transparent" variant="outline">
                    예약하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">이용 방법</h2>
            <p className="text-muted-foreground">간편한 4단계로 효소방을 이용하세요</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">온라인 예약</h3>
              <p className="text-muted-foreground text-sm">원하는 날짜와 시간을 선택하여 예약합니다</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">키오스크 체크인</h3>
              <p className="text-muted-foreground text-sm">매장 도착 후 키오스크에서 체크인합니다</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">효소방 이용</h3>
              <p className="text-muted-foreground text-sm">개인 룸에서 편안하게 효소욕을 즐깁니다</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">샤워 후 퇴실</h3>
              <p className="text-muted-foreground text-sm">샤워 시설을 이용하고 편하게 퇴실합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">지금 바로 건강한 휴식을 시작하세요</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">24시간 언제든지 예약 가능합니다</p>
              <Link href="/booking">
                <Button size="lg">예약하기</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">© 2025 효소방. All rights reserved.</div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-primary transition-colors">
                이용약관
              </Link>
              <Link href="/terms/privacy" className="hover:text-primary transition-colors">
                개인정보처리방침
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
