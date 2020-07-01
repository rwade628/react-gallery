import React from "react";
import TitleBar from "./components/TitleBar";
import GalleryPage from "./components/GalleryPage";
import Lightbox from "./components/Lightbox";

function App() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({});
  const [filters, setFilters] = React.useState("orderBy=newest");
  const [gallery, setGallery] = React.useState([]);
  const [index, setIndex] = React.useState(0);

  return (
    <div className="App">
      <TitleBar titleText={"Title"} setFilters={setFilters} />
      <GalleryPage
        setLightboxOpen={setOpen}
        setSelected={setSelected}
        filters={filters}
        setGallery={setGallery}
        setIndex={setIndex}
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
