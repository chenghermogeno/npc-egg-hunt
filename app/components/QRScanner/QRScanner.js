"use client";

import React, { useRef, useEffect } from "react";
import QrScanner from "qr-scanner";

const QRScannerComponent = ({ onScan, onClose }) => {
  const qrScannerRef = useRef(null);
  const videoElementRef = useRef(null);

  useEffect(() => {
    const video = videoElementRef.current;
    const qrScanner = new QrScanner(
      video,
      (result) => {
        if (result && typeof result === "object" && "data" in result) {
          const categoryUrl = result.data;
          console.log("Scanned QR value:", categoryUrl);
          onScan(categoryUrl);
        } else {
          console.error("Unexpected scan result:", result);
        }
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        maxScansPerSecond: 1,
        preferredCamera: "environment",
      }
    );

    qrScannerRef.current = qrScanner;
    qrScanner.start();

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
      }
    };
  }, [onScan]);

  return (
    <div>
      <div className="flex items-center justify-center mb-2 mt-2">
        <video
          className="object-cover border-2 w-96 h-96 rounded-3xl"
          ref={videoElementRef}
        />
      </div>
      <button
        onClick={onClose}
        className="mt-4 w-full bg-gray-300 py-2 rounded text-sm"
      >
        Cancel
      </button>
    </div>
  );
};

export default QRScannerComponent;
