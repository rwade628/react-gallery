import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";

import { GalleryProps } from "../gallery/props";
import { useTagStore } from "../../state/tags";
import TagList from "./tagList";

const InfoCard = React.forwardRef(
  ({ gallery }: { gallery: GalleryProps }, _) => {
    const allTags = useTagStore((state) => state.tags);

    const path = gallery.src.split("/");
    const subPath = path.length > 3 ? path[2] : "";

    const tags = gallery.tags || [];

    return (
      <Card
        orientation="horizontal"
        sx={{
          width: { s: "60%", m: "40%" },
          [":focus"]: {
            outline: "none",
          },
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          // make the card resizable for demo
          overflow: "auto",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img src={gallery.thumb} alt="" />
        </AspectRatio>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography fontSize="xl" fontWeight="lg">
            {gallery.name}
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            {subPath}
          </Typography>
          <TagList allTags={allTags} tags={tags} />
          {/*
          <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
            <Button variant="outlined" color="neutral">
              Chat
            </Button>
            <Button variant="solid" color="primary">
              Follow
            </Button>
          </Box>
        */}
        </CardContent>
      </Card>
    );
  },
);

export default InfoCard;
