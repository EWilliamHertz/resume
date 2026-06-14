"use client";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react";
import Link from "next/link";

interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
  cover?: string;
}

interface MusicPlayerProps {
  songs?: Song[];
  compact?: boolean;
  spotifyUrl?: string;
}

export default function MusicPlayer({
  songs = [],
  compact = false,
  spotifyUrl,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong = songs[currentSongIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (compact) {
    return (
      <div className="flex items-center gap-4 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full px-6 py-3 text-sm">
        <audio ref={audioRef} />
        <button
          onClick={togglePlay}
          className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
        >
          {isPlaying ? (
            <Pause size={18} className="text-cyan-400" />
          ) : (
            <Play size={18} className="text-cyan-400" />
          )}
        </button>
        <div className="flex flex-col gap-1 min-w-0">
          <p className="font-medium text-neutral-200 truncate text-xs">
            {currentSong?.title || "No music"}
          </p>
          <p className="text-neutral-500 text-xs">{formatTime(currentTime)}</p>
        </div>
        {spotifyUrl && (
          <Link
            href={spotifyUrl}
            target="_blank"
            className="ml-auto px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs hover:bg-green-500/20 transition-colors whitespace-nowrap"
          >
            Spotify
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-8">
      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Music className="text-cyan-400" />
        Music by Hatake Hugo
      </h3>

      <audio ref={audioRef} />

      {currentSong && (
        <div className="mb-8">
          {currentSong.cover && (
            <div className="w-full aspect-square mb-6 bg-neutral-800 rounded-xl overflow-hidden">
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="mb-6">
            <h4 className="text-xl font-semibold text-neutral-100">
              {currentSong.title}
            </h4>
            <p className="text-neutral-400">{currentSong.artist}</p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2 mb-6">
            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 h-full transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-neutral-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={prevSong}
              className="p-3 hover:bg-neutral-800 rounded-full transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={togglePlay}
              className="p-4 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-full transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={nextSong}
              className="p-3 hover:bg-neutral-800 rounded-full transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Playlist */}
          <div className="space-y-2">
            <p className="text-xs text-neutral-400 uppercase tracking-wide">
              Playlist
            </p>
            {songs.map((song, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentSongIndex(idx);
                  setIsPlaying(true);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  idx === currentSongIndex
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "hover:bg-neutral-800 text-neutral-300"
                }`}
              >
                <p className="font-medium">{song.title}</p>
                <p className="text-xs text-neutral-500">{song.artist}</p>
              </button>
            ))}
          </div>

          {spotifyUrl && (
            <div className="mt-6">
              <Link
                href={spotifyUrl}
                target="_blank"
                className="w-full block text-center px-4 py-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors font-medium"
              >
                Listen on Spotify
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
