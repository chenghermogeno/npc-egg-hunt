"use client";

import React, { useState } from "react";
import QRScannerComponent from "../components/QRScanner/QRScanner";
import Image from "next/image";

import { addStamp } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { QrCode } from "lucide-react";
import dynamic from "next/dynamic";

const SuccessMessage = dynamic(
  () => import("@/app/components/SuccessMessage"),
  {
    ssr: false,
  }
);

export default function HomePage({ categories, userId, stampCounts }) {
  const router = useRouter();
  const initializeClaimedImages = () => {
    const initial = {
      food: Array(8).fill(false),
      retail: Array(8).fill(false),
      services: Array(8).fill(false),
    };

    stampCounts.forEach(({ category, count }) => {
      const cappedCount = Math.min(count, 8);
      for (let i = 0; i < cappedCount; i++) {
        initial[category][i] = true;
      }
    });

    return initial;
  };

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [claimedImages, setClaimedImages] = useState(initializeClaimedImages);

  const handleScan = async (data) => {
    if (!data) return;

    const matchedCategory = categories.find((cat) => data.includes(cat.url));
    if (matchedCategory) {
      setIsSuccessful(true);

      const currentClaimed = claimedImages[matchedCategory.name];
      const nextIndex = currentClaimed.indexOf(false);

      if (nextIndex !== -1) {
        setClaimedImages((prev) => ({
          ...prev,
          [matchedCategory.name]: prev[matchedCategory.name].map(
            (claimed, index) => (index === nextIndex ? true : claimed)
          ),
        }));

        await addStamp(userId, matchedCategory.name);
      }

      setIsScannerOpen(false);

      setTimeout(() => {
        setIsSuccessful(false);
      }, 3000);
    }
  };

  if (isSuccessful) return <SuccessMessage />;

  return (
    <div
      style={{
        backgroundImage: "url('/bg-main.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex flex-col items-center"
    >
      <div className="flex flex-col pt-32 mt-28 space-y-4 px-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="shadow-lg rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
            style={{
              backgroundImage: "url('/log.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100px",
            }}
          >
            <h2
              className="text-xl font-motley  text-[#c83078] mb-1 text-center"
              style={{ fontFamily: "Motley Forces, sans-serif" }}
            >
              {cat.name}
            </h2>
            <div className="flex">
              {claimedImages[cat.name].map((isClaimed, index) => (
                <div
                  key={index}
                  className="transition-transform transform hover:scale-110"
                >
                  <Image
                    src={`/${cat.name}-${isClaimed ? "claim" : "gray"}.png`}
                    alt={`${cat.name} sticker`}
                    width={60}
                    height={60}
                    className="w-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mechanics Button */}
      <button
        onClick={() => router.push("/mechanics")}
        className="text-xl mb-4 text-center text-white underline mt-2 transition-transform transform hover:scale-105"
        style={{ fontFamily: "'Motley Forces', sans-serif" }}
      >
        Go to Mechanics
      </button>

      {/* QR Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => setIsScannerOpen(true)}
          className="bg-pink-600 text-white w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform transform hover:scale-110"
        >
          <QrCode className="w-10 h-10" />
          {/* <span className="text-xs">SCAN QR</span> */}
        </button>
      </div>

      {/* QR Scanner Modal */}
      {isScannerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg relative">
            <button
              onClick={() => setIsScannerOpen(false)}
              className="absolute top-2 right-2 text-black"
            >
              ✕
            </button>
            <QRScannerComponent
              onScan={handleScan}
              onClose={() => setIsScannerOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
