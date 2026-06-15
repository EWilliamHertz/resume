'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function MusicPage() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    { title: 'Cardboard Crack', file: '/music/Cardboard Crack.mp3' },
    { title: 'The Anchor (Gloria)', file: '/music/The Anchor (Gloria).mp3' },
    { title: 'The Deep End', file: '/music/The Deep End.mp3' },
    { title: 'The Exile', file: '/music/The Exile.mp3' },
    { title: 'The Bleed', file: '/music/The Bleed.mp3' },
    { title: 'Burritos & Brothels (London)', file: '/music/Burritos & Brothels (London).mp3' },
    { title: '14 Days (Skara)', file: '/music/14 Days (Skara).mp3' },
    { title: 'Maximum to Medical (The Ward)', file: '/music/Maximum to Medical (The Ward).mp3' },
    { title: 'Nine Hours (Acceptance)', file: '/music/Nine Hours (Acceptance).mp3' },
  ];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.error('Playback failed:', err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play().catch(err => console.error('Playback failed:', err));
    }, 0);
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % tracks.length;
    playTrack(next);
  };

  const prevTrack = () => {
    const prev = (currentTrack - 1 + tracks.length) % tracks.length;
    playTrack(prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">🎵 Music</h1>
          <p className="text-lg text-slate-400">
            Explore my musical journey through <em>Memoirs from the Psychward</em>
          </p>
        </div>

        {/* Album Info */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 mb-8 border border-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center mb-6">
            {/* Album Cover */}
            <div className="flex justify-center">
              <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/book-cover.jpg"
                  alt="Memoirs from the Psychward - Album Cover"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Album Details */}
            <div>
              <h2 className="text-3xl font-bold mb-2">Memoirs from the Psychward</h2>
              <p className="text-xl text-slate-300 mb-4">by Hatake Hugo</p>
              
              <div className="space-y-3 mb-6">
                <p className="text-slate-400">
                  <strong>Released:</strong> 2026
                </p>
                <p className="text-slate-400">
                  <strong>Genre:</strong> HipHop/Rap
                </p>
                <p className="text-slate-400">
                  <strong>Tracks:</strong> {tracks.length}
                </p>
              </div>

              {/* Spotify Link */}
              <Link
                href="https://open.spotify.com/album/4q8XF0nGRkRkaR1xFTQS4h"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full font-semibold transition-colors"
              >
                🎵 Listen on Spotify
              </Link>
            </div>
          </div>
        </div>

        {/* Music Player */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 mb-8">
          <h3 className="text-xl font-bold mb-6">Now Playing</h3>

          <audio
            ref={audioRef}
            src={tracks[currentTrack].file}
            onEnded={nextTrack}
          />

          {/* Current Track */}
          <div className="bg-slate-950 rounded-lg p-4 mb-6">
            <p className="text-sm text-slate-400 mb-1">Track {currentTrack + 1} of {tracks.length}</p>
            <p className="text-2xl font-bold truncate">{tracks[currentTrack].title}</p>
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={prevTrack}
              className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
              title="Previous"
            >
              ⏮️
            </button>

            <button
              onClick={togglePlay}
              className="p-4 rounded-full bg-green-600 hover:bg-green-700 transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>

            <button
              onClick={nextTrack}
              className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
              title="Next"
            >
              ⏭️
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="0"
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = (parseInt(e.target.value) / 100) * (audioRef.current.duration || 0);
                }
              }}
              onInput={(e) => {
                if (audioRef.current) {
                  const percent = parseInt(e.currentTarget.value);
                  e.currentTarget.style.background = `linear-gradient(to right, #16a34a 0%, #16a34a ${percent}%, #475569 ${percent}%, #475569 100%)`;
                }
              }}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #16a34a 0%, #16a34a 0%, #475569 0%, #475569 100%)`
              }}
            />
          </div>
        </div>

        {/* Tracklist */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-6">Tracklist</h3>
          <div className="space-y-2">
            {tracks.map((track, index) => (
              <button
                key={index}
                onClick={() => playTrack(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  currentTrack === index
                    ? 'bg-green-600 font-semibold'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
              >
                <span className="text-slate-400 mr-3">{String(index + 1).padStart(2, '0')}</span>
                {track.title}
                {currentTrack === index && (
                  <span className="float-right ml-2">{isPlaying ? '🔊' : '▶️'}</span>
                )}
              </button>
            ))}
          </div>
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
