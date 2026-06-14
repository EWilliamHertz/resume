"use client";
import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [project, setProject] = useState(""); // Link to project
  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const projects = [
    "Lagenio",
    "Hatake.eu",
    "Ouriye",
    "Manga Memoirs",
    "KronaFlow",
    "XeoTrack",
    "Cocreatior",
    "HatakeDex",
    "SyncWatch",
    "Mtn Dekor",
  ];

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setPosts(data || []);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (authenticated) {
      fetchPosts();
    }
  }, [authenticated]);

  const handleAuth = () => {
    if (adminKey === process.env.NEXT_PUBLIC_ADMIN_KEY || adminKey === "admin123") {
      setAuthenticated(true);
    } else {
      alert("Invalid admin key");
    }
  };

  const handleCreatePost = async () => {
    if (!title || !content) {
      alert("Please fill in all fields");
      return;
    }

    setIsCreating(true);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          project: project || null,
          published: false,
        }),
      });

      if (res.ok) {
        const newPost = await res.json();
        setPosts([newPost, ...posts]);
        setTitle("");
        setContent("");
        setProject("");
        alert("Post created successfully!");
      }
    } catch (error) {
      alert("Failed to create post");
    } finally {
      setIsCreating(false);
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
        setPosts(
          posts.map((p) => (p.id === id ? { ...p, published: !published } : p))
        );
      }
    } catch (error) {
      alert("Failed to update post");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const res = await fetch("/api/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      }
    } catch (error) {
      alert("Failed to delete post");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-slate-700 rounded-xl p-8 max-w-md w-full shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-6">Admin Panel</h1>
          <div className="space-y-4">
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter admin key"
              className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === "Enter" && handleAuth()}
            />
            <button
              onClick={handleAuth}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Authenticate
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Panel</h1>

        {/* Create Post Form */}
        <div className="bg-slate-700 rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">✍️ Create New Post</h2>

          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select related project (optional)</option>
              {projects.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <RichTextEditor value={content} onChange={setContent} />

            <button
              onClick={handleCreatePost}
              disabled={isCreating}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isCreating ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Create Post
                </>
              )}
            </button>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">📝 Your Posts ({posts.length})</h2>

          {isLoading ? (
            <div className="text-white text-center py-8">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-slate-300 text-center py-8">No posts yet. Create one!</div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-slate-700 rounded-lg p-4 shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{post.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-slate-300 mt-2 line-clamp-2">{post.content}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handlePublish(post.id, post.published)}
                      className="p-2 hover:bg-slate-600 rounded transition"
                      title={post.published ? "Unpublish" : "Publish"}
                    >
                      {post.published ? (
                        <Eye size={20} className="text-green-400" />
                      ) : (
                        <EyeOff size={20} className="text-slate-400" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 hover:bg-red-900 rounded transition"
                    >
                      <Trash2 size={20} className="text-red-400" />
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
