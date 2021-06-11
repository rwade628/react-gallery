import React, { useState, useCallback, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import Gallery from "react-photo-gallery";
import Photo from "./Photo";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default function GalleryPage({
  filters,
  gallerySelect,
  photos,
  setPhotos,
  setAllPhotos,
  setTitle,
}) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchGalleries(filters) {
      const res = await fetch(`v1/galleries?${filters}`);
      res
        .json()
        .then((res) => {
          // create an array of photos with all top level files
          // think of this as a title page
          const galleries = res.map((gallery) => ({
            name: gallery.name,
            src: gallery.files[0].src,
            width: gallery.files[0].width,
            rawWidth: gallery.files[0].width,
            rawHeight: gallery.files[0].height,
            height: gallery.files[0].height,
            thumb: gallery.files[0].thumb,
            tags: gallery.tags,
            type: gallery.type,
            files: gallery.files.map((file) => ({
              rawWidth: file.width, // width and height get changed by the gallery component
              rawHeight: file.height, // so back them up to raw values
              ...file,
            })),
          }));
          setPhotos(galleries);
          setAllPhotos(galleries);
          history.push("/", { photos: galleries });
        })
        .catch((err) => console.log("error calling api:", err));
    }

    fetchGalleries(filters);
  }, [filters, setPhotos, setAllPhotos]);

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === "POP" && location.state) {
        setPhotos(location.state.photos);
        setPage(1);
        setTitle("Title");
      }
    });
    return () => unlisten();
  }, [setPhotos, setTitle]);

  const handlePhotoClick = useCallback(
    (event, { photo, index }) => {
      if (page > 1) {
        index = index + (page - 1) * 25;
      }
      gallerySelect(photo, index);
      setPage(1);
    },
    [gallerySelect, page]
  );

  const updatePage = useCallback(
    (event, value) => {
      window.scrollTo(0, 0);
      setPage(value);
    },
    [setPage]
  );

  return (
    <>
      <Gallery
        photos={photos ? photos.slice((page - 1) * 25, page * 25) : []}
        renderImage={Photo}
        onClick={handlePhotoClick}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Pagination
          count={Math.ceil(photos.length / 25)}
          size="large"
          page={page}
          onChange={updatePage}
        />
      </div>
    </>
  );
}
