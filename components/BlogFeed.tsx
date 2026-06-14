"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  project?: string;
  createdAt: string;
  published: boolean;
}

export default function BlogFeed() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog?published=true");
        const data = await res.json();
        setPosts(data || []);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const renderMarkdown = (markdown: string) => {
    let html = markdown
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/_(.+?)_/g, "<em>$1</em>")
      // Headings
      .replace(/## (.*)/g, "<h2>$1</h2>")
      .replace(/# (.*)/g, "<h1>$1</h1>")
      // Images
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-4" />')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-400 hover:underline">$1</a>')
      // Line breaks
      .replace(/\n\n/g, "</p><p>");

    return `<p>${html}</p>`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-slate-700 rounded-lg p-4 animate-pulse h-40"></div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p>No posts yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition border border-slate-600"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
              <p className="text-slate-400 text-sm mb-4">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>

              {post.project && (
                <Link href={`/projects#${post.project.toLowerCase()}`}>
                  <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs mb-3 hover:bg-blue-700 transition">
                    {post.project}
                  </span>
                </Link>
              )}

              <div
                className="text-slate-200 prose prose-invert max-w-none line-clamp-3"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
              />

              <Link href={`/blog/${post.id}`}>
                <button className="mt-4 text-blue-400 hover:text-blue-300 font-semibold">
                  Read More →
                </button>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
