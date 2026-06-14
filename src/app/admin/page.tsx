import { projects } from "@/data/projects";

// Note: In production, this route MUST be protected by NextAuth or middleware
export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-12 font-mono">
      <header className="mb-12 border-b border-neutral-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-red-500">Admin Console</h1>
          <p className="text-neutral-500 mt-2">Cloud Shell Rotation & Env Vault</p>
        </div>
        <button className="bg-red-500/10 text-red-500 border border-red-500/50 px-4 py-2 rounded">
          Lock Console
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div key={idx} className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{project.name}</h2>
              <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400">
                {project.repo}
              </span>
            </div>

            {/* Quick Clone Script */}
            <div className="mb-6">
              <label className="text-xs text-neutral-500 uppercase tracking-wider mb-2 block">
                Cloud Shell Quick-Clone
              </label>
              <div className="bg-black p-3 rounded flex justify-between items-center border border-neutral-800">
                <code className="text-green-400 text-sm">
                  git clone {project.github}.git && cd {project.repo} && npm i
                </code>
              </div>
            </div>

            {/* Secure Env Vault */}
            <div>
              <label className="text-xs text-neutral-500 uppercase tracking-wider mb-2 flex justify-between">
                <span>Production .env variables</span>
                <span className="text-red-400 cursor-pointer">Edit</span>
              </label>
              <textarea 
                className="w-full h-32 bg-black border border-neutral-800 rounded p-3 text-sm text-neutral-300 font-mono resize-none focus:outline-none focus:border-red-500 transition-colors"
                defaultValue={`# Copy to .env.local\nNEXT_PUBLIC_API_URL=\nDATABASE_URL=\n`}
                readOnly
              />
            </div>
            
            <div className="mt-4 flex gap-2">
              <button className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-sm rounded transition-colors">
                Upload Project Docs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}