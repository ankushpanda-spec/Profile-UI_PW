import { webSDK } from "@/shared/services/sdk";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export const AuthGuard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(webSDK.isLoggedIn);

  useEffect(() => {
    setIsLoggedIn(webSDK.isLoggedIn);
  }, [webSDK.isLoggedIn]);

  if (isLoggedIn) {
    return <Outlet />;
  }
  window.location.href = process.env.PUBLIC_AUTH_REDIRECT_URL as string;
  return null;
}
