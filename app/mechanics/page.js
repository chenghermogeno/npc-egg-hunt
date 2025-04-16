"use client";

import React from "react";
import Image from "next/image";

export default function MechanicsPage({ categories, userId, stampCounts }) {
  return (
    <div
      style={{
        backgroundImage: "url('/mechanics-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "inherit",
      }}
      className="min-h-screen flex flex-col items-center"
    >
      <div className="flex justify-center items-center  w-full h-full">
        <Image
          src="/mechanics-logo.png"
          alt="logo"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
      <div className="flex justify-center items-center  w-full h-full">
        <Image
          src="/mechanics-main.png"
          alt="mechanics"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
      <div className="flex justify-center -mt-28 items-center">
        <Image
          src="/mechanics-bottom.png"
          alt="mechanics"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
    </div>
  );
}
