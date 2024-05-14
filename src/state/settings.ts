import { create } from "zustand";

type Store = {
  isHorizontal: boolean;
  columnCount: number;
  search: string;
};

type Actions = {
  updateControlsOrientation: (isHorizontal: boolean) => void;
  updateColumnCount: (count: number) => void;
  updateSearch: (term: string) => void;
};

type SettingsStore = Store & Actions;

const initialValues = {
  isHorizontal: false,
  columnCount: 4,
  search: "",
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  ...initialValues,
  updateControlsOrientation: (isHorizontal: boolean) =>
    set(() => ({ isHorizontal })),
  updateColumnCount: (count: number) => set(() => ({ columnCount: count })),
  updateSearch: (term: string) => set(() => ({ search: term })),
}));
