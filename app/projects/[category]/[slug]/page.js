"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getProjectBySlug, submitEnquiry } from "@/services/api";

const fixBrochureUrl = (url) => {
  if (!url) return url;
  return url.replace("/image/upload/", "/raw/upload/").replace("/video/upload/", "/raw/upload/");
};

// Convert any Google Maps URL to an embeddable iframe src
const getEmbedUrl = (url) => {
  if (!url) return null;
  // Already an embed URL
  if (url.includes("maps/embed")) return url;
  // Extract coordinates or place from share URL
  try {
    const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&z=16&output=embed`;
    }
    // Search URL or place URL
    const qMatch = url.match(/[?&]q=([^&]+)/);
    if (qMatch) {
      return `https://maps.google.com/maps?q=${qMatch[1]}&output=embed`;
    }
    // place URL
    if (url.includes("/place/")) {
      const place = url.split("/place/")[1].split("/")[0];
      return `https://maps.google.com/maps?q=${place}&output=embed`;
    }
  } catch {}
  return null;
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (slug) {
      getProjectBySlug(slug)
        .then((res) => setProject(res.data.data))
        .catch(() => setProject(null))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, activeIdx]);

  const handleEnquiry = async (e) => {
    e.preventDefault();
    try {
      await submitEnquiry({ ...form, projectInterest: project?.title });
      setSubmitted(true);
    } catch { alert("Failed to submit. Please try again."); }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!project) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <p className="text-stone-400">Project not found.</p>
    </div>
  );

  const allImages = [
    ...(project.coverImage ? [project.coverImage] : []),
    ...(project.galleryImages || []),
  ];

  const prev = () => setActiveIdx((i) => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActiveIdx((i) => (i + 1) % allImages.length);

  const getSaleBadge = () => {
    if (project.saleStatus === "sold") return { label: "Sold Out", cls: "bg-red-500/20 text-red-400 border-red-500/40" };
    if (project.saleStatus === "on_sale") return { label: "🔥 On Sale", cls: "bg-green-500/20 text-green-400 border-green-500/40" };
    if (project.category === "completed") return { label: "Completed", cls: "bg-blue-400/20 text-blue-400 border-blue-400/30" };
    if (project.category === "upcoming") return { label: "Upcoming", cls: "bg-purple-400/20 text-purple-400 border-purple-400/30" };
    return { label: "Ongoing", cls: "bg-amber-400/20 text-amber-400 border-amber-400/30" };
  };
  const badge = getSaleBadge();
  const embedUrl = getEmbedUrl(project.mapUrl);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── HERO ── */}
      <div className="relative h-[65vh] overflow-hidden">
        <img
          src={project.coverImage || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=80"}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between flex-wrap gap-4">
          <div className="flex items-end gap-4">
            {/* Logo */}
            {project.logo && (
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm flex-shrink-0">
                <img src={project.logo} alt="logo" className="w-full h-full object-contain p-1" />
              </div>
            )}
            <div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border inline-block ${badge.cls}`}>
                {badge.label}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-3" style={{ fontFamily: "'Georgia', serif" }}>
                {project.title}
              </h1>
              {/* Location shown here, not in stats box */}
              <div className="flex items-center gap-2 mt-2 text-stone-300">
                <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-base">{project.location}</span>
              </div>
            </div>
          </div>
          {allImages.length > 1 && (
            <button onClick={() => setLightbox(true)}
              className="flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-white/20 px-4 py-2.5 rounded-full text-sm hover:border-amber-400/50 transition">
              📷 View all {allImages.length} photos
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">

          {/* Quick Stats — location removed, replaced with area/units/status/category */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Category", value: project.category },
              { label: "Area", value: project.area || "—" },
              { label: "Units", value: project.units || "—" },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-stone-500 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <p className="font-semibold capitalize text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Georgia', serif" }}>About This Project</h2>
            <p className="text-stone-400 leading-relaxed whitespace-pre-line">
              {project.fullDescription || project.shortDescription}
            </p>
          </div>

          {/* Arrow Gallery */}
          {allImages.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Georgia', serif" }}>Gallery</h2>
              <div className="relative rounded-2xl overflow-hidden bg-stone-900 select-none" style={{ height: "440px" }}>
                <AnimatePresence mode="wait">
                  <motion.img key={activeIdx} src={allImages[activeIdx]} alt=""
                    initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={() => setLightbox(true)}
                  />
                </AnimatePresence>
                {allImages.length > 1 && (
                  <>
                    <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-2xl hover:border-amber-400 hover:text-amber-400 transition z-10">‹</button>
                    <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-2xl hover:border-amber-400 hover:text-amber-400 transition z-10">›</button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {allImages.map((_, i) => (
                        <button key={i} onClick={() => setActiveIdx(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? "bg-amber-400 w-6" : "bg-white/40 w-1.5"}`} />
                      ))}
                    </div>
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-stone-300 z-10">
                      {activeIdx + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                  {allImages.map((img, i) => (
                    <button key={i} onClick={() => setActiveIdx(i)} className="flex-shrink-0">
                      <img src={img} alt=""
                        className={`w-20 h-14 object-cover rounded-lg transition-all border-2 ${i === activeIdx ? "border-amber-400 opacity-100" : "border-transparent opacity-50 hover:opacity-80"}`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Specifications */}
          {project.specifications && (
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Georgia', serif" }}>Specifications</h2>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <pre className="text-stone-300 text-sm leading-7 whitespace-pre-wrap font-sans">
                  {project.specifications}
                </pre>
              </div>
            </div>
          )}

          {/* ── LOCATION MAP SECTION ── */}
          {(project.location || embedUrl) && (
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Georgia', serif" }}>Location</h2>
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                {/* Address bar */}
                <div className="flex items-center gap-3 p-4 border-b border-white/10">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-stone-300 text-sm flex-1">{project.location}</p>
                  {project.mapUrl && (
                    <a href={project.mapUrl} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1.5 bg-amber-400 text-black text-xs font-semibold px-4 py-2 rounded-full hover:bg-amber-300 transition flex-shrink-0">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open in Maps
                    </a>
                  )}
                </div>

                {/* Map embed */}
                {embedUrl ? (
                  <div className="relative" style={{ height: "320px" }}>
                    <iframe
                      src={embedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                    {/* Clickable overlay that opens in Google Maps */}
                    {project.mapUrl && (
                      <a href={project.mapUrl} target="_blank" rel="noreferrer"
                        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20 cursor-pointer group">
                        <span className="bg-black/80 text-white text-sm px-4 py-2 rounded-full border border-white/20 group-hover:border-amber-400 group-hover:text-amber-400 transition">
                          Open in Google Maps ↗
                        </span>
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="h-32 flex items-center justify-center text-stone-500 text-sm">
                    No map added yet
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Videos */}
          {project.videos?.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Georgia', serif" }}>Videos</h2>
              {project.videos.map((v, i) => (
                <video key={i} src={v} controls className="w-full rounded-xl mb-3" />
              ))}
            </div>
          )}

          {/* Brochure */}
          {project.brochure && (
            <div className="border border-amber-400/20 rounded-2xl p-6 bg-amber-400/5">
              <h2 className="text-lg font-bold mb-2" style={{ fontFamily: "'Georgia', serif" }}>Project Brochure</h2>
              <p className="text-stone-400 text-sm mb-4">Download the full brochure for floor plans, pricing, and more details.</p>
              <a href={fixBrochureUrl(project.brochure)} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-amber-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Brochure (PDF)
              </a>
            </div>
          )}
        </div>

        {/* Enquiry Form */}
        <div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
            <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Georgia', serif" }}>Enquire Now</h3>
            <p className="text-stone-400 text-sm mb-5">
              Interested in {project.title}? Leave your details and we'll get back to you.
            </p>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-2xl mx-auto mb-3">✓</div>
                <p className="text-amber-400 font-medium">Enquiry received!</p>
                <p className="text-stone-400 text-sm mt-1">We'll contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleEnquiry} className="space-y-3">
                {[
                  { key: "name", placeholder: "Your Name *", type: "text", required: true },
                  { key: "email", placeholder: "Email *", type: "email", required: true },
                  { key: "phone", placeholder: "Phone *", type: "tel", required: true },
                ].map((f) => (
                  <input key={f.key} type={f.type} placeholder={f.placeholder} required={f.required}
                    value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition placeholder:text-stone-600"
                  />
                ))}
                <textarea placeholder="Message (optional)" rows={3} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition resize-none placeholder:text-stone-600"
                />
                <button type="submit" className="w-full bg-amber-400 text-black font-semibold py-3 rounded-full hover:bg-amber-300 transition">
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(false)}>
            <button className="absolute top-5 right-6 text-white/60 hover:text-amber-400 transition text-4xl" onClick={() => setLightbox(false)}>×</button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl hover:border-amber-400 hover:text-amber-400 transition">‹</button>
            <motion.img key={activeIdx} src={allImages[activeIdx]} alt=""
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
              className="max-w-5xl max-h-[85vh] w-full object-contain rounded-xl px-20"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl hover:border-amber-400 hover:text-amber-400 transition">›</button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((img, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setActiveIdx(i); }}>
                  <img src={img} alt="" className={`w-12 h-9 object-cover rounded transition border-2 ${i === activeIdx ? "border-amber-400" : "border-transparent opacity-40 hover:opacity-70"}`} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        <Link href="/projects" className="text-amber-400 hover:underline text-sm">← Back to Projects</Link>
      </div>
    </main>
  );
}
