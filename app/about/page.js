"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const values = [
  { title: "Quality First", desc: "Premium materials and modern construction methods in every project we deliver." },
  { title: "Transparency", desc: "Clear communication, honest timelines — no surprises, ever." },
  { title: "Trust & Legacy", desc: "Over 15 years of delivering homes on time and on budget, building lasting relationships." },
  { title: "Innovation", desc: "Contemporary designs built for modern living, sustainability, and long-term value." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <div className="relative h-80 flex items-end pb-14 px-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        <div className="relative max-w-6xl mx-auto w-full">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-2">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-xl" style={{ fontFamily: "'Georgia', serif" }}>
            Building spaces people are proud to call home
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Story + Image */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-stone-300 leading-relaxed text-lg mb-6">
              Pavani Infra was founded with a simple vision: to build homes and commercial spaces that people genuinely love. Over 15 years and 50+ projects later, that vision remains unchanged.
            </p>
            <p className="text-stone-400 leading-relaxed mb-8">
              We operate across multiple cities, delivering residential apartments, gated communities, villas, and commercial complexes — each one crafted to the highest standards of quality and design.
            </p>
            <Link href="/contact" className="inline-block bg-amber-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-amber-300 transition">
              Get In Touch
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80" alt="" className="rounded-2xl w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80" alt="" className="rounded-2xl w-full h-48 object-cover mt-8" />
            <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80" alt="" className="rounded-2xl w-full h-48 object-cover -mt-4" />
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80" alt="" className="rounded-2xl w-full h-48 object-cover mt-4" />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 py-12 border-y border-white/5">
          {[
            { v: "50+", l: "Projects Completed" },
            { v: "15+", l: "Years of Experience" },
            { v: "2000+", l: "Happy Families" },
            { v: "5", l: "Cities" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
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
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-amber-400/30 transition-all group"
              >
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
