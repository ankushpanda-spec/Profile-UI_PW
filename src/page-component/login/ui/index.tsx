import { webSDK } from '@/shared/services/sdk';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import initialiseAuthSDK from '../services/sdk/auth.sdk';
import s from '../styles/index.module.css';

export default function Login() {
  const navigate = useNavigate();
  const hasInitialized = useRef<boolean>(false); // Ref to track initialization

  useEffect(() => {
    if (webSDK.isLoggedIn) {
      navigate('/');
    }
    // Only initialize SDK if it hasn't been done already
    if (!hasInitialized.current) {
      initialiseAuthSDK();
      hasInitialized.current = true; // Mark as initialized
    }
  }, [!!window?.initPWAuthWebSDK]);

  return <div id="pw_auth-flow" className={s.login} />;
}
