import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="bg-neutral-950 text-white min-h-screen overflow-x-hidden pt-32 md:pt-24 pb-16">
      <section className="w-full max-w-6xl mx-auto px-4 md:px-6 z-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-neutral-100">
            Projects
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            A collection of applications, tools, and experiments I've built. Each project
            represents a unique solution to a specific problem or exploration of an idea.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group flex flex-col border border-neutral-800/50 bg-neutral-900/30 rounded-2xl overflow-hidden backdrop-blur-md transition-all hover:border-neutral-600"
            >
              {/* Project Image */}
              <div className="relative w-full h-64 bg-neutral-900 border-b border-neutral-800/50 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.name}`}
                  fill
                  className="object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Project Info */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold mb-2 text-neutral-100 group-hover:text-cyan-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-neutral-400 mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Link
                    href={project.vercel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/20 transition-colors text-center"
                  >
                    Live Demo
                  </Link>
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-neutral-700 text-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors text-center"
                  >
                    Source Code
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Projects Note */}
        <div className="mt-16 text-center">
          <p className="text-neutral-400">
            More projects coming soon. Check back regularly for updates!
          </p>
        </div>
      </section>
    </main>
  );
}
