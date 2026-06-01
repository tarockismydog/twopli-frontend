import { create } from "zustand";

type MusicState = {
  currentSong: any;
  setSong: (song: any) => void;
};

export const useMusicStore = create<MusicState>((set) => ({
  currentSong: null,
  setSong: (song) => set({ currentSong: song }),
}));
