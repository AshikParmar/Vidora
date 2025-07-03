"use client"

import { store } from "@/store";
import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <Provider store={store}>
        <ImageKitProvider urlEndpoint={urlEndPoint}>
            {children}
        </ImageKitProvider>
      </Provider>
    </SessionProvider>
  );
}