'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 

export default function Home() {
  const [token, setToken] = useState<string | null>('null');
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
    if (!savedToken) {
      router.push('/auth/login');
    } else {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="flex justify-center w-[280px]">
      <p>Загрузка...</p>
    </div>
  );
}