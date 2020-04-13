import React from "react";
import TitleBar from "./components/TitleBar";
import GalleryPage from "./components/GalleryPage";
import Lightbox from "./components/Lightbox";

function App() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({});
  const [filters, setFilters] = React.useState("sort=newest");

  return (
    <div className="App">
      <TitleBar titleText={"Title"} setFilters={setFilters} />
      <GalleryPage
        setLightboxOpen={setOpen}
        setSelected={setSelected}
        filters={filters}
      />
      <Lightbox
        open={open}
        setOpen={setOpen}
        selected={selected}
        data-testid="lightbox"
      />
    </div>
  );
}

export default App;
