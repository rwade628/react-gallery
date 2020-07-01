import React, {
  forwardRef,
  useCallback,
  useState,
  useEffect,
  useRef
} from "react";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Next from "@material-ui/icons/NavigateNext";
import Prev from "@material-ui/icons/NavigateBefore";

import interact from "interactjs";

export const useStyles = makeStyles({
  button: {
    background: "none",
    border: 0,
    lineHeight: 1,
    color: "white",
    textAlign: "center",
    outline: 0,
    padding: "10px",
    marginRight: "15px",
    cursor: "pointer",
    maxHeight: "50px",
    position: "absolute",
    zIndex: "999",
    top: 0,
    right: 0
  },
  next: {
    background: "none",
    border: 0,
    lineHeight: 1,
    color: "white",
    textAlign: "center",
    outline: 0,
    padding: "10px",
    position: "absolute",
    right: 0,
    top: "50%",
    zIndex: "999",
    transform: "translateY(-50%)"
  },
  prev: {
    background: "none",
    border: 0,
    lineHeight: 1,
    color: "white",
    textAlign: "center",
    outline: 0,
    padding: "10px",
    position: "absolute",
    left: 0,
    top: "50%",
    zIndex: "999",
    transform: "translateY(-50%)"
  }
});

const initImageData = {
  x: 0,
  y: 0,
  scale: 1,
  originalScale: 1,
  minScale: 0.5,
  maxScale: 2,
  width: 100,
  height: 100
};

let tapTimeout;

const restrictListener = (x, y, element) => {
  // important to use getBoundingClientRect as the element might be scaled
  const rect = document.getElementById("image").getBoundingClientRect();
  const dw = rect.width,
    dh = rect.height,
    vw = document.documentElement.clientWidth,
    vh = document.documentElement.clientHeight;

  const restriction = {
    top: vh - dh < 0 ? vh - dh : 0,
    left: vw - dw < 0 ? vw - dw : 0,
    width: dw > vw ? Math.max(2 * dw - vw, vw) : vw,
    height: dh > vh ? Math.max(2 * dh - vh, vh) : vh
  };
  return {
    left: restriction.left,
    right: restriction.left + restriction.width,
    top: restriction.top + window.scrollY,
    bottom: restriction.top + restriction.height + window.scrollY
  };
};

