import React, { useCallback, useState, useEffect } from "react";
import Gallery from "react-photo-gallery";
import Photo from "./Photo";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default function GalleryPage({ filters, setSelected, setLightboxOpen }) {
  const height = window.innerHeight;
  const rowHeight = height / 2;
  const [photos, setPhotos] = useState([]);

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

  useEffect(() => {
    fetchGalleries(filters);
  }, [filters]);

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === "POP" && location.state) {
        setPhotos(location.state.photos);
      }
    });
    return () => unlisten();
  }, []);

  const handlePhotoClick = useCallback(
    (event, { photo, index }) => {
      // if the type is photo that means it has a lite of photos in its files
      if (photo.type === "photo") {
        history.push("/", { photos: photo.files });
        setPhotos(photo.files);
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
        }
        setLightboxOpen(true);
      }
    },
    [setSelected, setLightboxOpen]
  );

  return (
    <>
      <Gallery
        photos={photos}
        targetRowHeight={rowHeight}
        renderImage={Photo}
        onClick={handlePhotoClick}
      />
    </>
  );
}
