"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
  <img 
    src="https://res.cloudinary.com/dcvfg6zyo/image/upload/v1778653893/logo_l3ihhr.png" 
    alt="Pavani Infra" 
    className="h-8 w-auto object-contain" 
  />
  <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
    Pavani <span className="text-amber-400">Infra</span>
  </span>
</Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm tracking-wide transition-colors ${
                path === l.href ? "text-amber-400" : "text-stone-300 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-amber-400 text-black text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all"
          >
            Enquire Now
          </Link>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${open ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${open ? "max-h-64" : "max-h-0"}`}>
        <div className="bg-black/95 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-sm py-1 ${path === l.href ? "text-amber-400" : "text-stone-300"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="bg-amber-400 text-black text-sm font-semibold px-6 py-2.5 rounded-full text-center mt-2"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