const PinchImage = forwardRef(({ image, onSwipe, hide }, ref) => {
  const classes = useStyles();
  const imageRef = useRef(null);
  const [imageData, setImageData] = useState(initImageData);
  const imageDataRef = useRef(imageData);

  useEffect(() => {
    imageDataRef.current = imageData;
  }, [imageData]);

  const setInitialLocation = useCallback(() => {
    // get the window's width and height
    const maxWidth = document.documentElement.clientWidth;
    const maxHeight = document.documentElement.clientHeight;
    const selectedWidth = image.rawWidth;
    const selectedHeight = image.rawHeight;
    // scale is whichever is smaller
    const newScale = Math.min(
      maxWidth / selectedWidth,
      maxHeight / selectedHeight
    );
    const max = newScale * 2 > 1 ? newScale * 2 : 1;
    const min = newScale * 0.5 < 0.5 ? newScale : 0.5;
    // set x and y to middle of window based on scale and window
    const newX = maxWidth / 2 - (selectedWidth * newScale) / 2;
    const newY = maxHeight / 2 - (selectedHeight * newScale) / 2;

    setImageData({
      x: newX,
      y: newY,
      scale: newScale,
      originalScale: newScale,
      minScale: min,
      maxScale: max,
      width: selectedWidth,
      height: selectedHeight
    });
  }, [image]);

  const zoom = useCallback((newZoom, clientX, clientY) => {
    const currentX = imageDataRef.current.x;
    const currentY = imageDataRef.current.y;
    /// mouse cords
    const pointerX = clientX;
    const pointerY = clientY;
    /// calculate click at current zoom
    const imageX = (pointerX - currentX) / imageDataRef.current.scale;
    const imageY = (pointerY - currentY) / imageDataRef.current.scale;
    /// calculate click at new zoom
    const zoomedX = imageX * newZoom;
    const zoomedY = imageY * newZoom;
    /// move to the difference
    /// make sure we take mouse pointer offset into account!
    const newX = imageX + (pointerX - imageX) - zoomedX;
    const newY = imageY + (pointerY - imageY) - zoomedY;

    setImageData(i => ({
      ...i,
      x: newX,
      y: newY,
      scale: newZoom
    }));
  }, []);

  const tapHandler = useCallback(
    event => {
      if (event.shiftKey || event.altKey) {
        const currentScale = imageDataRef.current.scale;
        const coef = event.altKey ? 0.9 : 1.05;
        const newZoom = currentScale * coef;
        const clientX = event.clientX;
        const clientY = event.clientY;
        zoom(newZoom, clientX, clientY);
      } else {
        if (event.double) {
          console.log("doubletap");
          clearTimeout(tapTimeout);

          const maxWidth = document.documentElement.clientWidth;
          const maxHeight = document.documentElement.clientHeight;
          const newX = maxWidth / 2 - imageDataRef.current.width / 2;
          const newY = maxHeight / 2 - imageDataRef.current.height / 2;

          setImageData(i => ({
            ...i,
            x: newX,
            y: newY,
            scale: imageDataRef.current.originalScale
          }));
          return;
        } else {
          tapTimeout = setTimeout(() => {
            tapTimeout = null;
            if (hide) {
              hide();
            }
          }, 500);
        }
      }
    },
    [hide, zoom]
  );

  useEffect(() => {
    interact(imageRef.current).unset();
    setInitialLocation();
    interact(imageRef.current)
      .draggable({
        max: 1,
        inertia: true,
        restrict: {
          restriction: restrictListener,
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        onmove: event => {
          const newX = imageDataRef.current.x + event.dx;
          const newY = imageDataRef.current.y + event.dy;
          setImageData(i => ({
            ...i,
            x: newX,
            y: newY
          }));
          event.preventDefault();
        },
        oninertiastart: event => {
          if (
            imageDataRef.current.scale === imageDataRef.current.originalScale &&
            event.swipe &&
            (event.swipe.left || event.swipe.right) &&
            Math.abs(event.swipe.velocity.x) > 3000
          ) {
            const direction = event.swipe.left ? "left" : "right";
            if (onSwipe) {
              onSwipe(direction);
            }
          }
        }
      })
      .gesturable({
        restrict: {
          restriction: restrictListener,
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        onmove: event => {
          const newScale = imageDataRef.current.scale * (1 + event.ds);
          if (
            newScale > imageDataRef.current.minScale &&
            newScale < imageDataRef.current.maxScale
          ) {
            const middleX =
              (event.touches[0].clientX + event.touches[1].clientX) / 2;
            const middleY =
              (event.touches[0].clientY + event.touches[1].clientY) / 2;
            zoom(newScale, middleX, middleY);
          }
          event.preventDefault();
        }
      })
      .on("tap", tapHandler);
  }, [image, onSwipe, setInitialLocation, tapHandler, zoom]);

  const goToNext = () => {
    onSwipe && onSwipe("left");
  };

  const goToPrev = () => {
    onSwipe && onSwipe("right");
  };

  return (
    <>
      <IconButton className={classes.button} onClick={hide}>
        <CloseIcon fontSize="large" />
      </IconButton>
      <IconButton className={classes.next} onClick={goToNext}>
        <Next fontSize="large" />
      </IconButton>
      <IconButton className={classes.prev} onClick={goToPrev}>
        <Prev fontSize="large" />
      </IconButton>

      <img
        id="image"
        alt={image.src}
        style={{
          transformOrigin: "top left",
          transform: `translate3d(${imageData.x}px, ${
            imageData.y
          }px, 0) scale(${imageData.scale})`
        }}
        ref={imageRef}
        src={image.src}
        data-testid="pinch-image"
      />
    </>
  );
});

export default PinchImage;
