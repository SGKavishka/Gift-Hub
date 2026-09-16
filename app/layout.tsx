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
  title: "Thashy Gift Hub | Tell Us Your Budget, We Create the Gift",
  description:
    "Affordable, beautifully packed Sri Lankan gifts, gift packs and custom gift boxes for every occasion.",
  keywords: [
    "Thashy Gift Hub",
    "Sri Lanka gifts",
    "gift boxes",
    "custom gifts",
    "birthday gifts",
    "couple gifts",
  ],
  openGraph: {
    title: "Thashy Gift Hub - Tell Us Your Budget, We Create the Gift",
    description:
      "Shop affordable gift packs, cute little things and customized Sri Lankan gift boxes for every occasion.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Thashy Gift Hub",
    description: "Tell Us Your Budget, We Create the Gift.",
  },
  icons: {
    icon: "/thashy-logo.png",
    shortcut: "/thashy-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
