import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { ArrowRight } from "lucide-react";

// Prevent multiple Prisma instances in dev mode
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default async function Home() {
  let liveProjects: any[] = [];
  let recentPosts: any[] = [];

  // Bulletproof try/catch to prevent crashes during database syncing
  try {
    liveProjects = await prisma.project.findMany({
      where: { published: true },
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "desc" }
      ],
    });

    recentPosts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3, // Show only the latest 3 broadcasts on the homepage
    });
  } catch (error) {
    console.error("Database connection issue. Awaiting sync...");
  }

  // Lightweight markdown parser for the homepage preview
  const renderMarkdownPreview = (markdown: string) => {
    if (!markdown) return "";
    return markdown
      .replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>")
      .replace(/_(.+?)_/g, "<em class='text-cyan-200'>$1</em>")
      .replace(/## (.*)/g, "<strong class='text-white block mt-2'>$1</strong>")
      .replace(/# (.*)/g, "<strong class='text-white block mt-2'>$1</strong>")
      // Instead of rendering massive images on the homepage feed, we show a sleek tag
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<span class="text-cyan-500 text-xs font-mono border border-cyan-900 bg-cyan-950/30 px-2 py-1 rounded inline-block my-2">[ Image Attached: Access record to view ]</span>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<span class="text-cyan-400 underline decoration-cyan-500/30">$1</span>')
      .replace(/\n\n/g, "<br /><br />")
      .replace(/\n/g, "<br />");
  };

  return (
    <main className="bg-neutral-950 text-white min-h-screen overflow-x-hidden selection:bg-cyan-500/30 pb-32">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center border-b border-neutral-900">
        <div className="z-10 text-center pointer-events-none drop-shadow-2xl px-6">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
            Ernst-William Hertz
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide max-w-2xl mx-auto">
            Developer. Author. Entrepreneur.
          </p>
        </div>
      </section>

      {/* Project Ecosystem Showcase */}
      <section className="relative w-full max-w-7xl mx-auto py-24 px-6 z-10">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl font-semibold text-neutral-200">The Ecosystem</h2>
          <Link href="/projects" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 font-medium text-sm">
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
        
        {liveProjects.length === 0 ? (
           <div className="text-center py-20 border border-neutral-800/50 rounded-2xl bg-neutral-900/30 backdrop-blur-sm">
            <p className="text-neutral-500 text-lg">No public ecosystems active yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {liveProjects.map((project) => (
              <div 
                key={project.id} 
                className="group flex flex-col border border-neutral-800/50 bg-neutral-900/30 rounded-2xl overflow-hidden backdrop-blur-md transition-all hover:border-cyan-500/30"
              >
                <div className="relative w-full h-64 bg-neutral-900 border-b border-neutral-800/50 overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <img 
                      src={project.images[0]} 
                      alt={`Screenshot of ${project.title}`}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-800 bg-neutral-950/50 -z-10 font-mono text-sm uppercase tracking-widest">
                       [ Image Render Pending ]
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-neutral-400 mb-6 flex-grow line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex gap-4 mt-auto flex-wrap">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="px-5 py-2.5 bg-cyan-500/10 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/20 transition-colors"
                    >
                      Examine Architecture
                    </Link>
                    {project.vercel && (
                      <a 
                        href={project.vercel}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 border border-neutral-700 text-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                      >
                        Live System
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Live Feed / Blog Section */}
      <section className="relative w-full max-w-4xl mx-auto py-12 px-6 z-10 border-t border-neutral-900">
         <div className="flex items-center justify-between mb-12">
           <div>
             <h2 className="text-3xl font-semibold text-neutral-200 flex items-center gap-3">
                Live Broadcasts
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
             </h2>
           </div>
           <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 font-medium text-sm">
             View Feed <ArrowRight size={16} />
           </Link>
         </div>
         
         {recentPosts.length === 0 ? (
           <div className="text-center py-12 border border-neutral-800/50 rounded-2xl bg-neutral-900/30 backdrop-blur-sm">
            <p className="text-neutral-500">No broadcasts found. The feed is currently dark.</p>
          </div>
         ) : (
           <div className="space-y-6">
              {recentPosts.map((post) => (
                <div key={post.id} className="p-6 border-l-2 border-cyan-500 bg-gradient-to-r from-neutral-900/80 to-transparent hover:from-neutral-800/80 transition-colors rounded-r-xl">
                   <div className="flex flex-wrap items-center gap-3 mb-3">
                     {post.project && (
                       <Link href={`/projects#${post.project.toLowerCase()}`}>
                         <span className="text-xs font-mono text-cyan-500 px-2 py-1 bg-cyan-500/10 rounded-full hover:bg-cyan-500/20 transition-colors cursor-pointer">
                           #{post.project}
                         </span>
                       </Link>
                     )}
                     <span className="text-xs text-neutral-500 font-mono uppercase">
                       {new Date(post.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                     </span>
                   </div>
                   
                   <Link href={`/blog/${post.id}`}>
                     <h3 className="text-xl font-bold text-white mb-2 hover:text-cyan-400 transition-colors">{post.title}</h3>
                   </Link>

                   <div 
                     className="text-neutral-400 text-sm line-clamp-2 leading-relaxed mb-4"
                     dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(post.content) }}
                   />
                   
                   <Link href={`/blog/${post.id}`}>
                     <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                       Access Record <ArrowRight size={14} />
                     </button>
                   </Link>
                </div>
              ))}
           </div>
         )}
      </section>
      
    </main>
  );
}