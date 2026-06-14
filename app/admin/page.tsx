"use client";
import { useState } from "react";
import { Loader2, Plus, Trash2, Eye, EyeOff } from "lucide-react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY || "",
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          published,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      setMessage({ type: "success", text: "Post created successfully!" });
      setTitle("");
      setExcerpt("");
      setContent("");
      setPublished(false);

      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to create post. Check your admin key." });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-neutral-950 text-white min-h-screen overflow-x-hidden pt-32 md:pt-24 pb-16">
      <section className="w-full max-w-3xl mx-auto px-4 md:px-6 z-10">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 text-neutral-100">Blog Admin</h1>
          <p className="text-neutral-400">Create and manage blog posts</p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8">
          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-neutral-300">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
              placeholder="Enter post title"
            />
          </div>

          {/* Excerpt */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-neutral-300">
              Excerpt (optional)
            </label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
              placeholder="Brief summary"
            />
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-neutral-300">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={10}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 font-mono text-sm"
              placeholder="Write your post content here..."
            />
          </div>

          {/* Published */}
          <div className="mb-8 flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-5 h-5 rounded cursor-pointer"
            />
            <label htmlFor="published" className="flex items-center gap-2 cursor-pointer text-neutral-300">
              {published ? <Eye size={18} /> : <EyeOff size={18} />}
              Publish immediately
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 disabled:bg-neutral-700 text-cyan-400 disabled:text-neutral-500 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Creating...
              </>
            ) : (
              <>
                <Plus size={20} />
                Create Post
              </>
            )}
          </button>
        </form>

        {/* Instructions */}
        <div className="mt-12 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-4 text-neutral-100">Setup Instructions</h2>
          <ol className="space-y-3 text-neutral-400 text-sm">
            <li>1. Add your DATABASE_URL to .env.local (NeonDB PostgreSQL connection string)</li>
            <li>2. Set ADMIN_KEY environment variable for secure post creation</li>
            <li>3. Run `npx prisma migrate dev` to create database tables</li>
            <li>4. Posts must be published to appear on the home page</li>
            <li>5. All requests require the x-admin-key header for authentication</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
