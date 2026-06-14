'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function BookPage() {
  const [showAllStores, setShowAllStores] = useState(false);

  const primaryStores = [
    {
      name: 'Amazon',
      url: 'https://amazon.com/Memoirs-Psych-Ward-Hatake-Hugo/dp/1967109087',
      emoji: '📦'
    },
    {
      name: 'Goodreads',
      url: 'https://www.goodreads.com/',
      emoji: '⭐'
    },
    {
      name: 'Apple Books',
      url: 'https://books.apple.com/',
      emoji: '🍎'
    }
  ];

  const allStores = [
    {
      name: 'Amazon',
      url: 'https://amazon.com/Memoirs-Psych-Ward-Hatake-Hugo/dp/1967109087',
      emoji: '📦'
    },
    {
      name: 'Goodreads',
      url: 'https://www.goodreads.com/',
      emoji: '⭐'
    },
    {
      name: 'Apple Books',
      url: 'https://books.apple.com/',
      emoji: '🍎'
    },
    {
      name: 'Google Play Books',
      url: 'https://play.google.com/store/books',
      emoji: '🔍'
    },
    {
      name: 'Kobo',
      url: 'https://www.kobo.com/',
      emoji: '📱'
    },
    {
      name: 'Barnes & Noble',
      url: 'https://www.barnesandnoble.com/',
      emoji: '📚'
    },
    {
      name: 'Powell\'s Books',
      url: 'https://www.powells.com/',
      emoji: '🏪'
    },
    {
      name: 'IndieBound',
      url: 'https://www.indieboundcom/',
      emoji: '🎯'
    },
    {
      name: 'ThriftBooks',
      url: 'https://www.thriftbooks.com/',
      emoji: '♻️'
    },
    {
      name: 'Better World Books',
      url: 'https://www.betterworldbooks.com/',
      emoji: '🌍'
    },
    {
      name: 'Scribd',
      url: 'https://www.scribd.com/',
      emoji: '📖'
    },
    {
      name: 'Smashwords',
      url: 'https://www.smashwords.com/',
      emoji: '⚡'
    },
    {
      name: 'Draft2Digital',
      url: 'https://www.draft2digital.com/',
      emoji: '✍️'
    },
    {
      name: 'Wattpad',
      url: 'https://www.wattpad.com/',
      emoji: '🌟'
    },
    {
      name: 'Inkitt',
      url: 'https://www.inkitt.com/',
      emoji: '🖊️'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">📚 Book</h1>
          <p className="text-lg text-slate-400">
            My published autobiography and journey
          </p>
        </div>

        {/* Book Display */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 mb-8 border border-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            {/* Book Cover */}
            <div className="flex justify-center">
              <div className="relative w-56 h-80 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/book-cover.jpg"
                  alt="Memoirs from the Psychward - Book Cover"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Memoirs from the Psychward</h2>
                <p className="text-xl text-slate-300">by Hatake Hugo</p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-500">ISBN</p>
                  <p className="text-lg font-mono">1967109087</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Published</p>
                  <p className="text-lg">2026</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Genre</p>
                  <p className="text-lg">Autobiography / Memoir</p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed">
                A powerful and candid account of my journey through recovery and self-discovery. 
                This memoir offers insights into resilience, hope, and the human spirit.
              </p>

              {/* Primary Store Links */}
              <div className="space-y-3 pt-4">
                {primaryStores.map((store) => (
                  <Link
                    key={store.name}
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-lg transition-colors text-center font-semibold"
                  >
                    {store.emoji} {store.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Bookstores */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold mb-6">Available at {allStores.length} Bookstores</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {(showAllStores ? allStores : allStores.slice(0, 9)).map((store) => (
              <Link
                key={store.name}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-lg transition-colors text-center font-semibold text-sm"
              >
                <span className="block text-lg mb-1">{store.emoji}</span>
                <span className="text-xs sm:text-sm">{store.name}</span>
              </Link>
            ))}
          </div>

          {/* Toggle More Stores */}
          {!showAllStores && (
            <button
              onClick={() => setShowAllStores(true)}
              className="w-full bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg transition-colors font-semibold"
            >
              See {allStores.length - 9} More Bookstores
            </button>
          )}

          {showAllStores && (
            <button
              onClick={() => setShowAllStores(false)}
              className="w-full bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg transition-colors font-semibold"
            >
              Show Less
            </button>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-12">
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
