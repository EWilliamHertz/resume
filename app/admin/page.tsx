"use client";
import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Eye, EyeOff, Edit2, X, Image as ImageIcon, Link as LinkIcon, Briefcase, FileText } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"blog" | "projects" | "experience">("blog");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data States
  const [posts, setPosts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  
  // Experience Editor State
  const [expId, setExpId] = useState<string | null>(null);
  const [expTitle, setExpTitle] = useState("");
  const [expCompany, setExpCompany] = useState("");
  const [expShortDesc, setExpShortDesc] = useState("");
  const [expContent, setExpContent] = useState("");
  const [expStartDate, setExpStartDate] = useState("");
  const [expEndDate, setExpEndDate] = useState("");
  const [expCurrent, setExpCurrent] = useState(false);
  const [expImages, setExpImages] = useState<string[]>([]);
  const [expOrder, setExpOrder] = useState<number>(0);

  // Blog Editor State
  const [blogId, setBlogId] = useState<string | null>(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogProject, setBlogProject] = useState(""); 
  const [blogDate, setBlogDate] = useState(""); 

  // Project Editor State
  const [projId, setProjId] = useState<string | null>(null);
  const [projTitle, setProjTitle] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projGithub, setProjGithub] = useState("");
  const [projVercel, setProjVercel] = useState("");
  const [projImages, setProjImages] = useState<string[]>([]);
  const [projOrder, setProjOrder] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const projectTags = ["Lagenio", "Hatake.eu", "Ouriye", "Manga Memoirs", "KronaFlow", "XeoTrack", "Cocreatior", "HatakeDex", "SyncWatch", "Mtn Dekor"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, projRes, expRes] = await Promise.all([
          fetch(`/api/blog?t=${Date.now()}`),
          fetch(`/api/project?t=${Date.now()}`),
          fetch(`/api/experience?t=${Date.now()}`)
        ]);
        const blogData = await blogRes.json();
        const projData = await projRes.json();
        const expData = await expRes.json();
        setPosts(Array.isArray(blogData) ? blogData : []);
        setProjects(Array.isArray(projData) ? projData : []);
        setExperiences(Array.isArray(expData) ? expData : []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (authenticated) fetchData();
  }, [authenticated]);

  const handleAuth = async () => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminKey })
      });
      const data = await res.json();
      setAuthenticated(data.authenticated);
      if (!data.authenticated) alert('Invalid admin key');
    } catch (error) {
      alert('Authentication failed');
    }
  };

  // --- Mass Image Upload Logic ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      // Loop through all selected files and upload them to ImgBB simultaneously
      await Promise.all(
        Array.from(files).map(async (file) => {
          const formData = new FormData();
          formData.append("image", file);
          const res = await fetch("/api/upload", { method: "POST", body: formData });
          const data = await res.json();
          if (data.url) uploadedUrls.push(data.url);
          else throw new Error(data.error);
        })
      );
      setProjImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      alert("Failed to upload images. Ensure files are valid images.");
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset input to allow re-uploading the same file if needed
    }
  };

  const removeImage = (index: number) => {
    setProjImages(projImages.filter((_, i) => i !== index));
  };

  // --- Project CRUD ---
  const resetProjectForm = () => {
    setProjId(null); setProjTitle(""); setProjDesc(""); setProjGithub(""); setProjVercel(""); setProjImages([]); setProjOrder(0);
  };

  const editProject = (p: any) => {
    setProjId(p.id); setProjTitle(p.title); setProjDesc(p.description); setProjGithub(p.github || ""); setProjVercel(p.vercel || ""); setProjImages(p.images || []); setProjOrder(p.sortOrder || 0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveProject = async () => {
    if (!projTitle || !projDesc) return alert("Title and Description are required to save.");
    setIsSubmitting(true);
    try {
      const payload = { id: projId, title: projTitle, description: projDesc, github: projGithub, vercel: projVercel, images: projImages, sortOrder: projOrder };
      const res = await fetch("/api/project", {
        method: projId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const saved = await res.json();
        setProjects(projId ? projects.map(p => p.id === projId ? saved : p) : [saved, ...projects]);
        resetProjectForm();
        alert("Project saved! Remember to click the Eye icon to publish it.");
      }
    } catch (err) { alert("Failed to save project."); }
    setIsSubmitting(false);
  };

  const toggleProjectPublish = async (id: string, published: boolean) => {
    await fetch("/api/project", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, published: !published }) });
    setProjects(projects.map(p => p.id === id ? { ...p, published: !published } : p));
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete project permanently?")) return;
    await fetch("/api/project", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setProjects(projects.filter(p => p.id !== id));
  };

  // --- Blog CRUD ---
  const resetBlogForm = () => {
    setBlogId(null); setBlogTitle(""); setBlogContent(""); setBlogProject(""); setBlogDate("");
  };

  const editBlog = (post: any) => {
    setBlogId(post.id); setBlogTitle(post.title); setBlogContent(post.content); setBlogProject(post.project || "");
    const d = new Date(post.createdAt);
    setBlogDate(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveBlog = async () => {
    if (!blogTitle || !blogContent) return alert("Title and Content required.");
    setIsSubmitting(true);
    try {
      const payload = { id: blogId, title: blogTitle, content: blogContent, project: blogProject, createdAt: blogDate ? new Date(blogDate).toISOString() : undefined };
      const res = await fetch("/api/blog", { method: blogId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        const saved = await res.json();
        setPosts(blogId ? posts.map(p => p.id === blogId ? saved : p) : [saved, ...posts]);
        resetBlogForm();
      }
    } catch (err) { alert("Failed to save blog."); }
    setIsSubmitting(false);
  };

  const toggleBlogPublish = async (id: string, published: boolean) => {
    await fetch("/api/blog", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, published: !published }) });
    setPosts(posts.map(p => p.id === id ? { ...p, published: !published } : p));
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Delete post permanently?")) return;
    await fetch("/api/blog", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setPosts(posts.filter(p => p.id !== id));
  };

  // --- Experience CRUD ---
  const resetExperienceForm = () => {
    setExpId(null); setExpTitle(""); setExpCompany(""); setExpShortDesc(""); setExpContent(""); setExpStartDate(""); setExpEndDate(""); setExpCurrent(false); setExpImages([]); setExpOrder(0);
  };

  const editExperience = (e: any) => {
    setExpId(e.id); setExpTitle(e.title); setExpCompany(e.company); setExpShortDesc(e.shortDescription); setExpContent(e.content); setExpStartDate(e.startDate ? new Date(e.startDate).toISOString().slice(0, 16) : ""); setExpEndDate(e.endDate ? new Date(e.endDate).toISOString().slice(0, 16) : ""); setExpCurrent(e.current); setExpImages(e.images || []); setExpOrder(e.sortOrder || 0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveExperience = async () => {
    if (!expTitle || !expCompany || !expStartDate) return alert("Title, Company, and Start Date are required.");
    setIsSubmitting(true);
    try {
      const payload = { id: expId, title: expTitle, company: expCompany, shortDescription: expShortDesc, content: expContent, startDate: new Date(expStartDate).toISOString(), endDate: expEndDate && !expCurrent ? new Date(expEndDate).toISOString() : null, current: expCurrent, images: expImages, sortOrder: expOrder };
      const res = await fetch("/api/experience", { method: expId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        const saved = await res.json();
        setExperiences(expId ? experiences.map(e => e.id === expId ? saved : e) : [saved, ...experiences]);
        resetExperienceForm();
        alert("Experience saved!");
      }
    } catch (err) { alert("Failed to save experience."); }
    setIsSubmitting(false);
  };

  const toggleExperiencePublish = async (id: string, published: boolean) => {
    await fetch("/api/experience", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, published: !published }) });
    setExperiences(experiences.map(e => e.id === id ? { ...e, published: !published } : e));
  };

  const deleteExperience = async (id: string) => {
    if (!confirm("Delete experience permanently?")) return;
    await fetch("/api/experience", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setExperiences(experiences.filter(e => e.id !== id));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">System Override</h1>
          <input type="password" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} placeholder="Authentication Key" className="w-full px-4 py-3 mb-4 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-500" onKeyPress={(e) => e.key === "Enter" && handleAuth()} />
          <button onClick={handleAuth} className="w-full bg-cyan-500 text-neutral-950 py-3 rounded-xl font-bold hover:bg-cyan-400">Bypass Security</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 p-6 pt-24 pb-32">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-neutral-900 pb-6 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Command Center</h1>
            <p className="text-neutral-500 mt-2">Manage architecture and broadcasts.</p>
          </div>
          
          <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800 overflow-x-auto">
            <button onClick={() => setActiveTab("blog")} className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === "blog" ? "bg-cyan-500/20 text-cyan-400" : "text-neutral-500 hover:text-white"}`}>
              <FileText size={18} /> Broadcasts
            </button>
            <button onClick={() => setActiveTab("projects")} className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === "projects" ? "bg-cyan-500/20 text-cyan-400" : "text-neutral-500 hover:text-white"}`}>
              <Briefcase size={18} /> Projects
            </button>
            <button onClick={() => setActiveTab("experience")} className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === "experience" ? "bg-cyan-500/20 text-cyan-400" : "text-neutral-500 hover:text-white"}`}>
              <Briefcase size={18} /> Experience
            </button>
          </div>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-cyan-500" size={40} /></div>
        ) : activeTab === "blog" ? (
          /* ================= BLOG TAB ================= */
          <div className="animate-in fade-in duration-500">
            <div className={`rounded-2xl p-6 mb-12 border ${blogId ? 'bg-cyan-950/20 border-cyan-900/50' : 'bg-neutral-900/50 border-neutral-800/50'}`}>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{blogId ? "Edit Broadcast" : "New Broadcast"}</h2>
                {blogId && <button onClick={resetBlogForm} className="text-neutral-500 hover:text-white text-sm"><X size={16} /></button>}
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" value={blogTitle} onChange={e => setBlogTitle(e.target.value)} placeholder="Title" className="col-span-2 md:col-span-1 px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-500" />
                  <select value={blogProject} onChange={e => setBlogProject(e.target.value)} className="col-span-2 md:col-span-1 px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-500">
                    <option value="">No Associated Project</option>
                    {projectTags.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <input type="datetime-local" value={blogDate} onChange={e => setBlogDate(e.target.value)} className="px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 focus:outline-none focus:border-cyan-500 w-full md:w-auto css-color-scheme-dark" />
                <RichTextEditor value={blogContent} onChange={setBlogContent} />
                <button onClick={saveBlog} disabled={isSubmitting} className="w-full bg-white text-neutral-950 py-3 rounded-xl font-bold hover:bg-gray-200 flex justify-center">{isSubmitting ? <Loader2 className="animate-spin" /> : "Save Broadcast"}</button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {posts.map(post => (
                <div key={post.id} className="bg-neutral-900/40 border border-neutral-800/50 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${post.published ? 'bg-green-500' : 'bg-neutral-600'}`}></span>
                       {post.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleBlogPublish(post.id, post.published)} className="p-2 hover:bg-neutral-800 rounded text-neutral-400">{post.published ? <Eye className="text-green-400" size={18}/> : <EyeOff size={18}/>}</button>
                    <button onClick={() => editBlog(post)} className="p-2 hover:bg-neutral-800 rounded text-cyan-400"><Edit2 size={18}/></button>
                    <button onClick={() => deleteBlog(post.id)} className="p-2 hover:bg-neutral-800 rounded text-red-400"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === "projects" ? (
          /* ================= PROJECTS TAB ================= */
          <div className="animate-in fade-in duration-500">
             <div className={`rounded-2xl p-6 mb-12 border ${projId ? 'bg-purple-950/20 border-purple-900/50' : 'bg-neutral-900/50 border-neutral-800/50'}`}>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{projId ? "Edit Project Ecosystem" : "Add Ecosystem Project"}</h2>
                {projId && <button onClick={resetProjectForm} className="text-neutral-500 hover:text-white text-sm"><X size={16} /></button>}
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input type="text" value={projTitle} onChange={e => setProjTitle(e.target.value)} placeholder="Project Name (e.g. Hatake.social)" className="col-span-1 md:col-span-3 px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-500" />
                  <div className="relative">
                    <label className="absolute -top-2 left-3 bg-neutral-900/50 px-1 text-xs text-neutral-500">Order (Lower = First)</label>
                    <input type="number" value={projOrder} onChange={e => setProjOrder(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                </div>
                
                <textarea value={projDesc} onChange={e => setProjDesc(e.target.value)} placeholder="Short Description..." className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-500 h-24 resize-none" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3.5 text-neutral-500" size={18} />
                    <input type="text" value={projVercel} onChange={e => setProjVercel(e.target.value)} placeholder="Live URL (Vercel/Domain)" className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3.5 text-neutral-500" size={18} />
                    <input type="text" value={projGithub} onChange={e => setProjGithub(e.target.value)} placeholder="GitHub Repo URL" className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                </div>

                {/* ImgBB Uploader */}
                <div className="p-4 border border-dashed border-neutral-700 rounded-xl bg-neutral-950/50">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-neutral-400 flex items-center gap-2"><ImageIcon size={16}/> Project Images</span>
                      <label className="cursor-pointer bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-500/20 transition-colors">
                        {isUploading ? <Loader2 className="animate-spin inline mr-2" size={16}/> : "Upload via ImgBB"}
                        {/* Added "multiple" to allow highlighting multiple files */}
                        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={isUploading} />
                      </label>
                   </div>
                   {projImages.length > 0 && (
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                       {projImages.map((img, idx) => (
                         <div key={idx} className="relative group rounded-lg overflow-hidden border border-neutral-800 aspect-video">
                           <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                           <button onClick={() => removeImage(idx)} className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14}/></button>
                         </div>
                       ))}
                     </div>
                   )}
                </div>

                <button onClick={saveProject} disabled={isSubmitting} className="w-full bg-white text-neutral-950 py-3 rounded-xl font-bold hover:bg-gray-200 flex justify-center">{isSubmitting ? <Loader2 className="animate-spin" /> : "Save Project"}</button>
              </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map(p => (
                <div key={p.id} className="bg-neutral-900/40 border border-neutral-800/50 rounded-xl overflow-hidden flex flex-col">
                  {p.images.length > 0 ? (
                    <div className="h-32 w-full bg-neutral-900 overflow-hidden">
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover opacity-70" />
                    </div>
                  ) : (
                    <div className="h-32 w-full bg-neutral-900 flex items-center justify-center border-b border-neutral-800"><ImageIcon className="text-neutral-700" size={32}/></div>
                  )}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.published ? 'bg-green-500' : 'bg-neutral-600'}`}></span>
                       {p.title}
                       <span className="ml-auto text-xs font-mono bg-neutral-800 text-neutral-500 px-2 py-0.5 rounded">Ord: {p.sortOrder}</span>
                    </h3>
                    <p className="text-xs text-neutral-500 mb-4 line-clamp-2">{p.description}</p>
                    <div className="mt-auto flex justify-end gap-2 pt-4 border-t border-neutral-800/50">
                      <button onClick={() => toggleProjectPublish(p.id, p.published)} className="p-2 hover:bg-neutral-800 rounded text-neutral-400">{p.published ? <Eye className="text-green-400" size={16}/> : <EyeOff size={16}/>}</button>
                      <button onClick={() => editProject(p)} className="p-2 hover:bg-neutral-800 rounded text-cyan-400"><Edit2 size={16}/></button>
                      <button onClick={() => deleteProject(p.id)} className="p-2 hover:bg-neutral-800 rounded text-red-400"><Trash2 size={16}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ================= EXPERIENCE TAB ================= */
          <div className="animate-in fade-in duration-500">
             <div className={`rounded-2xl p-6 mb-12 border ${expId ? 'bg-green-950/20 border-green-900/50' : 'bg-neutral-900/50 border-neutral-800/50'}`}>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{expId ? "Edit Work Experience" : "Add Work Experience"}</h2>
                {expId && <button onClick={resetExperienceForm} className="text-neutral-500 hover:text-white text-sm"><X size={16} /></button>}
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" value={expTitle} onChange={e => setExpTitle(e.target.value)} placeholder="Work Title (e.g. Founder, Developer)" className="px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-500" />
                  <input type="text" value={expCompany} onChange={e => setExpCompany(e.target.value)} placeholder="Company Name" className="px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-500" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <input type="datetime-local" value={expStartDate} onChange={e => setExpStartDate(e.target.value)} className="px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 focus:outline-none focus:border-cyan-500 w-full css-color-scheme-dark" />
                  {!expCurrent && (
                    <input type="datetime-local" value={expEndDate} onChange={e => setExpEndDate(e.target.value)} className="px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 focus:outline-none focus:border-cyan-500 w-full css-color-scheme-dark" />
                  )}
                  <label className="flex items-center gap-2 text-neutral-300">
                    <input type="checkbox" checked={expCurrent} onChange={e => setExpCurrent(e.target.checked)} className="w-5 h-5 accent-cyan-500" />
                    Current Position
                  </label>
                </div>
                
                <textarea value={expShortDesc} onChange={e => setExpShortDesc(e.target.value)} placeholder="Short Description..." className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-500 h-24 resize-none" />
                
                <div className="mt-4 border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
                  <div className="p-2 bg-neutral-900 border-b border-neutral-800 text-xs font-mono text-neutral-500">Long Explanation (Rich Text / Embedded Media)</div>
                  <RichTextEditor value={expContent} onChange={setExpContent} />
                </div>

                <div className="flex items-center gap-4">
                  <label className="text-sm text-neutral-400">Sort Order:</label>
                  <input type="number" value={expOrder} onChange={e => setExpOrder(Number(e.target.value))} className="w-24 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-500" />
                </div>

                <button onClick={saveExperience} disabled={isSubmitting} className="w-full bg-white text-neutral-950 py-3 rounded-xl font-bold hover:bg-gray-200 flex justify-center">{isSubmitting ? <Loader2 className="animate-spin" /> : "Save Experience"}</button>
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              {experiences
                .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                .map(e => (
                <div key={e.id} className="bg-neutral-900/40 border border-neutral-800/50 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-grow">
                    <h3 className="font-bold text-white text-xl flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${e.published ? 'bg-green-500' : 'bg-neutral-600'}`}></span>
                       {e.title} <span className="text-cyan-400 font-medium">@ {e.company}</span>
                    </h3>
                    <p className="text-sm text-neutral-500 font-mono mt-1 mb-2">
                      {new Date(e.startDate).toLocaleDateString()} — {e.current ? "Present" : e.endDate ? new Date(e.endDate).toLocaleDateString() : ""}
                    </p>
                    <p className="text-sm text-neutral-400 line-clamp-2 max-w-3xl">{e.shortDescription}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => toggleExperiencePublish(e.id, e.published)} className="p-2 hover:bg-neutral-800 rounded text-neutral-400">{e.published ? <Eye className="text-green-400" size={18}/> : <EyeOff size={18}/>}</button>
                    <button onClick={() => editExperience(e)} className="p-2 hover:bg-neutral-800 rounded text-cyan-400"><Edit2 size={18}/></button>
                    <button onClick={() => deleteExperience(e.id)} className="p-2 hover:bg-neutral-800 rounded text-red-400"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}