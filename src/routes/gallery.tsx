import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import cats from "../utils/cats";
import AspectRatio from '@mui/joy/AspectRatio';
import Box from "@mui/joy/Box";
import Typography from '@mui/joy/Typography';
import { Masonry } from "masonic";

import ImageIcon from '@mui/icons-material/Image';

export default function Gallery() {
  const [items, setItems] = useState(getFakeItems);
  const { page = "cats" } = useParams();

  useEffect(() => {
    setItems(getFakeItems());
  }, [page]);

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
};

const GalleryCard = ({ data: { id, name, src, width, height } }: { data: ItemProps }) => {
  return (
    <Link to={`/${id}`}>
      <AspectRatio variant="plain" ratio={`${width}/${height}`} >
        <img
          style={{ display: "block", width: "100%" }}
          src={src}
          alt="kitty"
        />
      </AspectRatio>
      <Box sx={{
        position: 'absolute',
        width: '100%',
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        textAlign: "center",
      }}>
        <Typography
          startDecorator={<ImageIcon fontSize="inherit" />}
          justifyContent="center"
          textColor="#f1f1f1"
          variant="plain"
          level="body-lg"
        >
          {name}
        </Typography>
      </Box>
    </Link>
  )
}

interface ItemProps {
  id: number,
  name: string,
  src: string,
  width: number,
  height: number,
}

const randomChoice = (items: string[]) => items[Math.floor(Math.random() * items.length)];
const generateRandomString = (length = 6) => Math.random().toString(20).substr(2, length)
const getFakeItems = (cur = 0) => {
  const fakeItems: ItemProps[] = [];
  for (let i = 5000 * cur; i < cur * 5000 + 5000; i++)
    fakeItems.push({
      id: i, name: generateRandomString(), src: randomChoice(cats), width: 16, height: 9
    })
  return fakeItems;
};

