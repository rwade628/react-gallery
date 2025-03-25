export type GalleryProps = {
  id?: string;
  name?: string;
  src: string;
  thumb?: string;
  width: number;
  height: number;
  type?: "movie" | "photo" | "all";
  photos?: GalleryProps[];
  tags?: string[];
  length?: number;
  createdAt?: Date;
  views?: number;
};
