"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight } from "lucide-react";

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
        // Fix: Added a cache-busting timestamp to prevent Next.js from holding onto a stale empty cache
        const res = await fetch(`/api/blog?published=true&t=${Date.now()}`, {
          cache: "no-store",
        });
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

  // Upgraded markdown parser to output beautiful Tailwind classes
  const renderMarkdown = (markdown: string) => {
    let html = markdown
      .replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>")
      .replace(/_(.+?)_/g, "<em class='text-cyan-200'>$1</em>")
      .replace(/## (.*)/g, "<h2 class='text-xl font-bold text-white mt-4 mb-2'>$1</h2>")
      .replace(/# (.*)/g, "<h1 class='text-2xl font-bold text-white mt-4 mb-2'>$1</h1>")
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="w-full h-auto rounded-lg border border-neutral-800 my-4 shadow-xl opacity-80" />')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/30 underline-offset-4 transition-colors">$1</a>')
      .replace(/\n\n/g, "</p><p class='mb-3 text-neutral-400 leading-relaxed'>");

    return `<p class='mb-3 text-neutral-400 leading-relaxed'>${html}</p>`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-6 animate-pulse h-48"></div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 border border-neutral-800/50 rounded-2xl bg-neutral-900/30 backdrop-blur-sm">
        <p className="text-neutral-500 text-lg">No signals found. The feed is currently dark.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article
          key={post.id}
          className="group relative bg-neutral-900/40 backdrop-blur-md rounded-2xl p-8 hover:bg-neutral-900/60 transition-all duration-500 border border-neutral-800/50 hover:border-cyan-500/30 overflow-hidden"
        >
          {/* Subtle gradient hover effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/20 group-hover:via-cyan-500/50 group-hover:to-cyan-500/20 transition-all duration-700"></div>

          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex-1 w-full">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {post.project && (
                  <Link href={`/projects#${post.project.toLowerCase()}`}>
                    <span className="inline-flex items-center px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-mono font-medium hover:bg-cyan-500/20 transition-colors">
                      #{post.project}
                    </span>
                  </Link>
                )}
                <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-neutral-100 mb-4 tracking-tight group-hover:text-white transition-colors">
                {post.title}
              </h3>

              <div
                className="text-neutral-400 text-sm max-w-none line-clamp-3 mb-6 relative z-10"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
              />

              <Link href={`/blog/${post.id}`}>
                <button className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group/btn">
                  Access Record 
                  <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
