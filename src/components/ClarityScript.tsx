"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function ClarityScript() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // 初回ロード時のチェック
    if (localStorage.getItem("cookie_consent") === "granted") {
      setHasConsent(true);
    }

    // バナーで「同意する」が押された時のイベントリスナー
    const handleConsent = () => setHasConsent(true);
    window.addEventListener("cookie_consent_granted", handleConsent);

    return () => {
      window.removeEventListener("cookie_consent_granted", handleConsent);
    };
  }, []);

  if (!hasConsent) return null;

  return (
    <Script
      id="ms-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "xewz228eev");
        `,
      }}
    />
  );
}