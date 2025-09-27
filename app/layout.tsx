import type { Metadata } from "next";
import { Inter, Kodchasan } from "next/font/google";
import "./globals.css";
import '@clerk/themes/shadcn.css'; 
import {
  ClerkProvider,
} from '@clerk/nextjs'

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider  >
      <html lang="en">
        <body
          className={`${interSans.variable} ${kodchasanSans.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
