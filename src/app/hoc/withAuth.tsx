'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RootState } from '../redux/store'; // путь к store
import React from 'react';

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();
    const accessToken = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
      if (!accessToken) {
        router.push('/auth/login');
      }
    }, [accessToken]);

    if (!accessToken) return null;

    return <WrappedComponent {...props} />;
  };

  // задаём имя компонента для отладки
  AuthenticatedComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return AuthenticatedComponent;
}