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
      <video
        ref={videoRef}
        style={{
          width: "100vw",
          /* 90% of viewport vidth */
          height: "56.25vw",
          /* ratio = 9/16 * 90 = 50.625 */
          maxHeight: "100vh",
          maxWidth: "177.78vh",
          /* 16/9 * 90 = 160 */
          margin: "auto",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        playsInline
      >
        <source src={src} type="video/mp4" />
        <p>Your browser doesn't support HTML5 video.</p>
      </video>
      <Controls videoRef={videoRef} />
    </Box>
  );
}
