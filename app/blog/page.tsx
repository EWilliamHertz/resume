"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Filter, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  project?: string;
  createdAt: string;
  published: boolean;
}

export default function BlogHub() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Sorting and Filtering State
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedProject, setSelectedProject] = useState<string>("all");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/blog?published=true&t=${Date.now()}`, { cache: "no-store" });
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

  // Extract unique projects for the filter dropdown
  const uniqueProjects = Array.from(new Set(posts.map(p => p.project).filter(Boolean))) as string[];

  // Apply filters and sorting
  const filteredAndSortedPosts = posts
    .filter(post => selectedProject === "all" || post.project === selectedProject)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  // Hydration-safe markdown parser supporting single line breaks
  const renderMarkdown = (markdown: string) => {
    if (!markdown) return "";
    let html = markdown
      .replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>")
      .replace(/_(.+?)_/g, "<em class='text-cyan-200'>$1</em>")
      .replace(/## (.*)/g, "<h2 class='text-xl font-bold text-white mt-4 mb-2 block'>$1</h2>")
      .replace(/# (.*)/g, "<h1 class='text-2xl font-bold text-white mt-4 mb-2 block'>$1</h1>")
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="w-full h-auto rounded-lg border border-neutral-800 my-4 shadow-xl opacity-80 block" />')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/30">$1</a>')
      .replace(/\n\n/g, "<br /><br />") // Standard double spacing
      .replace(/\n/g, "<br />");       // Support for Shift+Enter

    return html;
  };

  return (
    <main className="min-h-screen bg-neutral-950 pb-32">
      {/* Hero Header */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center border-b border-neutral-900">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6">
          The Broadcast
        </h1>
        <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto">
          Intel, updates, and chronological dispatches from the ecosystem.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pt-12">
        {/* Controls Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-neutral-900/50 border border-neutral-800/50 p-4 rounded-2xl mb-12 backdrop-blur-md">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter size={18} className="text-cyan-500" />
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 text-neutral-300 text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors w-full md:w-48"
            >
              <option value="all">All Systems</option>
              {uniqueProjects.map(proj => (
                <option key={proj} value={proj}>{proj}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Clock size={18} className="text-cyan-500" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
              className="bg-neutral-950 border border-neutral-800 text-neutral-300 text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors w-full md:w-48"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Feed Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-cyan-500" size={40} />
          </div>
        ) : filteredAndSortedPosts.length === 0 ? (
          <div className="text-center py-20 border border-neutral-800/50 rounded-2xl bg-neutral-900/30 backdrop-blur-sm">
            <p className="text-neutral-500 text-lg">No signals match these parameters.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredAndSortedPosts.map((post) => (
              <article
                key={post.id}
                className="group relative bg-neutral-900/40 backdrop-blur-md rounded-2xl p-8 hover:bg-neutral-900/60 transition-all duration-500 border border-neutral-800/50 hover:border-cyan-500/30 overflow-hidden"
              >
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
                      className="text-neutral-400 text-sm max-w-none line-clamp-3 mb-6 relative z-10 leading-relaxed"
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
        )}
      </section>
    </main>
  );
}