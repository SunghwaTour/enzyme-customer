export default function ThirdPartyPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">[내몸에 효소욕] 개인정보 제3자 제공 동의서</h1>

        <div className="prose prose-neutral max-w-none space-y-8">
          <p className="text-muted-foreground">
            [내몸에 효소욕]는 개인정보보호법 제17조 및 제22조에 따라, 아래와 같이 개인정보를 제3자에게 제공하기 위해 이용자의 동의를 받습니다.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-4">1. 개인정보를 제공받는 자</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>결제대행사(PG사):</strong> KG 이니시스</li>
              <li><strong>문자/알림 서비스 제공업체:</strong> 알리고</li>
              <li><strong>서버/데이터 호스팅 업체:</strong> GCP</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. 제공하는 개인정보 항목</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>이름 / 휴대전화번호</li>
              <li>결제정보(카드번호 일부, 승인번호 등 필요한 최소한 정보)</li>
              <li>서비스 이용 기록, 접속 로그, IP, 기타 서비스 제공 과정에서 필요한 정보</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. 개인정보 제공 목적</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>결제 처리 및 환불 업무</li>
              <li>문자·이메일 등 알림 발송</li>
              <li>서버 운영, 데이터 보관 및 시스템 안정화</li>
              <li>고객센터 / 문의 대응을 위한 정보 확인</li>
              <li>서비스 운영에 필요한 외부 시스템 연동</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. 개인정보 보유 및 이용 기간</h2>
            <p className="text-muted-foreground">
              제3자는 제공 목적 달성 후 해당 개인정보를 지체 없이 파기합니다. 단, 관련 법령이 정한 기간 동안 보관해야 하는 경우에는 해당 기간 동안 보관합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. 동의 거부 권리 및 불이익</h2>
            <p className="text-muted-foreground">
              이용자는 개인정보 제3자 제공에 대한 동의를 거부할 권리가 있습니다. 다만 필수 제공 항목에 대한 동의를 거부할 경우 서비스 이용(특히 결제, 알림 기능 등)이 제한될 수 있습니다.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
