import React from "react";
import { Link, useParams } from "react-router-dom";
import cats from "../utils/cats";
import Box from "@mui/joy/Box";
import Typography from '@mui/joy/Typography';
import { Masonry } from "masonic";

import ImageIcon from '@mui/icons-material/Image';


export default function Gallery() {
  const [items, setItems] = React.useState(getFakeItems);
  const { page = "cats" } = useParams();
  const otherPage = page === "cats" ? "kittens" : "cats";

  React.useEffect(() => {
    setItems(getFakeItems());
  }, [page]);

  return (
    <div>
      <div>
        <span>filter by:</span>
        <h2>{page}</h2>
        <Link to={`/${otherPage}`}>{otherPage}</Link>
      </div>
      <Masonry
        // When switching between pages that use the same
        // Route component, using the `key` prop is the
        // best way to create a new layout with your
        // updated items
        key={page}
        items={items}
        columnGutter={8}
        columnWidth={172}
        overscanBy={6}
        render={GalleryCard}
      />
    </div>
  );
};

const GalleryCard = ({ data: { id, name, src, width, height } }) => (
  <Box>
    <img
      style={{ display: "block", width: "100%" }}
      src={
        src
      }
      alt="kitty"
    />
    <Box sx={{
      position: 'absolute',
      width: '100%',
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      textAlign: "center",
    }}>
      <Typography
        startDecorator={<ImageIcon fontSize="lg" />}
        justifyContent="center"
        textColor="#f1f1f1"
        variant="plain"
        level="body-lg"
      >
        {name}
      </Typography>
    </Box>
  </Box >
)

const randomChoice = items => items[Math.floor(Math.random() * items.length)];
const getFakeItems = (cur = 0) => {
  const fakeItems = [];
  for (let i = 5000 * cur; i < cur * 5000 + 5000; i++)
    fakeItems.push({ id: i, name: "someName", src: randomChoice(cats), width: 16, height: 9 });
  return fakeItems;
};

