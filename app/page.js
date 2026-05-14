"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getAllProjects } from "@/services/api";

const STATS = [
  { value: "4+", label: "Projects Delivered" },
  { value: "3+", label: "Years of Excellence" },
  { value: "30+", label: "Happy Families" },
  { value: "100%", label: "On-Time Delivery" },
];

const WHY_US = [
  {
    icon: "✅",
    title: "APRERA Approved",
    text: "Every project we deliver is fully approved under the Andhra Pradesh Real Estate Regulatory Authority — your investment is always protected.",
  },
  {
    icon: "🏛️",
    title: "CREDAI Member",
    text: "As a proud member of CREDAI, we uphold the highest standards of ethical real estate development and construction practices.",
  },
  {
    icon: "🏗️",
    title: "Development Projects",
    text: "Beyond ready-to-move homes, we also take on custom development projects. Partner with us to build commercial or residential spaces tailored to your vision.",
  },
  {
    icon: "🏠",
    title: "Ready-to-Move Homes",
    text: "We sell fully constructed, ready-to-move homes — no waiting, no uncertainty. What you see is what you get.",
  },
];

const H = ({ children }) => (
  <span className="text-amber-400 font-semibold">{children}</span>
);

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [latestProject, setLatestProject] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    getAllProjects()
      .then((res) => {
        const all = res.data.data;
        setFeatured(all.slice(0, 3));
        const feat = all.find((p) => p.featured) || all[0] || null;
        setLatestProject(feat);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="bg-[#0a0a0a] text-white font-sans overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0a0a0a]" />
        </motion.div>

        <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-amber-400" />
            <span className="text-amber-400 text-xs tracking-[0.4em] uppercase font-medium">Est. 2021 · Guntur</span>
            <div className="h-px w-12 bg-amber-400" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-none mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            Building Dreams,
            <span className="block text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #f59e0b, #fbbf24, #d97706)" }}>
              Delivering Excellence
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Guntur's trusted construction partner — delivering <span className="text-amber-400 font-semibold">APRERA</span> approved, <span className="text-amber-400 font-semibold">CREDAI</span> certified residential spaces built to last a lifetime.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className="flex gap-4 justify-center flex-wrap mt-8">
            <Link href="/projects"
              className="group relative px-8 py-4 bg-amber-400 text-black font-semibold rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]">
              <span className="relative z-10">Explore Projects</span>
              <div className="absolute inset-0 bg-amber-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link href="/contact"
              className="px-8 py-4 border border-white/30 text-white rounded-full hover:border-amber-400 hover:text-amber-400 transition-all backdrop-blur-sm">
              Contact Us
            </Link>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-stone-400 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-400 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center group">
              <p className="text-4xl font-bold text-amber-400 mb-1 group-hover:scale-110 transition-transform"
                style={{ fontFamily: "'Georgia', serif" }}>{s.value}</p>
              <p className="text-stone-400 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">Who We Are</p>
          <h2 className="text-4xl font-bold leading-tight mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            Crafting spaces families are proud to call home
          </h2>
          <p className="text-stone-400 leading-relaxed mb-6">
            Pavani Infra is a Guntur-based construction company and proud member of <H>CREDAI</H> — the Confederation of Real Estate Developers' Associations of India. Since 2021, we have been delivering <H>APRERA</H> approved homes that we don't just build — we live in them too. Every home we construct meets the same standard we would demand for our own family.
          </p>
          <Link href="/about" className="text-amber-400 text-sm hover:underline underline-offset-4">Our Story →</Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative h-80 rounded-2xl overflow-hidden">
          <img src={latestProject?.coverImage || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {latestProject && (
            <Link href={`/projects/${latestProject.category}/${latestProject.slug}`}>
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:border-amber-400/40 transition cursor-pointer">
                <p className="text-amber-400 text-xs uppercase tracking-wider">Latest Project</p>
                <p className="text-white font-semibold text-sm">{latestProject.title} — {latestProject.location}</p>
              </div>
            </Link>
          )}
        </motion.div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-2">Portfolio</p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Georgia', serif" }}>Featured Projects</h2>
            </div>
            <Link href="/projects" className="text-stone-400 text-sm hover:text-amber-400 transition hidden md:block">View all →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.length === 0 ? (
              [
                { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", title: "Sky Heights", loc: "Guntur", cat: "Ongoing" },
                { img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80", title: "Green Valley", loc: "Guntur", cat: "Completed" },
                { img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", title: "Pearl Residency", loc: "Guntur", cat: "Upcoming" },
              ].map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="group relative rounded-2xl overflow-hidden border border-white/5" style={{ height: "360px" }}>
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-amber-400 text-xs tracking-widest uppercase">{p.cat}</span>
                    <h3 className="text-white font-bold text-xl mt-1">{p.title}</h3>
                    <p className="text-stone-400 text-sm">{p.loc}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              featured.map((p, i) => (
                <motion.div key={p._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                  <Link href={`/projects/${p.category}/${p.slug}`}>
                    <div className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-amber-400/30 transition-all cursor-pointer" style={{ height: "360px" }}>
                      <img src={p.coverImage || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="text-amber-400 text-xs tracking-widest uppercase">{p.category}</span>
                        <h3 className="text-white font-bold text-xl mt-1">{p.title}</h3>
                        <p className="text-stone-400 text-sm">{p.location}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=80" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-2">Why Choose Us</p>
            <h2 className="text-4xl font-bold" style={{ fontFamily: "'Georgia', serif" }}>
              Why Guntur families choose Pavani Infra
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {WHY_US.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-400/30 transition-all">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-amber-400 mb-2">{item.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative max-w-3xl mx-auto text-center">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-5xl font-bold mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            Ready to own a home in Guntur?
          </h2>
          <p className="text-stone-400 text-lg mb-10 max-w-xl mx-auto">
            Pavani Infra delivers fully constructed, <span className="text-amber-400 font-semibold">APRERA</span> approved, ready-to-move homes in Guntur. Talk to our team today — no obligation, just honest advice.
          </p>
          <Link href="/contact"
            className="inline-block px-12 py-4 bg-amber-400 text-black font-semibold rounded-full hover:bg-amber-300 hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all text-lg">
            Schedule a Free Consultation
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-bold text-lg" style={{ fontFamily: "'Georgia', serif" }}>Pavani <span className="text-amber-400">Infra</span></p>
          <p className="text-stone-500 text-sm text-center">
            © 2024 Pavani Infra. Guntur, Andhra Pradesh. All rights reserved.<br />
            <span className="text-amber-400/60 text-xs">Member of CREDAI · APRERA Approved</span>
          </p>
          <div className="flex gap-6 text-stone-400 text-sm">
            <Link href="/projects" className="hover:text-amber-400 transition">Projects</Link>
            <Link href="/about" className="hover:text-amber-400 transition">About</Link>
            <Link href="/contact" className="hover:text-amber-400 transition">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
