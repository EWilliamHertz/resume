'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Bookstore {
  name: string;
  url: string;
  icon: string;
}

const bookstores: Bookstore[] = [
  {
    name: 'Amazon US',
    url: 'https://amazon.com/Memoirs-Psych-Ward-Hatake-Hugo/dp/1967109087',
    icon: '📚',
  },
  {
    name: 'Amazon UK',
    url: 'https://amazon.co.uk/s?k=Memoirs+from+the+Psychward+Hatake+Hugo',
    icon: '📚',
  },
  {
    name: 'Amazon DE',
    url: 'https://amazon.de/s?k=Memoirs+from+the+Psychward+Hatake+Hugo',
    icon: '📚',
  },
  {
    name: 'Amazon SE',
    url: 'https://amazon.se/s?k=Memoirs+from+the+Psychward+Hatake+Hugo',
    icon: '📚',
  },
  {
    name: 'Goodreads',
    url: 'https://www.goodreads.com/search?q=Memoirs+from+the+Psychward+Hatake+Hugo',
    icon: '⭐',
  },
  {
    name: 'Apple Books',
    url: 'https://books.apple.com/search?q=Memoirs+from+the+Psychward',
    icon: '📖',
  },
  {
    name: 'Google Play Books',
    url: 'https://play.google.com/store/search?q=Memoirs+from+the+Psychward&c=books',
    icon: '📕',
  },
  {
    name: 'Barnes & Noble',
    url: 'https://www.barnesandnoble.com/s/Memoirs+from+the+Psychward',
    icon: '📚',
  },
  {
    name: 'Smashwords',
    url: 'https://www.smashwords.com/search?query=Memoirs+from+the+Psychward',
    icon: '📄',
  },
  {
    name: 'Draft2Digital',
    url: 'https://www.draft2digital.com/books',
    icon: '✍️',
  },
  {
    name: 'Indie Bound',
    url: 'https://www.indiebound.org/search/book',
    icon: '🏪',
  },
  {
    name: 'World of Books',
    url: 'https://www.worldofbooks.com/en-gb',
    icon: '🌍',
  },
  {
    name: 'Book Depository',
    url: 'https://www.bookdepository.com/search?searchTerm=Memoirs+from+the+Psychward',
    icon: '📦',
  },
  {
    name: 'Waterstones',
    url: 'https://www.waterstones.com/search?query=Memoirs+from+the+Psychward',
    icon: '🏛️',
  },
  {
    name: 'Scribd',
    url: 'https://www.scribd.com/search?query=Memoirs+from+the+Psychward',
    icon: '📱',
  },
  {
    name: 'Wattpad',
    url: 'https://www.wattpad.com/search/Memoirs%20from%20the%20Psychward',
    icon: '✨',
  },
  {
    name: 'Open Library',
    url: 'https://openlibrary.org/search?q=Memoirs+from+the+Psychward',
    icon: '🔓',
  },
  {
    name: 'Local Bookstores',
    url: 'https://www.indiebound.org/search/book',
    icon: '🛍️',
  },
];

export default function Book() {
  const [showAllStores, setShowAllStores] = useState(false);
  const visibleStores = showAllStores ? bookstores : bookstores.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-12">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition">
            ← Back Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-cyan-400">Memoirs from the Psychward</span>
          </h1>
          <p className="text-xl text-gray-400">by Hatake Hugo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Cover & Main Info */}
          <div className="md:col-span-1">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden sticky top-20">
              {/* Book Cover Placeholder */}
              <div className="aspect-[3/4] bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-6xl">
                📕
              </div>

              {/* Book Details */}
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Genre</p>
                  <p className="font-semibold">Memoir / Biography</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Author</p>
                  <p className="font-semibold">Hatake Hugo</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Language</p>
                  <p className="font-semibold">English</p>
                </div>

                {/* Primary CTA */}
                <a
                  href="https://amazon.com/Memoirs-Psych-Ward-Hatake-Hugo/dp/1967109087"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition text-center"
                >
                  Read on Amazon
                </a>
              </div>
            </div>
          </div>

          {/* Description & Bookstores */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">About the Book</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                "Memoirs from the Psychward" is a gripping autobiographical journey that takes readers through
                the author's personal struggles, victories, and transformations. With raw honesty and vivid storytelling,
                Hatake Hugo shares his experiences navigating the complexities of mental health, entrepreneurship, and the human spirit.
              </p>
              <p className="text-gray-300 leading-relaxed">
                This memoir is a testament to resilience, the power of genuine connections, and the importance of never giving up
                on your dreams, no matter what challenges life throws your way. Perfect for anyone seeking inspiration and authentic
                narratives about the human experience.
              </p>
            </section>

            {/* Key Themes */}
            <section>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Key Themes</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Mental Health & Healing',
                  'Entrepreneurship',
                  'Personal Growth',
                  'Community Building',
                  'Resilience',
                  'Finding Your Purpose',
                ].map((theme, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center gap-2"
                  >
                    <span className="text-cyan-400">✓</span>
                    <span className="text-sm">{theme}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Bookstores Section */}
            <section>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Where to Buy</h2>
              <p className="text-gray-400 mb-6 text-sm">
                Available on multiple platforms. Choose your preferred bookstore:
              </p>

              {/* Bookstore Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {visibleStores.map((store, idx) => (
                  <a
                    key={idx}
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-gray-900/50 hover:bg-gray-800/70 border border-gray-800 hover:border-cyan-400/50 rounded-lg transition group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{store.icon}</span>
                      <span className="font-semibold group-hover:text-cyan-400 transition">
                        {store.name}
                      </span>
                      <span className="ml-auto text-cyan-400 opacity-0 group-hover:opacity-100 transition">
                        →
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Show More Button */}
              {!showAllStores && bookstores.length > 6 && (
                <button
                  onClick={() => setShowAllStores(true)}
                  className="w-full p-3 bg-gray-900/50 hover:bg-gray-800 border border-gray-800 rounded-lg flex items-center justify-center gap-2 transition text-cyan-400 hover:text-cyan-300"
                >
                  <span>See {bookstores.length - 6} More Bookstores</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}

              {showAllStores && (
                <button
                  onClick={() => setShowAllStores(false)}
                  className="w-full p-3 bg-gray-900/50 hover:bg-gray-800 border border-gray-800 rounded-lg text-gray-400 text-sm transition"
                >
                  Show Less
                </button>
              )}
            </section>

            {/* Reader Reviews */}
            <section>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">What Readers Say</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm italic">
                    "A powerful and honest memoir that left me inspired and moved."
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Read?</h2>
          <p className="text-gray-300 mb-6">
            Pick your favorite bookstore above or start with Amazon.
          </p>
          <a
            href="https://amazon.com/Memoirs-Psych-Ward-Hatake-Hugo/dp/1967109087"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition"
          >
            Get the Book
          </a>
        </div>
      </div>
    </div>
  );
}
