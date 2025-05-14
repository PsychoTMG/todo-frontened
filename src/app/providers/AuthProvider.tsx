'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAuth } from '../redux/authSlice';
import { useIsClient } from '../lib/useIsClient';

axios.defaults.withCredentials = true; 

const api = process.env.NEXT_PUBLIC_API_URL;

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const isClient = useIsClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await axios.post<{ accessToken: string }>(`${api}/auth/refresh`);
        if (res.data.accessToken) {
          dispatch(setAuth(res.data.accessToken));
        }
      } catch (err) {
        console.log('Не удалось обновить accessToken');
      } finally {
        setLoading(false);
      }
    };

    if (isClient) {
      refresh(); 
    }
  }, [dispatch, isClient]);

  if (!isClient || loading) {
    return null; 
  }

  return children;
}