import { useNavigate } from "react-router-dom";
import Box from "@mui/joy/Box";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import InfoIcon from "@mui/icons-material/Info";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";

import { GalleryProps } from "./props";

export default function GalleryCard({
  index,
  gallery: { id, name, src, thumb, type },
  page,
  calculateView,
}: {
  index: number;
  gallery: GalleryProps;
  page: string;
  calculateView: Function;
}) {
  let linkTo = "";
  switch (type) {
    case "photo":
      linkTo = `/${id}`;
      break;
    case "movie":
      linkTo = `?modal=${id}`;
      break;
    default:
      linkTo = `?modal=${index}`;
      break;
  }

  let navigate = useNavigate();

  return (
    <Link
      // to={linkTo}
      onClick={(e) => {
        console.log("start", e.defaultPrevented);
        if (!e.defaultPrevented) {
          calculateView(page);
          navigate(linkTo);
        }
      }}
    >
      <img
        style={{ display: "block", width: "100%" }}
        src={thumb || src}
        alt="kitty"
      />
      {type && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            textAlign: "center",
          }}
        >
          <Typography
            startDecorator={
              type === "photo" ? (
                <ImageIcon fontSize="inherit" />
              ) : (
                <MovieIcon fontSize="inherit" />
              )
            }
            endDecorator={
              // <Link
              //   onClick={(e) => {
              //     console.log("test", e.defaultPrevented);
              //     e.preventDefault();
              //     navigate(`?info=${id}`);
              //   }}
              // >
              <InfoIcon
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`?info=${id}`);
                }}
              />
              // </Link>
            }
            sx={{ width: "80%" }}
            justifyContent="space-between"
            alignItems="center"
            textColor="#f1f1f1"
            variant="plain"
            level="body-lg"
          >
            {name}
          </Typography>
        </Box>
      )}
    </Link>
  );
}
