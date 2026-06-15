import Link from "next/link";
import MusicPlayer from "@/components/MusicPlayer";

export default function MusicPage() {
  return (
    <main className="bg-neutral-950 text-white min-h-screen pt-32 pb-24">
      <section className="relative w-full max-w-4xl mx-auto px-6 z-10 flex flex-col items-center">
        <div className="mb-12 w-full">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition">
            ← Back Home
          </Link>
        </div>
        
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Acoustic Logs</h1>
          <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto">
            The complete discography and audio records.
          </p>
        </header>

        {/* The MusicPlayer now automatically connects to the global MusicContext */}
        <MusicPlayer />
      </section>
    </main>
  );
}