"use client";
import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
  cover?: string;
}

interface MusicContextType {
  songs: Song[];
  currentSongIndex: number;
  setCurrentSongIndex: (index: number) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  currentTime: number;
  duration: number;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children, initialSongs = [] }: { children: ReactNode, initialSongs?: Song[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [songs] = useState<Song[]>(initialSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => nextSong();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      if (audioRef.current.src !== new URL(currentSong.url, window.location.origin).href) {
        audioRef.current.src = currentSong.url;
        if (isPlaying) {
          audioRef.current.play().catch(console.error);
        }
      }
    }
  }, [currentSongIndex, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextSong = () => setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  const prevSong = () => setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);

  return (
    <MusicContext.Provider value={{
      songs, currentSongIndex, setCurrentSongIndex, isPlaying, togglePlay, nextSong, prevSong, currentTime, duration
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) throw new Error("useMusic must be used within a MusicProvider");
  return context;
};