import { notFound } from "next/navigation";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { ArrowLeft, Github, Globe } from "lucide-react";

const prisma = new PrismaClient();

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!project || !project.published) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-12 transition-colors font-medium text-sm uppercase tracking-wider"
        >
          <ArrowLeft size={16} /> Back to Ecosystem
        </Link>

        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6">{project.title}</h1>
          <div className="flex gap-4 flex-wrap">
            {project.vercel && (
              <a href={project.vercel} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg text-sm font-medium hover:bg-cyan-500/20 transition-colors flex items-center gap-2">
                <Globe size={16} /> Access Live Deployment
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-neutral-900 border border-neutral-700 text-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2">
                <Github size={16} /> Source Code
              </a>
            )}
          </div>
        </header>

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {project.images.map((img, idx) => (
              <div key={idx} className={`rounded-xl overflow-hidden border border-neutral-800 ${idx === 0 ? 'md:col-span-2' : ''}`}>
                <img src={img} alt={`${project.title} Preview ${idx + 1}`} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        )}

        <div className="prose prose-invert max-w-none text-neutral-300 text-lg leading-relaxed whitespace-pre-wrap">
          {project.description}
        </div>
      </div>
    </main>
  );
}