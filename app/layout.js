import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  metadataBase: new URL("https://pavaniinfraguntur.com"),

  title:
    "Pavani Infra | Construction Company in Guntur | APRERA Approved Homes",

  description:
    "Pavani Infra is a CREDAI member construction company in Guntur, Andhra Pradesh. We build and sell APRERA approved, ready-to-move homes with premium quality construction.",

  keywords: [
    "construction company in Guntur",
    "Guntur construction company",
    "APRERA approved homes Guntur",
    "CREDAI builder Guntur",
    "ready to move homes Guntur",
    "Pavani Infra",
    "residential projects Guntur",
    "flats in Guntur",
    "houses for sale Guntur",
    "real estate Guntur",
    "2 BHK flats Guntur",
    "3 BHK apartments Guntur",
  ],

  openGraph: {
    title: "Pavani Infra | Construction Company in Guntur",

    description:
      "CREDAI member construction company in Guntur offering APRERA approved ready-to-move premium homes.",

    url: "https://pavaniinfraguntur.com",

    siteName: "Pavani Infra",

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Pavani Infra | Construction Company in Guntur",

    description:
      "APRERA approved premium homes and residential projects in Guntur.",

  },

  robots: {
    index: true,
    follow: true,
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
