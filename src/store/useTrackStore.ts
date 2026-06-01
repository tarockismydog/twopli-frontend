import { create } from "zustand";

interface Track {
  videoId: string;
  title: string;
}

interface TrackState {
  currentTrack: Track | null;
  setCurrentTrack: (track: Track | null) => void;
}

export const useTrackStore = create<TrackState>((set) => ({
  currentTrack: null,
  setCurrentTrack: (track) => set({ currentTrack: track }),
}));
