"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllProjects } from "@/services/api";

const CATEGORIES = ["all", "ongoing", "completed", "upcoming"];

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
];

const getSaleBadge = (p) => {
  if (p.saleStatus === "sold") return { label: "Sold Out", cls: "bg-red-500/80 text-white" };
  if (p.saleStatus === "on_sale") return { label: "🔥 On Sale", cls: "bg-green-500/80 text-white" };
  return null;
};

const getCatBadge = (cat) => {
  if (cat === "ongoing") return "bg-amber-400/20 text-amber-400 border border-amber-400/30";
  if (cat === "completed") return "bg-blue-400/20 text-blue-400 border border-blue-400/30";
  return "bg-purple-400/20 text-purple-400 border border-purple-400/30";
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllProjects(active === "all" ? null : active)
      .then((res) => setProjects(res.data.data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <div className="relative h-64 flex items-end pb-12 px-6 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80" alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        <div className="relative max-w-6xl mx-auto w-full">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-2">Portfolio</p>
          <h1 className="text-5xl font-bold" style={{ fontFamily: "'Georgia', serif" }}>Our Projects</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Filter */}
        <div className="flex gap-3 flex-wrap mb-12">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-6 py-2.5 rounded-full text-sm capitalize transition-all border ${
                active === cat
                  ? "bg-amber-400 text-black border-amber-400 font-semibold"
                  : "border-white/20 text-stone-400 hover:border-amber-400 hover:text-amber-400"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {loading && <p className="text-stone-500 text-center py-20">Loading projects...</p>}
        {!loading && projects.length === 0 && (
          <p className="text-stone-500 text-center py-20">No projects in this category yet.</p>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => {
            const saleBadge = getSaleBadge(p);
            return (
              <motion.div key={p._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}>
                <Link href={`/projects/${p.category}/${p.slug}`}>
                  <div className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-amber-400/30 transition-all cursor-pointer" style={{ height: "340px" }}>
                    <img
                      src={p.coverImage || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCatBadge(p.category)}`}>
                        {p.category}
                      </span>
                      {saleBadge && (
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${saleBadge.cls}`}>
                          {saleBadge.label}
                        </span>
                      )}
                    </div>

                    {/* Sold overlay */}
                    {p.saleStatus === "sold" && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="border-4 border-red-500 text-red-400 font-black text-2xl px-6 py-2 rotate-[-15deg] tracking-widest">
                          SOLD OUT
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-xl">{p.title}</h3>
                      <p className="text-stone-400 text-sm mt-1">{p.location}</p>
                      {p.area && <p className="text-stone-500 text-xs mt-1">{p.area}</p>}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
