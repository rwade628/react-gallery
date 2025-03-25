import { create } from "zustand";

type Tag = {
  name: string;
};

type Store = {
  tags: string[];
};

type Actions = {
  getAllTags: () => void;
};

type TagStore = Store & Actions;

const initialValues = {
  tags: [],
};

export const useTagStore = create<TagStore>((set) => ({
  ...initialValues,
  getAllTags: async () => {
    const response = await fetch("v1/tags");
    const t = await response.json();
    const tags = [] as string[];
    t.map((tag: Tag) => tags.push(tag.name));
    set({ tags: tags });
  },
}));
