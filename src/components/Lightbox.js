import React from "react";
import Modal from "@material-ui/core/Modal";
import PinchImage from "./PinchImage";
import Video from "./VideoPlayer/Video.js";

export default function Lightbox({ open, setOpen, selected }) {
  // if (!selected.src) {
  //   return null;
  // }

  const handleClose = () => {
    setOpen(false);
  };

  const regex = /jpe?g/g; //jpg or jpeg

  let modalContent;
  if (selected.src) {
    if (selected.src.search(regex) > -1) {
      modalContent = <PinchImage image={selected} hide={handleClose} />;
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
