'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const api = process.env.NEXT_PUBLIC_API_URL;

interface Data {
  id: string
  email: string
}
const SideBar = () => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.auth.token)


  useEffect(() => {
    if (token) {
      const fetch = async () => {
        try {
          const response = await axios.get<Data | null >(`${api}/auth/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
        } catch (err: any) {
          if (err.response && err.response.status === 401) {
            setError('Неавторизован. Токен может быть просрочен или неверен.');
          } else {
            setError('Ошибка сети или другая проблема');
          }
        }
      };
      fetch();
    } 
  }, [token]);
  

  return (
    <div>
      {error && <div>{error}</div>}
      <div className='flex gap-10'>
        <div>{data?.email}</div>
       
      </div>
      <Link href='/inbox'>Входящие</Link>
    </div>
  );
};

export default SideBar;