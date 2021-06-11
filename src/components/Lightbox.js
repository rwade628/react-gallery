import React from "react";
import Modal from "@material-ui/core/Modal";
import PinchImage from "./PinchImage";
import Video from "./VideoPlayer/Video.js";

export default function Lightbox({
  open,
  setOpen,
  selected,
  gallery,
  index,
  setIndex,
  setSelected,
  setTitle,
}) {
  // if (!selected.src) {
  //   return null;
  // }

  const handleClose = () => {
    setOpen(false);
    setTitle("Title");
  };

  const setNext = (direction) => {
    let newIndex;
    if (direction === "left") {
      if (index === gallery.length - 1) {
        index = -1;
      }
      newIndex = (index + 1) % gallery.length;
    } else {
      if (index === 0) {
        index = gallery.length;
      }
      newIndex = (index - 1) % gallery.length;
    }
    setSelected(gallery[newIndex]);
    setIndex(newIndex);
  };

  const regex = /jpe?g/g; //jpg or jpeg

  let modalContent;
  if (selected.src) {
    if (selected.src.search(regex) > -1) {
      modalContent = (
        <PinchImage image={selected} onSwipe={setNext} hide={handleClose} />
      );
    } else {
      modalContent = <Video src={selected.src} closeModal={handleClose} />;
    }
  } else {
    modalContent = <span>Modal</span>;
  }

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      style={{ touchAction: "none" }}
      onClose={handleClose}
      data-testid="lightbox"
    >
      {modalContent}
    </Modal>
  );
}
