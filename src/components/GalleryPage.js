import React, { useCallback, useState, useEffect } from "react";
import Gallery from "react-photo-gallery";
import Photo from "./Photo";
import { createBrowserHistory } from "history";
import CircularProgress from "@material-ui/core/CircularProgress";

const history = createBrowserHistory();

export default function GalleryPage({
  filters,
  setSelected,
  setLightboxOpen,
  setGallery,
  setIndex
}) {
  const height = window.innerHeight;
  const rowHeight = height / 2;
  const [photos, setPhotos] = useState([]);
  const [visiblePhotos, setVisiblePhotos] = useState(photos);
  const [loadedAll, setLoadedAll] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setVisiblePhotos(photos.slice(0, 10));
  }, [photos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    let scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
      loadMorePhotos();
    }
  };

  const debounce = (func, wait, immediate) => {
    let timeout;
    let progressTimeout;
    return function() {
      const context = this,
        args = arguments;
      let later = function() {
        progressTimeout = null;
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let update = function() {
        setProgress(progress + 5);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      clearTimeout(progressTimeout);
      timeout = setTimeout(later, wait);
      progressTimeout = setTimeout(update, 5);
      if (callNow) func.apply(context, args);
    };
  };

  const loadMorePhotos = debounce(() => {
    if (visiblePhotos.length + 10 > photos.length) {
      setLoadedAll(true);
      return;
    }

    setVisiblePhotos(
      visiblePhotos.concat(
        photos.slice(visiblePhotos.length, visiblePhotos.length + 10)
      )
    );
    setProgress(0);
  }, 500);

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
          setIndex(index);
        }
        setLightboxOpen(true);
      }
    },
    [setSelected, setLightboxOpen, setGallery, setIndex]
  );

  return (
    <>
      <Gallery
        photos={visiblePhotos}
        targetRowHeight={rowHeight}
        renderImage={Photo}
        onClick={handlePhotoClick}
      />
      {!loadedAll && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress variant="determinate" value={progress} />
        </div>
      )}
    </>
  );
}
