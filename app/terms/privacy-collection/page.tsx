export default function PrivacyCollectionPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">[내몸에 효소욕] 개인정보 수집 및 이용 동의서</h1>

        <div className="prose prose-neutral max-w-none space-y-8">
          <p className="text-muted-foreground">
            [내 몸에 효소욕]는 이용자의 개인정보를 소중하게 생각하며, 개인정보보호법 등 관련 법령을 준수합니다.
            다음과 같이 개인정보를 수집·이용하기 위해 동의를 받고자 합니다.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-4">1. 개인정보 수집 항목</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>필수항목:</strong> 이름(닉네임) / 휴대전화번호 / 이메일 / 비밀번호(암호화 저장) / 서비스 이용 기록, 접속 로그, 쿠키, IP 정보</li>
              <li><strong>선택항목:</strong> 이용내역</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. 개인정보 수집·이용 목적</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>회원 가입 및 본인 확인</li>
              <li>서비스 제공 및 운영 관리</li>
              <li>문의·불만 처리, 고객지원</li>
              <li>서비스 개선, 신규 서비스 개발</li>
              <li>부정 이용 방지 및 보안 관리</li>
              <li>이용 패턴 분석, 통계 및 품질 향상</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. 개인정보 보유 및 이용 기간</h2>
            <p className="text-muted-foreground mb-4">
              회원 탈퇴 후 지체 없이 삭제됩니다. 단, 관련 법령에 따라 아래 정보는 일정 기간 보관할 수 있습니다.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>계약 또는 청약철회 관련 기록: 5년</li>
              <li>대금 결제 및 재화 제공 관련 기록: 5년</li>
              <li>소비자 불만 또는 분쟁 처리 기록: 3년</li>
              <li>접속 로그 기록: 3개월</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. 동의 거부 권리 및 불이익</h2>
            <p className="text-muted-foreground">
              이용자는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다. 다만 필수항목에 대한 동의를 거부할 경우 서비스 이용이 제한될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. 만 14세 미만 아동의 개인정보 처리</h2>
            <p className="text-muted-foreground">
              [내몸에 효소욕]는 만 14세 미만 아동의 개인정보를 부모 또는 법정대리인의 동의 없이 수집하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. 제3자 제공 및 위탁 여부</h2>
            <p className="text-muted-foreground">
              원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 서비스 운영에 필요한 경우 처리 업무를 위탁할 수 있으며, 위탁 시 관련 내용을 별도 고지합니다.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
