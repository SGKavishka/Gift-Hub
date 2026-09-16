import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "Thashy Gift Hub | Tell Us Your Budget, We Create the Gift";
const siteDescription =
  "Affordable, beautifully packed Sri Lankan gifts, gift packs and custom gift boxes for every occasion.";

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host") ?? "thashy-gift-hub.sfensahan.chatgpt.site";
  const protocol = headerStore.get("x-forwarded-proto") ?? "https";
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: siteTitle,
    description: siteDescription,
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
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Thashy Gift Hub professional gift box preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Thashy Gift Hub",
      description: "Tell Us Your Budget, We Create the Gift.",
      images: ["/og.png"],
    },
    icons: {
      icon: "/thashy-logo.png",
      shortcut: "/thashy-logo.png",
    },
  };
}

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
