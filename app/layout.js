import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Easter Funfair",
  description: "Newport City",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-center bg-white min-h-screen text-black relative">
          <div className="w-full max-w-[480px] flex flex-col justify-between min-h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
