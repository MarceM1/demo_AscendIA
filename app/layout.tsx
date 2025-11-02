import type { Metadata } from "next";
import { Inter, Kodchasan } from "next/font/google";
import "./globals.css";
import '@clerk/themes/shadcn.css';
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Script from "next/script";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const kodchasanSans = Kodchasan({
  variable: "--font-Kodchasan-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AscendIA",
  description: "Employment AI Assistant",
  authors: [{ name: 'AscendIA', url: 'https://ascendia.ai' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider  >
      <html lang="en">
        <head>
          {/* Google Identity Services - One Tap (FedCM ready) */}
          <Script
            src="https://accounts.google.com/gsi/client"
            strategy="afterInteractive"
          />
        </head>
        <body
          className={`${interSans.variable} ${kodchasanSans.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
