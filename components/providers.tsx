"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Provider } from "@radix-ui/react-tooltip";
import LoadingWrapper from "@/app/loading";

export default function ProvidersComp({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <SessionProvider>
        <LoadingWrapper>{children}</LoadingWrapper>
      </SessionProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  );
}
