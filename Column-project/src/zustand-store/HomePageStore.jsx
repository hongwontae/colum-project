import { create } from "zustand";

export const useStore = create((set) => ({
  toggleState: {
    toggleDesc: false,
    toggleNews: false,
    toggleTrophy: false,
    togglePictures : true
  },

  toggleShortHistoryHandler: () =>
    set((prev) => ({
      toggleState: {
        ...prev.toggleState,
        toggleDesc: !prev.toggleState.toggleDesc,
      },
    })),

  toggleNewsHandler: () =>
    set((prev) => ({
      toggleState: {
        ...prev.toggleState,
        toggleNews: !prev.toggleState.toggleNews,
      },
    })),
  toggleTrophyHandler: () =>
    set((prev) => ({
      toggleState: {
        ...prev.toggleState,
        toggleTrophy: !prev.toggleState.toggleTrophy,
      },
    })),
    togglePicturesHandler: () =>
      set((prev) => ({
        toggleState: {
          ...prev.toggleState,
          togglePictures: !prev.toggleState.togglePictures
        },
      })),

  allViewHandler: () =>
    set((prev) => ({
      toggleState: {
        ...prev.toggleState,
        toggleDesc: true,
        toggleNews: true,
        toggleTrophy: true,
        togglePictures : true,
      },
    })),

  allDownHandler: () =>
    set((prev) => ({
      toggleState: {
        ...prev.toggleState,
        toggleDesc: false,
        toggleNews: false,
        toggleTrophy: false,
        togglePictures : false
      },
    })),
}));
