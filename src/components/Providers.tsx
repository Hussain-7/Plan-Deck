"use client";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <KindeProvider
      clientId={process.env.KINDE_CLIENT_ID}
      domain={process.env.KINDE_ISSUER_URL!}
      logoutUri={process.env.KINDE_POST_LOGOUT_REDIRECT_URL!}
      redirectUri={process.env.KINDE_POST_LOGIN_REDIRECT_URL!}
    >
      {children}
    </KindeProvider>
  );
};

export default Providers;
