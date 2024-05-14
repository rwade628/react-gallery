import {
  useParams,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";

// custom
import GalleryGrid from "../components/gallery/grid";
import { GalleryProps } from "../components/gallery/props";
import LightBox from "../components/modal";
import Info from "../components/info";
import { useSettingsStore } from "../state/settings";

export default function Gallery() {
  const search = useSettingsStore((store) => store.search);
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
  } else {
    galleries = data.filter((gallery) => {
      if (gallery.name?.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      gallery.tags?.forEach((tag) => {
        if (tag.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
      });
      return false;
    });
  }

  const modalID = searchParams.get("modal");
  if (modalID && page == "root") {
    // console.log(modalID);
    const found = data.find((g: GalleryProps) => g.id == modalID);
    if (found) {
      gallery = found;
    }
  }

  const infoID = searchParams.get("info");
  if (infoID) {
    // console.log(modalID);
    const found = data.find((g: GalleryProps) => g.id == infoID);
    if (found) {
      gallery = found;
    }
  }

  return (
    <>
      <GalleryGrid key={page + search} galleries={galleries} page={page} />
      {modalID && <LightBox gallery={gallery} />}
      {infoID && <Info gallery={gallery} />}
    </>
  );
}
