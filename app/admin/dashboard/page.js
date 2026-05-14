"use client";
import { useEffect, useState } from "react";
import {
  getAllProjects, getProjectById, createProject, updateProject, deleteProject,
  uploadCoverImage, uploadLogoImage, uploadGalleryImages, uploadBrochure,
  deleteGalleryImage, getAllEnquiries, updateEnquiryStatus, deleteEnquiry,
} from "@/services/api";

const ADMIN_PASSWORD = "pavani@2024";

const EMPTY_FORM = {
  title: "", slug: "", category: "ongoing", location: "", mapUrl: "",
  shortDescription: "", fullDescription: "", specifications: "",
  area: "", units: "", status: "ongoing", saleStatus: "none", featured: false,
};

function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem("pavani_admin", "true");
      onUnlock();
    } else {
      setError(true); setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
      setInput("");
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className={`w-full max-w-sm ${shake ? "animate-shake" : ""}`}>
        <div className="text-center mb-8">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-2">Admin Access</p>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
            Pavani <span className="text-amber-400">Infra</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
          <div>
            <label className="text-stone-400 text-xs uppercase tracking-wider mb-1.5 block">Password</label>
            <input type="password" value={input} onChange={(e) => setInput(e.target.value)} autoFocus
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition ${error ? "border-red-400" : "border-white/10 focus:border-amber-400"}`}
            />
            {error && <p className="text-red-400 text-xs mt-1.5">Incorrect password.</p>}
          </div>
          <button type="submit" className="w-full bg-amber-400 text-black font-semibold py-3 rounded-full hover:bg-amber-300 transition">Login</button>
        </form>
      </div>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-8px)}80%{transform:translateX(8px)}}.animate-shake{animation:shake 0.4s ease}`}</style>
    </main>
  );
}

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition placeholder:text-stone-600";
const selectCls = "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition";
const Field = ({ label, hint, children }) => (
  <div>
    <label className="text-stone-400 text-xs uppercase tracking-wider mb-1.5 block">{label}</label>
    {children}
    {hint && <p className="text-stone-600 text-xs mt-1">{hint}</p>}
  </div>
);

