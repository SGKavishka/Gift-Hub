import type { Metadata } from "next";
import "./globals.css";

const siteTitle = "Thashy Gift Hub | Tell Us Your Budget, We Create the Gift";
const siteDescription =
  "Affordable, beautifully packed Sri Lankan gifts, gift packs and custom gift boxes for every occasion.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sgkavishka.github.io/Gift-Hub/"),
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
        url: "https://sgkavishka.github.io/Gift-Hub/og.png",
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
    images: ["https://sgkavishka.github.io/Gift-Hub/og.png"],
  },
  icons: {
    icon: "https://sgkavishka.github.io/Gift-Hub/thashy-logo.png",
    shortcut: "https://sgkavishka.github.io/Gift-Hub/thashy-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
