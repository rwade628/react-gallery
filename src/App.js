import React from "react";
import TitleBar from "./components/TitleBar";
import GalleryPage from "./components/GalleryPage";
import Lightbox from "./components/Lightbox";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({});
  const [filters, setFilters] = React.useState("orderBy=newest");
  const [gallery, setGallery] = React.useState([]);
  const [photos, setPhotos] = React.useState([]);
  const [index, setIndex] = React.useState(0);

  const gallerySelect = (photo, i) => {
    // if the type is photo that means it has a lite of photos in its files
    if (photo.type === "photo") {
      history.push("/", { photos: photo.files });
      setPhotos(photo.files);
      setGallery(photo.files);
      window.scrollTo(0, 0);
    } else {
      // otherwise it should open the lightbox and set the lightbox selection to the selected object
      if (photo.type === "movie") {
        const movie = {
          ...photo,
          src: photo.src.replace("jpg", "mp4")
        };
        setSelected(movie);
      } else {
        setSelected(photo);
        setIndex(i);
      }
      setOpen(true);
    }
  };

  return (
    <div className="App">
      <TitleBar
        titleText={"Title"}
        setFilters={setFilters}
        gallerySelect={gallerySelect}
        photos={photos}
      />
      <GalleryPage
        photos={photos}
        setPhotos={setPhotos}
        gallerySelect={gallerySelect}
        filters={filters}
      />
      <Lightbox
        open={open}
        setOpen={setOpen}
        selected={selected}
        data-testid="lightbox"
        gallery={gallery}
        index={index}
        setIndex={setIndex}
        setSelected={setSelected}
      />
    </div>
  );
}

export default App;
