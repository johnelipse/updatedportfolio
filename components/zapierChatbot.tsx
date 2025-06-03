"use client";
import { useEffect } from "react";

export default function ZapierChatbot() {
  const chatbotId = process.env.NEXT_PUBLIC_CHATBOT_ID;
  useEffect(() => {
    // Load the script if it hasn't been loaded already
    if (!document.querySelector('script[src*="zapier-interfaces.esm.js"]')) {
      const script = document.createElement("script");
      script.async = true;
      script.type = "module";
      script.src =
        "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
      document.head.appendChild(script);
    }
  }, []);

  return (
    <zapier-interfaces-chatbot-embed
      is-popup="true"
      chatbot-id={chatbotId as string}
    />
  );
}
