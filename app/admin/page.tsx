"use client";
import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Eye, EyeOff, Edit2, X, Save, Image as ImageIcon, Link as LinkIcon, Briefcase, FileText } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"blog" | "projects">("blog");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data States
  const [posts, setPosts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  
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
  const [isUploading, setIsUploading] = useState(false);

  const projectTags = ["Lagenio", "Hatake.eu", "Ouriye", "Manga Memoirs", "KronaFlow", "XeoTrack", "Cocreatior", "HatakeDex", "SyncWatch", "Mtn Dekor"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, projRes] = await Promise.all([
          fetch(`/api/blog?t=${Date.now()}`),
          fetch(`/api/project?t=${Date.now()}`)
        ]);
        
        const blogData = await blogRes.json();
        const projData = await projRes.json();
        
        // Safety check to prevent .map() crashes if the DB returns an error object
        setPosts(Array.isArray(blogData) ? blogData : []);
        setProjects(Array.isArray(projData) ? projData : []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (authenticated) fetchData();
  }, [authenticated]);

  const handleAuth = () => {
    if (adminKey === process.env.NEXT_PUBLIC_ADMIN_KEY) setAuthenticated(true);
    else alert("Invalid authorization key.");
  };

  // --- Image Upload Logic ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setProjImages([...projImages, data.url]);
      else throw new Error(data.error);
    } catch (err) {
      alert("Failed to upload image to ImgBB.");
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const removeImage = (index: number) => {
    setProjImages(projImages.filter((_, i) => i !== index));
  };

  // --- Project CRUD ---
  const resetProjectForm = () => {
    setProjId(null); setProjTitle(""); setProjDesc(""); setProjGithub(""); setProjVercel(""); setProjImages([]);
  };

  const editProject = (p: any) => {
    setProjId(p.id); setProjTitle(p.title); setProjDesc(p.description); setProjGithub(p.github || ""); setProjVercel(p.vercel || ""); setProjImages(p.images || []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveProject = async () => {
    if (!projTitle || !projDesc) return alert("Title and Description required.");
    setIsSubmitting(true);
    try {
      const payload = { id: projId, title: projTitle, description: projDesc, github: projGithub, vercel: projVercel, images: projImages };
      const res = await fetch("/api/project", {
        method: projId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const saved = await res.json();
        setProjects(projId ? projects.map(p => p.id === projId ? saved : p) : [saved, ...projects]);
        resetProjectForm();
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

  // --- Blog CRUD (Simplified from previous iteration) ---
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
          
          <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button onClick={() => setActiveTab("blog")} className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === "blog" ? "bg-cyan-500/20 text-cyan-400" : "text-neutral-500 hover:text-white"}`}>
              <FileText size={18} /> Broadcasts
            </button>
            <button onClick={() => setActiveTab("projects")} className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === "projects" ? "bg-cyan-500/20 text-cyan-400" : "text-neutral-500 hover:text-white"}`}>
              <Briefcase size={18} /> Projects
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
        ) : (
          /* ================= PROJECTS TAB ================= */
          <div className="animate-in fade-in duration-500">
             <div className={`rounded-2xl p-6 mb-12 border ${projId ? 'bg-purple-950/20 border-purple-900/50' : 'bg-neutral-900/50 border-neutral-800/50'}`}>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{projId ? "Edit Project Ecosystem" : "Add Ecosystem Project"}</h2>
                {projId && <button onClick={resetProjectForm} className="text-neutral-500 hover:text-white text-sm"><X size={16} /></button>}
              </div>
              <div className="space-y-4">
                <input type="text" value={projTitle} onChange={e => setProjTitle(e.target.value)} placeholder="Project Name (e.g. Hatake.social)" className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-500" />
                
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
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={isUploading} />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(p => (
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
        )}
      </div>
    </div>
  );
}