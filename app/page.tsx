import ScrollAnimation from "@/components/ScrollAnimation";
import BlogFeed from "@/components/BlogFeed";

export default function Home() {
  return (
    <main className="bg-neutral-950 text-white min-h-screen overflow-x-hidden relative">
      <ScrollAnimation />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center pt-16 md:pt-0">
        <div className="z-10 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
            Ernst-William Hertz
          </h1>
          <p className="text-lg md:text-2xl text-neutral-400 font-light tracking-wide max-w-2xl mx-auto">
            Full-Stack Developer • Author • Musician
          </p>
          <p className="text-sm md:text-base text-neutral-500 mt-4 max-w-xl mx-auto">
            Building digital experiences, crafting stories, and creating music.
          </p>
        </div>
      </section>

      {/* Blog/Twitter Feed Section */}
      <section className="relative w-full max-w-6xl mx-auto py-16 md:py-24 px-4 md:px-6 z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-100">
            Latest Thoughts
          </h2>
          <p className="text-neutral-400 text-lg">
            Reflections on development, writing, and life.
          </p>
        </div>

        <BlogFeed />
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-16 md:py-24 px-4 md:px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-100">
            Explore My Work
          </h2>
          <p className="text-neutral-400 mb-8">
            Check out my projects, music, and published book.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/projects"
              className="px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors font-medium"
            >
              View Projects
            </a>
            <a
              href="/music"
              className="px-6 py-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors font-medium"
            >
              Listen to Music
            </a>
            <a
              href="/book"
              className="px-6 py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors font-medium"
            >
              Read Book
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
