import { useNavigate } from "react-router-dom";
import Modal from "@mui/joy/Modal";

import { GalleryProps } from "../gallery/props";
import InfoCard from "./card";

export default function Info({ gallery }: { gallery: GalleryProps }) {
  const navigate = useNavigate();

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
      <InfoCard gallery={gallery} />
    </Modal>
  );
}
