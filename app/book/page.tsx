import BookstoreLinks from "@/components/BookstoreLinks";
import Link from "next/link";
import { Book } from "lucide-react";

export default function BookPage() {
  return (
    <main className="bg-neutral-950 text-white min-h-screen overflow-x-hidden pt-32 md:pt-24 pb-16">
      <section className="w-full max-w-6xl mx-auto px-4 md:px-6 z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Book className="text-purple-400" size={32} />
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-100">
              Hatake Hugo - Memoirs from the Psychward
            </h1>
          </div>
          <p className="text-lg text-neutral-400 max-w-2xl">
            A raw, introspective memoir exploring life, mental health, and personal transformation.
          </p>
        </div>

        {/* Book Details Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6">
            <p className="text-sm text-neutral-500 uppercase tracking-wide mb-2">Genre</p>
            <p className="text-xl font-semibold text-neutral-100">Memoir / Essay</p>
          </div>
          <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6">
            <p className="text-sm text-neutral-500 uppercase tracking-wide mb-2">Status</p>
            <p className="text-xl font-semibold text-neutral-100">Published</p>
          </div>
          <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6">
            <p className="text-sm text-neutral-500 uppercase tracking-wide mb-2">Format</p>
            <p className="text-xl font-semibold text-neutral-100">Print & Ebook</p>
          </div>
        </div>

        {/* Book Excerpt */}
        <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-neutral-100">Overview</h2>
          <div className="space-y-4 text-neutral-400 leading-relaxed">
            <p>
              "Memoirs from the Psychward" is a deeply personal account of navigating mental
              health challenges, self-discovery, and the journey toward healing. Through honest
              storytelling and reflective essays, this memoir provides insights into the human
              experience during times of psychological struggle.
            </p>
            <p>
              The book blends personal narrative with philosophical reflection, offering readers
              a window into moments of crisis, breakthrough, and transformation. It's a testament
              to resilience and the power of confronting one's innermost thoughts.
            </p>
            <p>
              Ideal for readers interested in memoirs, mental health narratives, and personal
              essays that challenge conventional thinking.
            </p>
          </div>
        </div>

        {/* Bookstore Links */}
        <div className="mb-16">
          <BookstoreLinks
            bookTitle="Available Everywhere"
            bookDescription="Purchase or borrow from your favorite bookstore or library"
            links={[
              { name: "Amazon", url: "https://amazon.com", icon: "📕" },
              { name: "Apple Books", url: "https://books.apple.com", icon: "🍎" },
              {
                name: "Google Play Books",
                url: "https://play.google.com/books",
                icon: "🎮",
              },
              { name: "Goodreads", url: "https://goodreads.com", icon: "⭐" },
              {
                name: "Barnes & Noble",
                url: "https://barnesandnoble.com",
                icon: "📚",
              },
              { name: "IndieBound", url: "https://indieboundorg", icon: "🏪" },
              { name: "Smashwords", url: "https://smashwords.com", icon: "📱" },
              {
                name: "Draft2Digital",
                url: "https://draft2digital.com",
                icon: "✍️",
              },
              { name: "Kobo", url: "https://kobo.com", icon: "📖" },
              { name: "Scribd", url: "https://scribd.com", icon: "📄" },
              { name: "Wattpad", url: "https://wattpad.com", icon: "✨" },
              { name: "BookBaby", url: "https://bookbaby.com", icon: "👶" },
              { name: "Vook", url: "https://vook.co", icon: "🎬" },
              { name: "Everand", url: "https://everand.com", icon: "🔄" },
              {
                name: "Library Genesis",
                url: "https://libgen.rs",
                icon: "🔓",
              },
              {
                name: "Project Gutenberg",
                url: "https://gutenberg.org",
                icon: "🏛️",
              },
              {
                name: "Standard Ebooks",
                url: "https://standardebooks.org",
                icon: "🎨",
              },
              {
                name: "Tor Free Library",
                url: "https://tor.com/books",
                icon: "🌐",
              },
            ]}
          />
        </div>

        {/* Author Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
              About the Author
            </h3>
            <p className="text-neutral-400 mb-4">
              Ernst-William Hertz is a full-stack developer, entrepreneur, and writer. His work
              explores the intersections of technology, creativity, and human experience.
            </p>
            <p className="text-neutral-400">
              When not coding or writing, you can find him creating music or exploring new ideas
              that challenge conventional thinking.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-purple-400">
              Connect with the Author
            </h3>
            <div className="space-y-3">
              <Link
                href="https://hatakehugo.com"
                target="_blank"
                className="block text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                → Visit hatakehugo.com
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="block text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                → Follow on Twitter
              </Link>
              <Link
                href="mailto:contact@example.com"
                className="block text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                → Send an Email
              </Link>
            </div>
          </div>
        </div>

        {/* Reading Suggestions */}
        <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-neutral-100">
            Who Should Read This?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-cyan-400 font-semibold mb-2">✓ If you enjoy...</p>
              <ul className="text-neutral-400 space-y-1 text-sm">
                <li>• Personal memoirs and essays</li>
                <li>• Mental health narratives</li>
                <li>• Philosophical reflection</li>
                <li>• Raw, honest storytelling</li>
              </ul>
            </div>
            <div>
              <p className="text-cyan-400 font-semibold mb-2">✓ Perfect for...</p>
              <ul className="text-neutral-400 space-y-1 text-sm">
                <li>• Book clubs and reading groups</li>
                <li>• Mental health discussions</li>
                <li>• Personal development readers</li>
                <li>• Fans of contemporary essays</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
