import { useEffect } from "react";
import { Link, useParams, useLoaderData } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { Masonry } from "masonic";

import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";

import { Gallery as GalleryType } from "../state/gallery";

export default function Gallery() {
  const data = useLoaderData() as GalleryType[];
  let items = data;
  const { page = 0 } = useParams();

  useEffect(() => {});

  if (page != 0) {
    const gallery = data.find((gallery) => gallery.id == page);
    if (gallery && gallery.photos) {
      items = gallery.photos;
    }
  }

  return (
    <Masonry
      key={page}
      items={items}
      columnGutter={8}
      columnWidth={350}
      overscanBy={2}
      render={GalleryCard}
    />
  );
}

const GalleryCard = ({
  index,
  data: { id, name, width, height, src, thumb, type },
}: {
  index: number;
  data: GalleryType;
}) => {
  let linkTo = `/${id}`;
  if (!type || type === "movie") {
    linkTo = `modal/${index}`;
  }
  return (
    <Link to={linkTo}>
      <AspectRatio variant="plain" ratio={`${width}/${height}`}>
        <img
          style={{ display: "block", width: "100%" }}
          src={thumb || src}
          alt="kitty"
        />
      </AspectRatio>
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
          justifyContent="center"
          textColor="#f1f1f1"
          variant="plain"
          level="body-lg"
        >
          {name}
        </Typography>
      </Box>
    </Link>
  );
};
