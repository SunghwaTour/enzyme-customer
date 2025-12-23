export default function IdentityPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">[내몸에 효소욕] 이용자 신원 확인(본인인증) 동의서</h1>

        <div className="prose prose-neutral max-w-none space-y-8">
          <p className="text-muted-foreground">
            [내몸에 효소욕]는 이용자의 안전한 서비스 이용을 위해 「정보통신망법」 및 「본인확인기관 지정 등에 관한 규정」을 준수하며, 아래와 같이 본인확인을 위해 정보를 수집·이용하고자 합니다.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-4">1. 본인확인 목적</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>회원 가입 및 본인 여부 확인</li>
              <li>중복가입 방지</li>
              <li>미성년자 여부 확인</li>
              <li>부정 이용 방지 및 보안 강화</li>
              <li>관련 법령 준수를 위한 본인 식별</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. 수집되는 개인정보 항목</h2>
            <p className="text-muted-foreground mb-2">본인인증 기관을 통해 아래 정보가 처리됩니다.</p>
            <p className="text-muted-foreground mb-2"><strong>필수항목:</strong></p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-4">
              <li>이름</li>
              <li>생년월일</li>
              <li>성별</li>
              <li>휴대전화번호</li>
              <li>통신사</li>
              <li>내/외국인 여부</li>
              <li>인증 결과값(CI/DI)</li>
              <li>인증 일시</li>
              <li>IP 등 인증 과정에서 자동 수집되는 정보</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              ※ CI/DI는 본인확인기관이 제공하는 고유 식별코드이며, 암호화된 형태로 전달됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. 본인확인 수탁기관(본인확인기관)</h2>
            <p className="text-muted-foreground mb-2">아래 기관 중 서비스에서 사용하는 본인인증 모듈에 따라 적용됩니다.</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>NICE평가정보</li>
              <li>SCI평가정보</li>
              <li>통신 3사(SKT, KT, LGU+)</li>
              <li>KCB(코리아크레딧뷰로)</li>
              <li>기타 휴대폰 본인확인 대행사</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. 개인정보 이용 및 보유기간</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>본인확인 목적 달성 시 즉시 폐기</li>
              <li>단, 관련 법령에 따라 일정 기간 보관할 수 있음</li>
              <li>접속 기록: 3개월</li>
              <li>소비자 분쟁 처리: 3년</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. 동의 거부 권리 및 불이익</h2>
            <p className="text-muted-foreground">
              이용자는 본인확인을 위한 개인정보 수집·이용에 대해 동의하지 않을 수 있습니다. 다만, 본인확인이 필요한 서비스의 경우 이용이 제한될 수 있습니다.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
