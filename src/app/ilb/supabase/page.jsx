import { getServerSession } from './server';

export default async function Page() {
    const session = await getServerSession();
    console.log('페이지에서의 세션:', session);  // 여기서 로그 확인

    return (
        <div>
            {/* 컴포넌트 내용 */}
        </div>
    );
}