function ProjectForm({ initial, onSave, onCancel, title }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...(initial || {}) });
  const [coverFile, setCoverFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [brochureFile, setBrochureFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(""), 4000); };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let id = form._id;
      const payload = {
        title: form.title, slug: form.slug, category: form.category,
        location: form.location, mapUrl: form.mapUrl,
        shortDescription: form.shortDescription, fullDescription: form.fullDescription,
        specifications: form.specifications, area: form.area,
        units: form.units ? Number(form.units) : undefined,
        status: form.status, saleStatus: form.saleStatus, featured: form.featured,
      };

      if (id) {
        await updateProject(id, payload);
      } else {
        const res = await createProject(payload);
        id = res.data.data._id;
      }

      if (coverFile) await uploadCoverImage(id, coverFile);
      if (logoFile) await uploadLogoImage(id, logoFile);
      if (galleryFiles.length) await uploadGalleryImages(id, Array.from(galleryFiles));
      if (brochureFile) await uploadBrochure(id, brochureFile);

      flash("✅ Saved successfully!");
      setTimeout(() => onSave(), 1200);
    } catch (err) {
      flash("❌ Error: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <h2 className="text-xl font-bold" style={{ fontFamily: "'Georgia', serif" }}>{title}</h2>
        {msg && <span className="text-sm bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">{msg}</span>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Title *"><input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} required className={inputCls} /></Field>
        <Field label="Slug (auto if blank)"><input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls} /></Field>
        <Field label="Area (e.g. 1200 sq.ft)"><input type="text" value={form.area} onChange={(e) => set("area", e.target.value)} className={inputCls} /></Field>
        <Field label="Units (number)"><input type="number" value={form.units} onChange={(e) => set("units", e.target.value)} className={inputCls} /></Field>
        <Field label="Category *">
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className={selectCls}>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </Field>
        <Field label="Sale Status">
          <select value={form.saleStatus} onChange={(e) => set("saleStatus", e.target.value)} className={selectCls}>
            <option value="none">None</option>
            <option value="on_sale">🔥 On Sale</option>
            <option value="sold">Sold Out</option>
          </select>
        </Field>
      </div>

      <Field label="Full Address / Location *">
        <input type="text" value={form.location} onChange={(e) => set("location", e.target.value)} required
          placeholder="e.g. Plot 45, Jubilee Hills, Hyderabad, Telangana 500033"
          className={inputCls} />
      </Field>

      <Field
        label="Google Maps URL"
        hint='Go to Google Maps → find your location → click Share → Copy Link → paste here. Works with any Google Maps link.'
      >
        <input type="url" value={form.mapUrl} onChange={(e) => set("mapUrl", e.target.value)}
          placeholder="https://maps.google.com/... or https://goo.gl/maps/..."
          className={inputCls} />
        {form.mapUrl && (
          <a href={form.mapUrl} target="_blank" rel="noreferrer" className="text-amber-400 text-xs mt-1 inline-block hover:underline">
            ✓ Preview this link ↗
          </a>
        )}
      </Field>

      <Field label="Featured on Homepage">
        <div className="flex items-center gap-3 mt-1">
          <button type="button" onClick={() => set("featured", !form.featured)}
            className={`w-11 h-6 rounded-full transition-colors relative ${form.featured ? "bg-amber-400" : "bg-white/10"}`}>
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${form.featured ? "left-6" : "left-1"}`} />
          </button>
          <span className="text-stone-400 text-sm">{form.featured ? "Yes — shown as Latest Project on homepage" : "No"}</span>
        </div>
      </Field>

      <Field label="Short Description *">
        <input type="text" value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} required className={inputCls} />
      </Field>

      <Field label="Full Description">
        <textarea rows={4} value={form.fullDescription} onChange={(e) => set("fullDescription", e.target.value)} className={inputCls + " resize-none"} />
      </Field>

      <Field
        label="Specifications (type exactly as you want it displayed)"
        hint="Line breaks, spacing, and alignment are preserved exactly as typed."
      >
        <textarea rows={10} value={form.specifications}
          onChange={(e) => set("specifications", e.target.value)}
          placeholder={"STRUCTURE    : R.C.C. Framed structure\nWALLS        : 9\" thick brick walls\nFLOORING     : 2'x2' Vitrified tiles\nDOORS        : Teak wood frame\n..."}
          className={inputCls + " resize-y font-mono text-xs"}
        />
      </Field>

      {/* Media Uploads */}
      <div className="border border-white/10 rounded-2xl p-5 space-y-5">
        <p className="text-stone-400 text-xs uppercase tracking-wider font-medium">Media & Files</p>

        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Cover Image">
            <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])}
              className="text-sm text-stone-400 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-amber-400/20 file:text-amber-400 hover:file:bg-amber-400/30 file:cursor-pointer" />
            {form.coverImage && <img src={form.coverImage} className="mt-2 w-full h-20 object-cover rounded-lg opacity-60" alt="current cover" />}
          </Field>

          <Field label="Project Logo" hint="Small logo shown on the project hero. Use PNG with transparent background.">
            <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])}
              className="text-sm text-stone-400 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-amber-400/20 file:text-amber-400 hover:file:bg-amber-400/30 file:cursor-pointer" />
            {form.logo && (
              <div className="mt-2 w-14 h-14 rounded-xl border border-white/10 bg-white/5 p-1 flex items-center justify-center">
                <img src={form.logo} className="w-full h-full object-contain opacity-80" alt="current logo" />
              </div>
            )}
          </Field>

          <Field label="Add Gallery Images">
            <input type="file" accept="image/*" multiple onChange={(e) => setGalleryFiles(e.target.files)}
              className="text-sm text-stone-400 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-amber-400/20 file:text-amber-400 hover:file:bg-amber-400/30 file:cursor-pointer" />
          </Field>

          <Field label="Brochure (PDF)">
            <input type="file" accept="application/pdf" onChange={(e) => setBrochureFile(e.target.files[0])}
              className="text-sm text-stone-400 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-amber-400/20 file:text-amber-400 hover:file:bg-amber-400/30 file:cursor-pointer" />
            {form.brochure && <p className="text-green-400 text-xs mt-1">✓ Brochure already uploaded</p>}
          </Field>
        </div>

        {/* Existing gallery with delete */}
        {form.galleryImages?.length > 0 && (
          <div>
            <p className="text-stone-500 text-xs uppercase tracking-wider mb-2">Current Gallery ({form.galleryImages.length} photos) — hover to remove</p>
            <div className="flex gap-2 flex-wrap">
              {form.galleryImages.map((img, i) => (
                <div key={i} className="relative group">
                  <img src={img} className="w-20 h-14 object-cover rounded-lg" alt="" />
                  <button type="button"
                    onClick={async () => {
                      await deleteGalleryImage(form._id, img);
                      set("galleryImages", form.galleryImages.filter((_, j) => j !== i));
                    }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="bg-amber-400 text-black font-semibold px-10 py-3 rounded-full hover:bg-amber-300 transition disabled:opacity-50">
          {saving ? "Saving..." : (form._id ? "Save Changes" : "Create Project")}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}
            className="border border-white/20 text-stone-400 px-6 py-3 rounded-full hover:border-white/40 transition">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default function AdminDashboard() {
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("pavani_admin") === "true") setUnlocked(true);
  }, []);

  const loadProjects = () => getAllProjects().then((r) => setProjects(r.data.data));
  const loadEnquiries = () => getAllEnquiries().then((r) => setEnquiries(r.data.data));

  useEffect(() => {
    if (unlocked) { loadProjects(); loadEnquiries(); }
  }, [unlocked]);

  const handleLogout = () => { sessionStorage.removeItem("pavani_admin"); setUnlocked(false); };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    loadProjects();
  };

  const handleEditClick = async (id) => {
    setLoadingEdit(true);
    setTab("edit");
    try {
      const res = await getProjectById(id);
      setEditingProject(res.data.data);
    } catch { alert("Failed to load project."); }
    setLoadingEdit(false);
  };

  const handleEnquiryStatus = async (id, status) => {
    await updateEnquiryStatus(id, status); loadEnquiries();
  };
  const handleEnquiryDelete = async (id) => {
    if (!confirm("Delete this enquiry?")) return;
    await deleteEnquiry(id); loadEnquiries();
  };

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const TABS = ["projects", "add project", ...(tab === "edit" ? ["edit"] : []), "enquiries"];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-1">Admin Panel</p>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Georgia', serif" }}>Dashboard</h1>
          </div>
          <button onClick={handleLogout} className="text-sm border border-white/20 px-4 py-2 rounded-full text-stone-400 hover:border-red-400 hover:text-red-400 transition">
            Logout
          </button>
        </div>

        <div className="flex gap-3 mb-10 flex-wrap">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm capitalize transition border ${tab === t ? "bg-amber-400 text-black border-amber-400 font-semibold" : "border-white/20 text-stone-400 hover:border-amber-400 hover:text-amber-400"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Projects List */}
        {tab === "projects" && (
          <div className="space-y-4">
            <p className="text-stone-400 text-sm mb-4">{projects.length} project(s)</p>
            {projects.map((p) => (
              <div key={p._id} className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  {p.coverImage && <img src={p.coverImage} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" alt="" />}
                  {p.logo && <img src={p.logo} className="w-10 h-10 object-contain rounded-lg border border-white/10 p-1 flex-shrink-0" alt="logo" />}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold">{p.title}</p>
                      {p.saleStatus === "on_sale" && <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">On Sale</span>}
                      {p.saleStatus === "sold" && <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">Sold Out</span>}
                      {p.featured && <span className="text-xs bg-amber-400/20 text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded-full">★ Featured</span>}
                      {p.mapUrl && <span className="text-xs bg-blue-400/20 text-blue-400 border border-blue-400/30 px-2 py-0.5 rounded-full">📍 Map</span>}
                    </div>
                    <p className="text-stone-400 text-sm">{p.location} · {p.category}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditClick(p._id)} className="text-amber-400 border border-amber-400/30 px-4 py-1.5 rounded-full text-sm hover:bg-amber-400/10 transition">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-400 border border-red-400/30 px-4 py-1.5 rounded-full text-sm hover:bg-red-400/10 transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "add project" && (
          <ProjectForm title="Add New Project" onSave={() => { loadProjects(); setTab("projects"); }} />
        )}

        {tab === "edit" && (
          loadingEdit ? <p className="text-stone-400">Loading project...</p> :
          editingProject ? (
            <ProjectForm
              title={`Editing: ${editingProject.title}`}
              initial={editingProject}
              onSave={() => { loadProjects(); setTab("projects"); setEditingProject(null); }}
              onCancel={() => { setTab("projects"); setEditingProject(null); }}
            />
          ) : null
        )}

        {tab === "enquiries" && (
          <div className="space-y-4">
            <p className="text-stone-400 text-sm mb-4">{enquiries.length} enquiry(s)</p>
            {enquiries.map((e) => (
              <div key={e._id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-semibold">{e.name}</p>
                    <p className="text-stone-400 text-sm">{e.email} · {e.phone}</p>
                    {e.projectInterest && <p className="text-amber-400 text-xs mt-1">Project: {e.projectInterest}</p>}
                    {e.message && <p className="text-stone-400 text-sm mt-2">{e.message}</p>}
                    <p className="text-stone-600 text-xs mt-2">{new Date(e.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <select value={e.status} onChange={(ev) => handleEnquiryStatus(e._id, ev.target.value)}
                      className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none">
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button onClick={() => handleEnquiryDelete(e._id)} className="text-red-400 text-xs border border-red-400/30 px-3 py-1 rounded-full hover:bg-red-400/10 transition">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
