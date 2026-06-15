import { notFound } from "next/navigation";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { ArrowLeft } from "lucide-react";

const prisma = new PrismaClient();

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!post || !post.published) {
    notFound();
  }

  // Hydration-safe markdown parser supporting single line breaks
  const renderMarkdown = (markdown: string) => {
    if (!markdown) return "";
    let html = markdown
      .replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>")
      .replace(/_(.+?)_/g, "<em class='text-cyan-200'>$1</em>")
      .replace(/## (.*)/g, "<h2 class='text-3xl font-bold text-white mt-12 mb-6 tracking-tight block'>$1</h2>")
      .replace(/# (.*)/g, "<h1 class='text-4xl font-bold text-white mt-12 mb-6 tracking-tight block'>$1</h1>")
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="w-full h-auto rounded-xl border border-neutral-800 my-10 shadow-2xl block" />')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/30 underline-offset-4 transition-colors">$1</a>')
      .replace(/\n\n/g, "<br /><br />") // Standard double spacing
      .replace(/\n/g, "<br />");       // Support for Shift+Enter

    return html;
  };

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-12 transition-colors font-medium text-sm uppercase tracking-wider"
        >
          <ArrowLeft size={16} /> Back to Broadcasts
        </Link>

        <article className="relative">
          <header className="mb-16">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {post.project && (
                <Link href={`/projects#${post.project.toLowerCase()}`}>
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-mono font-medium hover:bg-cyan-500/20 transition-colors">
                    #{post.project}
                  </span>
                </Link>
              )}
              <span className="text-neutral-500 text-sm font-mono">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-tight">
              {post.title}
            </h1>
          </header>

          <div
            className="prose prose-invert max-w-none border-t border-neutral-900 pt-12 text-neutral-300 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </article>

        <div className="mt-24 pt-8 border-t border-neutral-900">
          <Link href="/blog">
            <button className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 border border-neutral-800 transition-colors font-medium">
              Return to Feed
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}