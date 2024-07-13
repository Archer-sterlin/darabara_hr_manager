'use client'

// _app.tsx
import '@/styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import {AppProps}  from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth');
        return;
      }

      try {
        const decoded: any = jwt_decode(token); // Adjust type as per your JWT structure
        // Add additional checks if needed, e.g., token expiry
        if (!decoded) {
          router.push('/auth');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        router.push('/auth');
      }
    };

    checkToken();
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
