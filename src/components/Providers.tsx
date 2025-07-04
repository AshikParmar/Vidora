"use client";

import { store } from "@/store";
import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider refetchInterval={5 * 60}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ImageKitProvider urlEndpoint={urlEndPoint}>
            {children}
          </ImageKitProvider>
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}
