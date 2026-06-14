"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface BookstoreLinkProps {
  name: string;
  url: string;
  icon?: string;
}

interface BookstoreLinksProps {
  bookTitle: string;
  bookDescription?: string;
  links?: BookstoreLinkProps[];
}

// Default comprehensive bookstore list
const defaultBookstores: BookstoreLinkProps[] = [
  { name: "Amazon", url: "https://amazon.com", icon: "📕" },
  { name: "Apple Books", url: "https://books.apple.com", icon: "🍎" },
  { name: "Google Play Books", url: "https://play.google.com/books", icon: "🎮" },
  { name: "Goodreads", url: "https://goodreads.com", icon: "⭐" },
  { name: "Barnes & Noble", url: "https://barnesandnoble.com", icon: "📚" },
  { name: "IndieBound", url: "https://indieboundorg", icon: "🏪" },
  { name: "Smashwords", url: "https://smashwords.com", icon: "📱" },
  { name: "Draft2Digital", url: "https://draft2digital.com", icon: "✍️" },
  { name: "Kobo", url: "https://kobo.com", icon: "📖" },
  { name: "Scribd", url: "https://scribd.com", icon: "📄" },
  { name: "Wattpad", url: "https://wattpad.com", icon: "✨" },
  { name: "BookBaby", url: "https://bookbaby.com", icon: "👶" },
  { name: "Vook", url: "https://vook.co", icon: "🎬" },
  { name: "Everand", url: "https://everand.com", icon: "🔄" },
  { name: "Library Genesis", url: "https://libgen.rs", icon: "🔓" },
  { name: "Project Gutenberg", url: "https://gutenberg.org", icon: "🏛️" },
  { name: "Standard Ebooks", url: "https://standardebooks.org", icon: "🎨" },
  { name: "Tor Free Library", url: "https://tor.com/books", icon: "🌐" },
];

export default function BookstoreLinks({
  bookTitle,
  bookDescription,
  links = defaultBookstores,
}: BookstoreLinksProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-8">
      <h3 className="text-3xl font-semibold mb-2 text-neutral-100">
        {bookTitle}
      </h3>
      {bookDescription && (
        <p className="text-neutral-400 mb-6">{bookDescription}</p>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg font-medium transition-all"
      >
        <span>
          {isOpen
            ? `Hide bookstores (${links.length})`
            : `Discover on ${links.length} Platforms`}
        </span>
        <ChevronDown
          size={20}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 bg-neutral-800/50 hover:bg-neutral-700/50 rounded-lg transition-colors group"
            >
              {link.icon && <span className="text-xl">{link.icon}</span>}
              <span className="font-medium text-neutral-200 group-hover:text-cyan-400 transition-colors">
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
