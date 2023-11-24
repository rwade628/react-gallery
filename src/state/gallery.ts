import { create } from "zustand";

export type Gallery = {
  id?: string;
  name?: string;
  src: string;
  thumb?: string;
  width: number;
  height: number;
  type?: "movie" | "photo" | "all";
  photos?: Gallery[];
  tags?: string[];
  length?: number;
  createdAt?: Date;
  views?: number;
};

type Store = {
  galleries: Gallery[];
  allGalleries: Gallery[];
  visibleGalleries: Gallery[];
  currentSelection: Gallery;
};

type Actions = {
  // getGalleries: (query: string) => void;
  filterGalleries: (type: string) => void;
  selectRandom: () => Gallery;
};

type GalleryStore = Store & Actions;

const initialValues = {
  galleries: <Gallery[]>[],
  allGalleries: <Gallery[]>[],
  visibleGalleries: <Gallery[]>[],
  currentSelection: <Gallery>{},
};

export const useGalleryStore = create<GalleryStore>((set, get) => ({
  ...initialValues,
  filterGalleries: async (type: string) => {
    const allGalleries = get().allGalleries;
    const newGalleries = allGalleries.filter(
      (gallery) => gallery.type === type,
    );
    set({ visibleGalleries: newGalleries });
  },
  selectRandom: () => {
    const galleries = get().galleries;
    const gallery = galleries[Math.floor(Math.random() * galleries.length)];
    if (gallery && gallery.id) {
      set({ currentSelection: gallery });
      return gallery;
    }
    return <Gallery>{};
  },
}));
