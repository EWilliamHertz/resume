'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const SPOTIFY_ALBUM = 'https://open.spotify.com/album/4q8XF0nGRkRkaR1xFTQS4h';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

const tracks: Track[] = [
  // Add your tracks here with MP3 files in /public/music/
  // Example:
  // { id: 1, title: "Song Title", artist: "Ernst-William", duration: "3:45" }
];

export default function Music() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (trackId: number) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying);
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
    } else {
      setCurrentTrack(trackId);
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    if (currentTrack && currentTrack < tracks.length) {
      setCurrentTrack(currentTrack + 1);
    }
  };

  const playPrev = () => {
    if (currentTrack && currentTrack > 1) {
      setCurrentTrack(currentTrack - 1);
    }
  };

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
            <span className="text-cyan-400">Music</span>
          </h1>
          <p className="text-xl text-gray-400">
            Original tracks and productions by Ernst-William
          </p>
        </div>

        {/* Artist Profile Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-lg p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Artist Image */}
            <div className="md:col-span-1 flex justify-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-lg">
                {/* Add your artist image here or use the uploaded photo (IMG_4546.png) */}
                <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <span className="text-4xl">🎵</span>
                </div>
              </div>
            </div>

            {/* Artist Info & Spotify */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-2">Ernst-William</h2>
              <p className="text-gray-400 mb-6">
                Multi-talented creator with a passion for music production, entrepreneurship, and storytelling.
              </p>

              {/* Spotify Button */}
              <a
                href={SPOTIFY_ALBUM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-full transition mb-6"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.122-.899-.539-.12-.417.107-.799.52-.92 4.561-1.12 8.369-.501 11.461 1.32.42.24.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.26.3-3.239-1.98-8.159-2.58-12.018-1.5-.479.12-1.02-.12-1.14-.6-.12-.479.12-1.02.6-1.14 4.26-1.26 9.541-.68 13.08 1.74.361.22.541.659.301 1.1zm.12-3.36C15.24 9.6 8.82 9.21 5.16 10.56c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.429 11.85-1.02 16.38 2.22.479.301.799.921.6 1.5-.179.56-.661.85-1.26.67z" />
                </svg>
                Listen on Spotify
              </a>

              {/* Streaming Platforms */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Also available on:</p>
                <div className="flex flex-wrap gap-3">
                  <a href="#" className="text-cyan-400 hover:text-cyan-300 transition text-sm">
                    Apple Music
                  </a>
                  <span className="text-gray-700">•</span>
                  <a href="#" className="text-cyan-400 hover:text-cyan-300 transition text-sm">
                    YouTube Music
                  </a>
                  <span className="text-gray-700">•</span>
                  <a href="#" className="text-cyan-400 hover:text-cyan-300 transition text-sm">
                    SoundCloud
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tracks Section */}
        {tracks.length > 0 ? (
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Latest Tracks</h2>

            <div className="space-y-3">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition group cursor-pointer"
                  onClick={() => togglePlay(track.id)}
                >
                  {/* Track Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <button className="p-2 bg-cyan-500 hover:bg-cyan-600 rounded-full transition opacity-0 group-hover:opacity-100">
                      {currentTrack === track.id && isPlaying ? (
                        <Pause className="w-4 h-4 text-black" />
                      ) : (
                        <Play className="w-4 h-4 text-black" />
                      )}
                    </button>

                    <div>
                      <p className="font-semibold">{track.title}</p>
                      <p className="text-sm text-gray-400">{track.artist}</p>
                    </div>
                  </div>

                  {/* Duration */}
                  <p className="text-sm text-gray-400">{track.duration}</p>
                </div>
              ))}
            </div>

            {/* Hidden Audio Player */}
            {tracks.length > 0 && currentTrack && (
              <audio
                ref={audioRef}
                src={`/music/track-${currentTrack}.mp3`}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                autoPlay
              />
            )}

            {/* Player Controls */}
            {tracks.length > 0 && currentTrack && (
              <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <button
                    onClick={playPrev}
                    disabled={currentTrack === 1}
                    className="p-2 hover:bg-gray-700 rounded-lg transition disabled:opacity-50"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => togglePlay(currentTrack)}
                    className="p-3 bg-cyan-500 hover:bg-cyan-600 rounded-full transition"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-black" />
                    ) : (
                      <Play className="w-5 h-5 text-black" />
                    )}
                  </button>

                  <button
                    onClick={playNext}
                    disabled={currentTrack === tracks.length}
                    className="p-2 hover:bg-gray-700 rounded-lg transition disabled:opacity-50"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>

                  <div className="flex-1 mx-4">
                    <div className="h-1 bg-gray-700 rounded-full"></div>
                  </div>

                  <Volume2 className="w-5 h-5" />
                </div>

                <p className="text-center text-sm text-gray-400 mt-2">
                  Now playing: {tracks.find((t) => t.id === currentTrack)?.title}
                </p>
              </div>
            )}

            {tracks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Tracks coming soon...</p>
                <a
                  href={SPOTIFY_ALBUM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition"
                >
                  Listen on Spotify
                </a>
              </div>
            )}
          </div>
        ) : null}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to Collaborate?</h2>
          <p className="text-gray-300 mb-6">
            Interested in working together on music or other projects?
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
