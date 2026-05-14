"use client";
import { useState } from "react";
import { submitEnquiry } from "@/services/api";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await submitEnquiry(form);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <div className="relative h-64 flex items-end pb-12 px-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        <div className="relative max-w-6xl mx-auto w-full">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-2">Reach Out</p>
          <h1 className="text-5xl font-bold" style={{ fontFamily: "'Georgia', serif" }}>Contact Us</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
        {/* Left */}
        <div>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            We'd love to hear from you
          </h2>
          <p className="text-stone-400 leading-relaxed mb-10">
            Whether you're looking for your first home, an investment property, or a commercial space — our team is here to guide you.
          </p>
          <div className="space-y-6">
            {[
              { label: "Phone", value: "+91 98765 43210", icon: "📞" },
              { label: "Email", value: "info@pavaniinfra.com", icon: "✉️" },
              { label: "Office", value: "Hyderabad, Telangana, India", icon: "📍" },
              { label: "Hours", value: "Mon–Sat, 9am – 6pm", icon: "🕐" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-lg flex-shrink-0">
                  {c.icon}
                </div>
                <div>
                  <p className="text-stone-500 text-xs uppercase tracking-wider mb-0.5">{c.label}</p>
                  <p className="text-stone-200">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-3xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-2 text-amber-400">Message Received!</h3>
              <p className="text-stone-400">Our team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold mb-5" style={{ fontFamily: "'Georgia', serif" }}>Send an Enquiry</h3>
              {[
                { key: "name", label: "Full Name", type: "text", required: true },
                { key: "email", label: "Email Address", type: "email", required: true },
                { key: "phone", label: "Phone Number", type: "tel", required: true },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-stone-400 text-xs uppercase tracking-wider mb-1.5 block">{f.label} {f.required && "*"}</label>
                  <input
                    type={f.type}
                    required={f.required}
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition placeholder:text-stone-600"
                  />
                </div>
              ))}
              <div>
                <label className="text-stone-400 text-xs uppercase tracking-wider mb-1.5 block">Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition resize-none placeholder:text-stone-600"
                  placeholder="Tell us what you're looking for..."
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-amber-400 text-black font-semibold py-3.5 rounded-full hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all mt-2"
              >
                Send Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
