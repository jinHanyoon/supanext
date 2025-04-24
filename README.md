# Supanext

Next.js, Supabase, Tailwind CSS로 만든 게시판 웹사이트입니다.  
회원가입, 로그인, 글쓰기, 댓글쓰기 기능이 포함되어 있으며, 반응형 UI로 구성되어 있습니다.

---

## 기술 스택

- **Next.js** – 서버사이드 렌더링과 라우팅을 지원하는 React 프레임워크
- **Supabase** – 오픈소스 백엔드 (DB, 인증, 스토리지 등)
- **Tailwind CSS** – 유틸리티 기반 CSS 프레임워크
- **Markdown** – 게시글 포맷 지원 (선택)

---

## 주요 기능

- [x] 회원가입 / 로그인 (Supabase Auth)
- [x] 게시글 작성, 수정, 삭제
- [x] 댓글 작성, 수정, 삭제
- [x] 실시간 데이터 반영 (조건부)
- [x] 마크다운 형식의 글 작성 가능
- [x] 반응형 UI (Tailwind 기반)

---

## 설치 방법

```bash
git clone https://github.com/jinhanyoon/Supanext.git
cd Supanext
npm install
npm run dev