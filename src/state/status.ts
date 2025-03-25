import { create } from "zustand";
import { InfiniteGridStatus } from "@egjs/infinitegrid";

type Store = {
  statusByPage: Map<string, InfiniteGridStatus>;
};

type Actions = {
  updateStatus: (type: Map<string, InfiniteGridStatus>) => void;
};

type StatusStore = Store & Actions;

const initialValues = {
  statusByPage: new Map<string, InfiniteGridStatus>(),
};

export const useStatusStore = create<StatusStore>((set) => ({
  ...initialValues,
  updateStatus: (newStatus: Map<string, InfiniteGridStatus>) =>
    set(() => ({ statusByPage: newStatus })),
}));
