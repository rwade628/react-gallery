import React, { useCallback, useEffect } from "react";
import Gallery from "react-photo-gallery";
import Photo from "./Photo";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default function GalleryPage({
  filters,
  gallerySelect,
  photos,
  setPhotos
}) {
  useEffect(() => {
    async function fetchGalleries(filters) {
      const res = await fetch(`v1/galleries?${filters}`);
      res
        .json()
        .then(res => {
          // create an array of photos with all top level files
          // think of this as a title page
          const galleries = res.map(gallery => ({
            name: gallery.name,
            src: gallery.files[0].src,
            width: gallery.files[0].width,
            rawWidth: gallery.files[0].width,
            rawHeight: gallery.files[0].height,
            height: gallery.files[0].height,
            thumb: gallery.files[0].thumb,
            type: gallery.type,
            files: gallery.files.map(file => ({
              rawWidth: file.width, // width and height get changed by the gallery component
              rawHeight: file.height, // so back them up to raw values
              ...file
            }))
          }));
          setPhotos(galleries);
          history.push("/", { photos: galleries });
        })
        .catch(err => console.log("error calling api:", err));
    }

    fetchGalleries(filters);
  }, [filters, setPhotos]);

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === "POP" && location.state) {
        setPhotos(location.state.photos);
      }
    });
    return () => unlisten();
  }, [setPhotos]);

  const handlePhotoClick = useCallback(
    (event, { photo, index }) => {
      gallerySelect(photo, index);
    },
    [gallerySelect]
  );

  return (
    <Gallery
      photos={photos ? photos.slice(0, 150) : []}
      renderImage={Photo}
      onClick={handlePhotoClick}
    />
  );
}
