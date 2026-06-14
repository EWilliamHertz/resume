"use client";
import { useEffect, useState } from "react";
import { Calendar, Loader2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  createdAt: string;
}

export default function BlogFeed() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError("Failed to load blog posts");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="animate-spin text-cyan-400" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-400">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-400">No posts yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-8 hover:border-neutral-700/50 transition-colors"
        >
          <div className="flex items-center gap-2 text-sm text-neutral-400 mb-3">
            <Calendar size={16} />
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h3 className="text-2xl font-semibold mb-3 text-neutral-100 hover:text-cyan-400 transition-colors">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="text-neutral-400 mb-4">{post.excerpt}</p>
          )}

          <div className="prose prose-invert max-w-none">
            <p className="text-neutral-400 whitespace-pre-wrap">
              {post.content.substring(0, 300)}
              {post.content.length > 300 ? "..." : ""}
            </p>
          </div>

          <button className="mt-4 px-4 py-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors text-sm font-medium">
            Read More →
          </button>
        </article>
      ))}
    </div>
  );
}
