import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PrismaClient } from "@prisma/client";




// Initialize Prisma client directly in the server component
const prisma = new PrismaClient();




// Optional: Control cache behavior. This revalidates the cache every 60 seconds.
export const revalidate = 60;




export default async function ProjectsPage() {
  // Fetch data directly from the database server-side
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: [
      { sortOrder: "asc" },
      { createdAt: "desc" }
    ],
  });




  return (
    <main className="bg-neutral-950 text-white min-h-screen pt-32 pb-24">
      <section className="relative w-full max-w-7xl mx-auto px-6 z-10">
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">The Ecosystem</h1>
          <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto">
            A dynamic ledger of development, physical logistics, and creative architecture.
          </p>
        </header>
        
        {projects.length === 0 ? (
          <div className="text-center py-20 border border-neutral-800/50 rounded-2xl bg-neutral-900/30">
            <p className="text-neutral-500 text-lg">No ecosystems currently active on the public ledger.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group flex flex-col border border-neutral-800/50 bg-neutral-900/30 rounded-2xl overflow-hidden backdrop-blur-md transition-all hover:border-cyan-500/30"
              >
                <div className="relative w-full h-72 bg-neutral-900 border-b border-neutral-800/50 overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <img 
                      src={project.images[0]} 
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-700 bg-neutral-950/50">
                       [ Classified ]
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-neutral-100 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-neutral-400 mb-8 flex-grow line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <Link 
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group/btn mt-auto"
                  >
                    Examine Architecture
                    <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}