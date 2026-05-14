import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Pavani Infra — Premium Real Estate",
  description: "Premium residential and commercial developments built with trust.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-stone-950 text-stone-100">
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
