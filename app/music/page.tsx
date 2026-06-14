import MusicPlayer from "@/components/MusicPlayer";
import Link from "next/link";
import { Music } from "lucide-react";

// These would ideally come from your database
const demoSongs = [
  {
    id: "1",
    title: "Untitled Track 1",
    artist: "Hatake Hugo",
    url: "/music/track1.mp3", // Replace with actual URLs
    duration: 180,
  },
  {
    id: "2",
    title: "Untitled Track 2",
    artist: "Hatake Hugo",
    url: "/music/track2.mp3",
    duration: 210,
  },
];

export default function MusicPage() {
  return (
    <main className="bg-neutral-950 text-white min-h-screen overflow-x-hidden pt-32 md:pt-24 pb-16">
      <section className="w-full max-w-6xl mx-auto px-4 md:px-6 z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Music className="text-cyan-400" size={32} />
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-100">
              Music
            </h1>
          </div>
          <p className="text-lg text-neutral-400 max-w-2xl">
            Explore the music created by Hatake Hugo. Original compositions across multiple genres.
          </p>
        </div>

        {/* Spotify Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">
              Stream on Spotify
            </h2>
            <p className="text-neutral-400 mb-6">
              Listen to all my releases on Spotify. Follow for new releases and updates.
            </p>
            <Link
              href="https://open.spotify.com/artist/ARTIST_ID" // Replace with actual Spotify URL
              target="_blank"
              className="inline-block px-6 py-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors font-medium"
            >
              Open Spotify
            </Link>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">
              Other Platforms
            </h2>
            <p className="text-neutral-400 mb-6">
              Find my music on Apple Music, YouTube Music, and more streaming platforms.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="https://music.apple.com" // Replace with actual link
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                → Apple Music
              </Link>
              <Link
                href="https://youtube.com/@HatakeHugo" // Replace with actual link
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                → YouTube Music
              </Link>
              <Link
                href="https://soundcloud.com" // Replace with actual link
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                → SoundCloud
              </Link>
            </div>
          </div>
        </div>

        {/* Music Player */}
        <div className="mb-16">
          <MusicPlayer
            songs={demoSongs}
            spotifyUrl="https://open.spotify.com/artist/ARTIST_ID"
          />
        </div>

        {/* About Music */}
        <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-neutral-100">
            About the Music
          </h2>
          <div className="space-y-4 text-neutral-400">
            <p>
              Music by Hatake Hugo spans multiple genres and moods, ranging from ambient
              experimental to upbeat electronic. Each composition tells a story and reflects
              moments of inspiration and personal exploration.
            </p>
            <p>
              Whether you're looking for background music, introspective soundscapes, or
              energetic tracks, there's something for every mood and moment.
            </p>
            <p>
              All tracks are available on major streaming platforms. New releases coming soon!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
