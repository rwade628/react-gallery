import { create } from "zustand";

type Store = {
  isHorizontal: boolean;
};

type Actions = {
  updateControlsOrientation: (isHorizontal: boolean) => void;
};

type SettingsStore = Store & Actions;

const initialValues = {
  isHorizontal: true,
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  ...initialValues,
  updateControlsOrientation: (isHorizontal: boolean) =>
    set(() => ({ isHorizontal })),
}));
