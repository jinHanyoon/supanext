export default function Privacy() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl pt-28 min-h-[calc(100vh-200px)]">

        <h1 className="text-3xl font-bold mb-6">개인정보처리방침</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. 개인정보의 처리 목적</h2>
          <p className="mb-4">
            본 웹사이트는 포트폴리오 및 개인 프로젝트 목적으로 운영되며, 다음의 목적을 위해 최소한의 개인정보를 처리합니다:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>프로젝트 데모 계정 생성 및 관리</li>
            <li>기본적인 웹 서비스 제공</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. 수집하는 개인정보 항목</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>필수항목: 이메일 주소</li>
            <li>자동수집항목: 접속 IP, 브라우저 종류</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. 개인정보의 보유기간</h2>
          <p className="mb-4">
            수집된 개인정보는 회원 탈퇴 시 즉시 파기됩니다. 본 사이트는 포트폴리오 용도로 운영되므로 장기적인 개인정보 보관을 하지 않습니다.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. 개인정보 보호책임자</h2>
          <p className="mb-4">
            관리자: 윤진한<br />
            이메일: wlsgks7532@gamil.com
          </p>
        </section>
  
        <footer className="text-sm text-gray-600">
          시행일자: 2024년 6월 1일
        </footer>
      </div>
    );
  }