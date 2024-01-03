import * as React from "react";
import Box from "@mui/joy/Box";
import Controls from "./controls";

export default function Video({ src }: { src: string }) {
  const videoRef = React.createRef<HTMLVideoElement>();

  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <video ref={videoRef} style={{ maxWidth: "90vw" }}>
        <source src={src} type="video/mp4" />
        <p>Your browser doesn't support HTML5 video.</p>
      </video>
      <Controls videoRef={videoRef} />
    </Box>
  );
}
