export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">[내몸에 효소욕] 개인정보처리방침</h1>

        <div className="prose prose-neutral max-w-none space-y-8">
          <p className="text-muted-foreground">
            [내몸에 효소욕]([내몸에 효소욕], 이하 &quot;회사&quot;)는 개인정보보호법 등 관련 법령을 준수하며, 이용자의 개인정보를 보호하기 위해 다음과 같은 개인정보처리방침을 수립·공개합니다.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-4">1. 개인정보의 수집 항목 및 수집 방법</h2>

            <h3 className="text-lg font-medium mb-2">① 수집 항목</h3>
            <p className="text-muted-foreground mb-2"><strong>필수항목</strong></p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-4">
              <li>이름</li>
              <li>휴대전화번호</li>
              <li>이메일 주소</li>
              <li>비밀번호(암호화 저장)</li>
              <li>서비스 이용 기록, 접속 로그, IP 주소, 기기 정보</li>
            </ul>
            <p className="text-muted-foreground mb-2"><strong>선택항목</strong></p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-4">
              <li>이용자가 직접 입력한 기타 정보</li>
            </ul>

            <h3 className="text-lg font-medium mb-2">② 수집 방법</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>회원가입 및 서비스 이용 과정에서 이용자가 직접 입력</li>
              <li>고객 문의, 이벤트 참여</li>
              <li>서비스 이용 과정에서 자동 수집</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. 개인정보의 수집 및 이용 목적</h2>
            <p className="text-muted-foreground mb-2">회사는 다음의 목적을 위해 개인정보를 수집·이용합니다.</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>회사 가입 및 본인 확인</li>
              <li>서비스 제공 및 운영 관리</li>
              <li>예약, 이용권, 결제 관련 처리</li>
              <li>고객 문의 및 불만 처리</li>
              <li>서비스 개선 및 신규 기능 개발</li>
              <li>부정 이용 방지 및 보안 관리</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. 개인정보의 보유 및 이용 기간</h2>
            <p className="text-muted-foreground mb-4">
              회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
              단, 관계 법령에 따라 다음과 같이 일정 기간 보관할 수 있습니다.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-4 py-2 text-left">보관 항목</th>
                    <th className="border border-border px-4 py-2 text-left">보관 기간</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="border border-border px-4 py-2">계약 또는 청약철회 기록</td>
                    <td className="border border-border px-4 py-2">5년</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2">결제 및 재화 제공 기록</td>
                    <td className="border border-border px-4 py-2">5년</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2">소비자 불만 및 분쟁 처리 기록</td>
                    <td className="border border-border px-4 py-2">3년</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2">접속 로그</td>
                    <td className="border border-border px-4 py-2">3개월</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. 개인정보의 제3자 제공</h2>
            <p className="text-muted-foreground mb-2">
              회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
              다만, 이용자의 사전 동의가 있거나 법령에 따라 필요한 경우에 한하여 제공할 수 있습니다.
            </p>
            <p className="text-sm text-muted-foreground">
              ※ 제3자 제공 시 제공받는 자, 제공 목적, 제공 항목, 보유 기간을 별도 고지합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. 개인정보 처리의 위탁</h2>
            <p className="text-muted-foreground mb-4">
              회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 위탁할 수 있습니다.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-4 py-2 text-left">위탁받는 자</th>
                    <th className="border border-border px-4 py-2 text-left">위탁 업무</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="border border-border px-4 py-2">결제대행사(PG사)</td>
                    <td className="border border-border px-4 py-2">결제 및 환불 처리</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2">문자/알림 서비스 업체</td>
                    <td className="border border-border px-4 py-2">알림 발송</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2">클라우드/서버 업체</td>
                    <td className="border border-border px-4 py-2">데이터 보관 및 시스템 운영</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              위탁 계약 시 개인정보 보호 관련 법령을 준수하도록 관리·감독합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. 이용자 및 법정대리인의 권리</h2>
            <p className="text-muted-foreground mb-2">이용자는 언제든지 다음 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>개인정보 열람, 수정, 삭제 요청</li>
              <li>개인정보 처리 정지 요청</li>
              <li>회원 탈퇴를 통한 개인정보 삭제</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              권리 행사는 서비스 내 설정 또는 고객센터를 통해 가능합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. 개인정보의 파기 절차 및 방법</h2>
            <p className="text-muted-foreground mb-2">
              회사는 개인정보 보유 기간 경과 또는 처리 목적 달성 시 지체 없이 파기합니다.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>전자적 파일: 복구 불가능한 방법으로 삭제</li>
              <li>종이 문서: 분쇄 또는 소각</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. 개인정보의 안전성 확보 조치</h2>
            <p className="text-muted-foreground mb-2">회사는 개인정보 보호를 위해 다음과 같은 조치를 취하고 있습니다.</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>개인정보 암호화</li>
              <li>접근 권한 최소화</li>
              <li>보안 프로그램 설치 및 정기 점검</li>
              <li>내부 관리 계획 수립 및 교육</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">9. 개인정보 보호책임자</h2>
            <p className="text-muted-foreground mb-2">
              회사는 개인정보 보호 관련 문의 처리를 위해 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <ul className="list-none space-y-1 text-muted-foreground">
              <li><strong>개인정보 보호책임자:</strong> 김형주</li>
              <li><strong>연락처:</strong> sht7111@naver.com / 010-3449-7111</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">10. 개인정보처리방침의 변경</h2>
            <p className="text-muted-foreground">
              본 개인정보처리방침은 법령 또는 서비스 변경에 따라 수정될 수 있으며, 변경 시 서비스 내 공지를 통해 안내합니다.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
