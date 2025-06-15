import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "CapsuleDrop",
  description: "Drop a time capsule to the future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white flex flex-col min-h-screen`}
      >
        <div className="flex-grow">
          {children}
        </div>

        <footer className="text-sm text-gray-400 py-4 text-center border-t border-white/10 space-x-4">
          <a href="/legal/privacy" className="hover:underline">Privacy</a>
          <a href="/legal/terms" className="hover:underline">Terms</a>
          <a href="/legal/refund" className="hover:underline">Refund</a>
          <a href="/legal/shipping" className="hover:underline">Shipping</a>
          <a href="/legal/contact" className="hover:underline">Contact</a>
        </footer>
      </body>
    </html>
  );
}
