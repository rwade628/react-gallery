import { useNavigate, useSearchParams } from "react-router-dom";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";

import { NavigateNext, NavigateBefore } from "@mui/icons-material";

import { GalleryProps } from "./gallery/props";
import { ImageView } from "./image";
import Video from "./video";

export default function LightBox({ gallery }: { gallery: GalleryProps }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let modalID = Number(searchParams.get("modal"));

  let src = gallery.src;

  if (gallery.type === "photo" && gallery.photos) {
    const image = gallery.photos[modalID];
    src = image.src;
  }

  const handleNext = () => {
    const length = gallery.photos ? gallery.photos.length : 0;
    const newIndex = (modalID + 1 + length) % length;
    navigate(`?modal=${newIndex}`, {
      replace: true,
    });
  };

  const handlePrev = () => {
    const length = gallery.photos ? gallery.photos.length : 0;
    const newIndex = (modalID - 1 + length) % length;
    navigate(`?modal=${newIndex}`, {
      replace: true,
    });
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={true}
      onClose={() => navigate(-1)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        {gallery.type === "photo" ? (
          <>
            <ImageView src={src} />
            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                zIndex: 1,
              }}
              size="lg"
              variant="plain"
              onClick={handlePrev}
            >
              <NavigateBefore />
            </IconButton>
            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                right: 0,
                zIndex: 1,
              }}
              size="lg"
              variant="plain"
              onClick={handleNext}
            >
              <NavigateNext />
            </IconButton>
          </>
        ) : (
          <Video src={src} />
        )}
      </Box>
    </Modal>
  );
}
