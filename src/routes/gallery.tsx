import {
  useParams,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";

// custom
import GalleryGrid from "../components/gallery/grid";
import { GalleryProps } from "../components/gallery/props";
import LightBox from "../components/modal";

export default function Gallery() {
  const data = useRouteLoaderData("root") as GalleryProps[];
  const [searchParams] = useSearchParams();
  const { page = "root" } = useParams();

  let galleries = data;
  let gallery = {} as GalleryProps;

  if (page != "root") {
    const found = data.find((gallery) => gallery.id == page);
    if (found) {
      gallery = found;
    }
    if (gallery && gallery.photos) {
      galleries = gallery.photos;
    }
  }

  const modalID = searchParams.get("modal");
  if (modalID && page == "root") {
    // console.log(modalID);
    const found = data.find((g: GalleryProps) => g.id == modalID);
    if (found) {
      gallery = found;
    }
  }

  return (
    <>
      <GalleryGrid key={page} galleries={galleries} page={page} />
      {modalID && <LightBox gallery={gallery} />}
    </>
  );
}
