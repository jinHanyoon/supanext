export default function Terms() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl pt-28 min-h-[calc(100vh-200px)]">


        <h1 className="text-3xl font-bold mb-6">이용약관</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. 목적</h2>
          <p className="mb-4">
            본 약관은 포트폴리오 웹사이트의 서비스 이용과 관련하여 필요한 사항을 규정합니다.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. 서비스 제공</h2>
          <p className="mb-4">
            본 웹사이트는 다음과 같은 서비스를 제공합니다:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>포트폴리오 프로젝트 데모 서비스</li>
            <li>기본적인 웹 기능 체험</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. 이용자의 의무</h2>
          <p className="mb-4">
            이용자는 다음 사항을 준수해야 합니다:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>타인의 정보 도용 금지</li>
            <li>서비스 운영 방해 행위 금지</li>
            <li>악의적인 데이터 입력 금지</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. 책임 제한</h2>
          <p className="mb-4">
            본 웹사이트는 포트폴리오 목적으로 제작된 데모 프로젝트이며, 실제 서비스 운영을 보장하지 않습니다.
          </p>
        </section>
  
        <footer className="text-sm text-gray-600">
          시행일자: 2024년 6월 1일
        </footer>
      </div>
    );
  }