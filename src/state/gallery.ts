import { create } from "zustand";

type Gallery = {
  firstName: string;
  lastName: string;
};

type Actions = {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
};

type GalleryStore = Gallery & Actions;

const initialValues: Gallery = {
  firstName: "",
  lastName: ""
};

export const useGalleryStore = create<GalleryStore>((set) => ({
  ...initialValues,
  setFirstName: (firstName: string) => set({ firstName }),
  setLastName: (lastName: string) => set({ lastName }),
}))
