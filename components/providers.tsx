"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Provider } from "@radix-ui/react-tooltip";

export default function ProvidersComp({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <SessionProvider>{children}</SessionProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  );
}
