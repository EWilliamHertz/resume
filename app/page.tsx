import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
// import MusicPlayer from "@/components/MusicPlayer";
// import HeroCanvas from "@/components/3d/HeroCanvas";

export default function Home() {
  return (
    <main className="bg-neutral-950 text-white min-h-screen overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Top Nav / Music Player Placeholder */}
      <nav className="fixed top-0 w-full z-50 p-4 flex justify-end">
         {/* <MusicPlayer /> - Spotify/YT integration will go here */}
         <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full px-6 py-2 text-sm text-neutral-400">
            [ Music Player Paused ]
         </div>
      </nav>

      {/* 3D Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0 flex items-center justify-center border-b border-neutral-900">
            {/* <HeroCanvas /> */}
            <span className="text-neutral-800">[ 3D Canvas Context ]</span>
        </div>
        
        <div className="z-10 text-center pointer-events-none drop-shadow-2xl">
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
        <h2 className="text-4xl font-semibold mb-16 text-neutral-200">The Ecosystem</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col border border-neutral-800/50 bg-neutral-900/30 rounded-2xl overflow-hidden backdrop-blur-md transition-all hover:border-neutral-600"
            >
              {/* Printscreen Container */}
              <div className="relative w-full h-64 bg-neutral-900 border-b border-neutral-800/50 overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={`Screenshot of ${project.name}`}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  // Fallback for missing images during dev
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-neutral-800 bg-neutral-950/50 -z-10">
                   [ Printscreen needed ]
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-medium mb-2">{project.name}</h3>
                <p className="text-neutral-400 mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex gap-4 mt-auto">
                  <Link 
                    href={project.vercel}
                    target="_blank"
                    className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/20 transition-colors"
                  >
                    Live on Vercel
                  </Link>
                  <Link 
                    href={project.github}
                    target="_blank"
                    className="px-4 py-2 border border-neutral-700 text-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                  >
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}