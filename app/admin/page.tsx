"use client";
import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Eye, EyeOff, Edit2, X, Save } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  project?: string;
  published: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Editor State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [project, setProject] = useState(""); 
  const [postDate, setPostDate] = useState(""); 

  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const projects = [
    "Lagenio", "Hatake.eu", "Ouriye", "Manga Memoirs", 
    "KronaFlow", "XeoTrack", "Cocreatior", "HatakeDex", 
    "SyncWatch", "Mtn Dekor"
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/blog?t=${Date.now()}`, { cache: "no-store" });
        const data = await res.json();
        setPosts(data || []);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (authenticated) fetchPosts();
  }, [authenticated]);

  const handleAuth = () => {
    if (adminKey === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      setAuthenticated(true);
    } else {
      alert("Invalid admin key");
    }
  };

  // Helper to convert DB UTC date to local input datetime format
  const formatForInput = (dateString: string) => {
    const d = new Date(dateString);
    const offset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - offset).toISOString().slice(0, 16);
  };

  const startEditing = (post: BlogPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setProject(post.project || "");
    setPostDate(formatForInput(post.createdAt));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setProject("");
    setPostDate("");
  };

  const handleSubmitPost = async () => {
    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      id: editingId,
      title,
      content,
      project: project || null,
      published: editingId ? undefined : false, // Keep existing status if editing
      createdAt: postDate ? new Date(postDate).toISOString() : undefined,
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const res = await fetch("/api/blog", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const savedPost = await res.json();
        
        if (editingId) {
          setPosts(posts.map(p => p.id === editingId ? savedPost : p));
        } else {
          setPosts([savedPost, ...posts]);
        }
        
        cancelEditing();
        alert(editingId ? "Post updated!" : "Post created!");
      }
    } catch (error) {
      alert("Failed to save post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async (id: string, published: boolean) => {
    try {
      const res = await fetch("/api/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, published: !published }),
      });
      if (res.ok) {
        setPosts(posts.map((p) => (p.id === id ? { ...p, published: !published } : p)));
      }
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    try {
      const res = await fetch("/api/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setPosts(posts.filter((p) => p.id !== id));
    } catch (error) {
      alert("Failed to delete post");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">System Override</h1>
          <div className="space-y-4">
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Authentication Key"
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
              onKeyPress={(e) => e.key === "Enter" && handleAuth()}
            />
            <button
              onClick={handleAuth}
              className="w-full bg-cyan-500 text-neutral-950 py-3 rounded-xl font-bold hover:bg-cyan-400 transition-colors"
            >
              Bypass Security
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 p-6 pt-24 pb-32 font-sans selection:bg-cyan-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-end border-b border-neutral-900 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Command Center</h1>
            <p className="text-neutral-500 mt-2">Manage transmissions and chronologies.</p>
          </div>
        </header>

        {/* Editor Form */}
        <div className={`rounded-2xl p-6 mb-12 shadow-2xl transition-all duration-500 border ${editingId ? 'bg-cyan-950/20 border-cyan-900/50' : 'bg-neutral-900/50 border-neutral-800/50'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              {editingId ? <><Edit2 className="text-cyan-400" /> Editing Output</> : <><Plus className="text-cyan-400" /> New Output</>}
            </h2>
            {editingId && (
              <button onClick={cancelEditing} className="text-neutral-500 hover:text-white transition-colors flex items-center gap-1 text-sm bg-neutral-900 px-3 py-1 rounded-full">
                <X size={14} /> Cancel Edit
              </button>
            )}
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Transmission Title"
                className="col-span-1 md:col-span-2 px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="col-span-1 px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="">No Project Link</option>
                {projects.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Manual Date Override */}
            <div>
              <label className="block text-xs font-mono text-neutral-500 mb-2 uppercase tracking-wider">Chronology Override (Optional)</label>
              <input
                type="datetime-local"
                value={postDate}
                onChange={(e) => setPostDate(e.target.value)}
                className="w-full md:w-auto px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 focus:outline-none focus:border-cyan-500 transition-colors css-color-scheme-dark"
              />
            </div>

            <RichTextEditor value={content} onChange={setContent} />

            <button
              onClick={handleSubmitPost}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${editingId ? 'bg-cyan-500 hover:bg-cyan-400 text-neutral-950' : 'bg-white hover:bg-gray-200 text-neutral-950'} disabled:opacity-50`}
            >
              {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : (editingId ? <Save size={20} /> : <Plus size={20} />)}
              {isSubmitting ? "Processing..." : (editingId ? "Update Transmission" : "Initialize Transmission")}
            </button>
          </div>
        </div>

        {/* Database List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-6">Database Records ({posts.length})</h2>

          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-cyan-500" size={32} /></div>
          ) : posts.length === 0 ? (
            <div className="text-neutral-500 text-center py-12 border border-neutral-800/50 rounded-2xl bg-neutral-900/30">No records found.</div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className={`bg-neutral-900/40 backdrop-blur-md rounded-2xl p-6 border transition-all ${editingId === post.id ? 'border-cyan-500/50' : 'border-neutral-800/50 hover:bg-neutral-900/80'}`}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`w-2 h-2 rounded-full ${post.published ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-neutral-600'}`}></span>
                      <h3 className="text-lg font-bold text-white truncate">{post.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 mt-2">
                      <span>{new Date(post.createdAt).toLocaleString()}</span>
                      {post.project && <span className="px-2 py-0.5 bg-neutral-800 rounded-md text-cyan-400">#{post.project}</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 p-1.5 rounded-xl">
                    <button onClick={() => handlePublish(post.id, post.published)} className="p-2.5 hover:bg-neutral-800 rounded-lg transition-colors group" title={post.published ? "Unpublish" : "Publish"}>
                      {post.published ? <Eye size={18} className="text-green-400 group-hover:text-green-300" /> : <EyeOff size={18} className="text-neutral-500 group-hover:text-neutral-400" />}
                    </button>
                    <div className="w-px h-6 bg-neutral-800"></div>
                    <button onClick={() => startEditing(post)} className="p-2.5 hover:bg-cyan-500/10 rounded-lg transition-colors group" title="Edit Post">
                      <Edit2 size={18} className="text-neutral-400 group-hover:text-cyan-400" />
                    </button>
                    <div className="w-px h-6 bg-neutral-800"></div>
                    <button onClick={() => handleDelete(post.id)} className="p-2.5 hover:bg-red-500/10 rounded-lg transition-colors group" title="Delete Post">
                      <Trash2 size={18} className="text-neutral-400 group-hover:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
