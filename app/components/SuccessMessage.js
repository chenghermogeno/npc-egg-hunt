"use client";

import { useEffect, useState } from "react";
// import Lottie from "lottie-react";
import animationData from "./success-animation.json";

export default function SuccessMessage({}) {
  const [countdown, setCountdown] = useState(3);
  const [redirectMessage, setRedirectMessage] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setRedirectMessage("Redirecting...");
    }
  }, [countdown]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white text-[#7253cb] rounded-2xl px-6 py-8 shadow-md max-w-md mx-auto text-center transition-all duration-300">
      <div className="w-40 h-40">
        {/* <Lottie animationData={animationData} loop={false} autoplay /> */}
      </div>

      <p className="text-xl font-semibold">
        Congratulations! You just earned a stamp.
      </p>

      {countdown > 0 ? (
        <p className="text-sm font-medium">Redirecting in {countdown}...</p>
      ) : (
        <p className="text-sm font-medium">{redirectMessage}</p>
      )}
    </div>
  );
}
