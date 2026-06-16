import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

const prisma = new PrismaClient();
export const revalidate = 60;

export default async function ExperienceDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const exp = await prisma.workExperience.findUnique({
    where: { id }
  });

  if (!exp) notFound();

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
    <article className="max-w-4xl mx-auto px-6 py-12 relative pb-32">
      <Link href="/experience" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-12">
        <ArrowLeft size={16} /> Return to Log
      </Link>

      <header className="mb-12 border-b border-neutral-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{exp.title}</h1>
        <h2 className="text-2xl text-cyan-400 mb-6">{exp.company}</h2>
        <div className="flex gap-4 items-center text-neutral-400 font-mono text-sm bg-neutral-900/50 inline-flex px-4 py-2 rounded-lg border border-neutral-800">
          <span>{format(new Date(exp.startDate), 'MMM yyyy')}</span>
          <span>—</span>
          <span>{exp.current ? 'Present' : exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : 'Unknown'}</span>
        </div>
      </header>

      {/* The content utilizes RichText editor, capable of rendering embedded videos and images */}
      <div className="prose prose-invert prose-cyan max-w-none prose-p:leading-relaxed prose-pre:bg-neutral-900 prose-img:rounded-xl text-neutral-300 text-lg leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(exp.content) }} />
      </div>
    </article>
  );
}