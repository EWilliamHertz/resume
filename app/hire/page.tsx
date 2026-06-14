export default function HirePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 pb-24">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Hire Me</h1>
        <p className="text-xl text-neutral-400">AI-hybrid full-stack development and strategic technical consulting.</p>
      </header>

      <div className="prose prose-invert prose-neutral max-w-none">
        <h3 className="text-2xl font-medium mb-4">The Workflow</h3>
        <p className="text-neutral-300 leading-relaxed mb-8">
          I utilize an advanced AI-hybrid workflow, leveraging LLMs and tools like Vercel and Next.js to rapidly bridge the gap between complex conceptualization and production-ready code. This allows for massive reductions in development time while maintaining scalable, type-safe architectures.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 border border-neutral-800 rounded-xl bg-neutral-900/50">
            <h4 className="text-lg font-semibold mb-2">Technical Stack</h4>
            <ul className="text-neutral-400 space-y-2 text-sm">
              <li>• Next.js / React (App Router)</li>
              <li>• TypeScript & Tailwind CSS</li>
              <li>• PostgreSQL & Supabase</li>
              <li>• React Three Fiber (3D WebGL)</li>
            </ul>
          </div>
          <div className="p-6 border border-neutral-800 rounded-xl bg-neutral-900/50">
            <h4 className="text-lg font-semibold mb-2">Core Competencies</h4>
            <ul className="text-neutral-400 space-y-2 text-sm">
              <li>• Rapid MVP Prototyping</li>
              <li>• Marketplace & Social Architectures</li>
              <li>• API Integration & Proxy Routing</li>
              <li>• Game Development Logic</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="/contact" className="inline-block bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold px-8 py-4 rounded-full transition-colors">
            Initiate a Project
          </a>
        </div>
      </div>
    </main>
  );
}