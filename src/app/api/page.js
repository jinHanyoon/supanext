'use client';
import { useEffect, useState } from 'react';
import supabase from './supabaseaApi';



export default function TestSupabaseConnection() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*');

        console.log("Fetched data:", data); // 데이터 확인용 로그

        if (error) {
          setError(error.message);
        } else if (data && data.length > 0) {
          setData(data); // 데이터가 있을 경우 설정
        } else {
          setError("No data found");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Supabase 연결 테스트</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data ? (
        <div>
          <h2>데이터베이스 연결 성공!</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>데이터를 가져오는 중...</p>
      )}
    </div>
  );
}