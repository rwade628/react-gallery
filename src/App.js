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
  const [allPhotos, setAllPhotos] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [title, setTitle] = React.useState("Title");

  const gallerySelect = (photo, i) => {
    // if the type is photo that means it has a lite of photos in its files
    if (photo.type === "photo") {
      history.push("/", { photos: photo.files });
      setPhotos(photo.files);
      setGallery(photo.files);
      setTitle(photo.name);
      window.scrollTo(0, 0);
    } else {
      // otherwise it should open the lightbox and set the lightbox selection to the selected object
      if (photo.type === "movie") {
        const movie = {
          ...photo,
          src: photo.src.replace("jpg", "mp4"),
        };
        setSelected(movie);
        setTitle(movie.name);
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
        titleText={title}
        setFilters={setFilters}
        setPhotos={setPhotos}
        gallerySelect={gallerySelect}
        photos={photos}
        allPhotos={allPhotos}
      />
      <GalleryPage
        photos={photos}
        setPhotos={setPhotos}
        setAllPhotos={setAllPhotos}
        gallerySelect={gallerySelect}
        filters={filters}
        setTitle={setTitle}
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
        setTitle={setTitle}
      />
    </div>
  );
}

export default App;
