import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Pavani Infra | Construction Company in Guntur | APRERA Approved Homes",
  description:
    "Pavani Infra is a CREDAI member construction company in Guntur, Andhra Pradesh. We build and sell APRERA approved, ready-to-move homes. Call +91 81848 62623.",
  keywords:
    "construction company in Guntur, Guntur construction company, APRERA approved homes Guntur, CREDAI builder Guntur, ready to move homes Guntur, Pavani Infra, residential projects Guntur, flats in Guntur, houses for sale Guntur, real estate Guntur",
  openGraph: {
    title: "Pavani Infra | Construction Company in Guntur",
    description:
      "CREDAI member, APRERA approved construction company in Guntur. Ready-to-move homes built with quality and trust since 2021.",
    url: "https://www.pavaniinfraguntur.com",
    siteName: "Pavani Infra",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="IN-AP" />
        <meta name="geo.placename" content="Guntur" />
        <meta name="geo.position" content="16.3067;80.4365" />
        <meta name="ICBM" content="16.3067, 80.4365" />
      </head>
      <body className="bg-[#0a0a0a] text-stone-100">
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
