"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const values = [
  {
    title: "APRERA Approved Projects",
    desc: "Every home we build is registered and approved under APRERA, giving our buyers complete legal protection and peace of mind.",
  },
  {
    title: "CREDAI Certified",
    desc: "As a CREDAI member, we follow a strict code of ethics in every project — transparent dealings, fair pricing, and quality that lasts.",
  },
  {
    title: "We Live What We Build",
    desc: "Our founders and team members live in Pavani Infra homes. We build to a standard we hold ourselves to personally — not just professionally.",
  },
  {
    title: "Ready-to-Move Homes",
    desc: "We deliver fully finished, ready-to-move homes. No waiting for completion, no construction dust on handover day — just your new home, ready to live in.",
  },
];

const H = ({ children }) => (
  <span className="text-amber-400 font-semibold">{children}</span>
);

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <div className="relative h-80 flex items-end pb-14 px-6 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=80" alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        <div className="relative max-w-6xl mx-auto w-full">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-2">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-2xl" style={{ fontFamily: "'Georgia', serif" }}>
            Building Guntur's future, one home at a time
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Story + Image */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-stone-300 leading-relaxed text-lg mb-5">
              Pavani Infra was founded in 2021 with a mission to change how construction is done in Guntur. We are not just builders — we are homeowners ourselves. Every project we complete is one we would proudly live in, and many of us do.
            </p>
            <p className="text-stone-400 leading-relaxed mb-5">
              We are a registered member of <H>CREDAI</H> — the Confederation of Real Estate Developers' Associations of India — and every project we deliver is fully <H>APRERA</H> approved under the Andhra Pradesh Real Estate Regulatory Authority. Your investment is legally protected and your home meets every regulatory standard.
            </p>
            <p className="text-stone-400 leading-relaxed mb-5">
              We sell fully constructed, ready-to-move homes — no delays, no surprises. In a market where trust is rare, we have built our reputation on delivering exactly what we promise.
            </p>
            <p className="text-stone-400 leading-relaxed mb-8">
              We are proud to have delivered 4 projects and earned the trust of 30+ families across Guntur. That trust is our greatest achievement and it drives everything we do.
            </p>

            {/* CREDAI + APRERA badges */}
            <div className="flex gap-3 flex-wrap mb-8">
              <div className="bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-2 text-amber-400 text-sm font-semibold">
                ✓ CREDAI Member
              </div>
              <div className="bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-2 text-amber-400 text-sm font-semibold">
                ✓ APRERA Approved
              </div>
            </div>

            <Link href="/contact" className="inline-block bg-amber-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-amber-300 transition">
              Get In Touch
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80" alt="" className="rounded-2xl w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80" alt="" className="rounded-2xl w-full h-48 object-cover mt-8" />
            <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80" alt="" className="rounded-2xl w-full h-48 object-cover -mt-4" />
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80" alt="" className="rounded-2xl w-full h-48 object-cover mt-4" />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 py-12 border-y border-white/5">
          {[
            { v: "4+", l: "Projects Completed" },
            { v: "3+", l: "Years in Guntur" },
            { v: "30+", l: "Happy Families" },
            { v: "100%", l: "APRERA Approved" },
          ].map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <p className="text-4xl font-bold text-amber-400 mb-1" style={{ fontFamily: "'Georgia', serif" }}>{s.v}</p>
              <p className="text-stone-400 text-sm">{s.l}</p>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div>
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-3">What We Stand For</p>
          <h2 className="text-4xl font-bold mb-10" style={{ fontFamily: "'Georgia', serif" }}>Our Values</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-amber-400/30 transition-all group">
                <h3 className="font-semibold text-amber-400 text-lg mb-2 group-hover:text-amber-300 transition">{v.title}</h3>
                <p className="text-stone-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
