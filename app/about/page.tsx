'use client';

import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-12">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition">
            ← Back Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            About <span className="text-cyan-400">Ernst-William</span>
          </h1>
          <p className="text-xl text-gray-400">
            Entrepreneur, Builder, and Creative Technologist
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Who I Am</h2>
              <p className="text-gray-300 leading-relaxed">
                I'm a Swedish entrepreneur with a passion for building meaningful products and businesses.
                With a background in product development and business strategy, I focus on creating solutions
                that solve real problems and bring value to communities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">My Work</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                I've founded and worked on several ventures spanning different industries—from trading card gaming
                to AI-powered tools. Each project represents a learning experience and a step toward understanding
                what it takes to build sustainable businesses.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My latest focus is on combining technology with community building, creating platforms and products
                that connect people and enable growth.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">What I Value</h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">→</span>
                  <span>Authenticity and genuine connection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">→</span>
                  <span>Innovation grounded in real-world needs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">→</span>
                  <span>Building communities, not just products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">→</span>
                  <span>Continuous learning and growth</span>
                </li>
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 sticky top-20">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Quick Facts</h3>
              <ul className="space-y-4 text-sm text-gray-300">
                <li>
                  <span className="text-cyan-400 font-semibold">Location:</span>
                  <br />Sweden
                </li>
                <li>
                  <span className="text-cyan-400 font-semibold">Focus:</span>
                  <br />Building startups & communities
                </li>
                <li>
                  <span className="text-cyan-400 font-semibold">Interests:</span>
                  <br />Trading cards, AI, Music, Books
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
          <p className="text-gray-300 mb-6">
            Interested in collaborating or discussing ideas? I'd love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
