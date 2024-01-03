import * as React from "react";
import Box from "@mui/joy/Box";
import Slider from "@mui/joy/Slider";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

import {
  Forward5,
  PlayArrow,
  Pause,
  Replay5,
  VolumeOff,
  VolumeUp,
  FastForward,
  FastRewind,
} from "@mui/icons-material";

export default function Video({ src }: { src: string }) {
  const videoRef = React.createRef<HTMLVideoElement>();
  const [progress, setProgress] = React.useState(0);
  const [playback, setPlayback] = React.useState(1);
  const [volume, setVolume] = React.useState(100);
  const [paused, setPaused] = React.useState(false);

  // don't care about the event
  const scrub = ({}: Event, val: number | number[]) => {
    if (Array.isArray(val)) {
      return;
    }
    const scrubTime = (val / 100) * videoRef.current!.duration;
    if (!isNaN(scrubTime)) {
      videoRef.current!.currentTime = scrubTime;
      setProgress(val);
    }
  };

  const volumeChange = ({}: Event, val: number | number[]) => {
    if (Array.isArray(val)) {
      return;
    }
    videoRef.current!.volume = val;
    setVolume(val);
  };

  const togglePlay = () => {
    const method = videoRef.current!.paused ? "play" : "pause";
    videoRef.current![method]();
    setPaused(!paused);
  };

  const skip = (skip: number) => {
    videoRef.current!.currentTime += skip;
    setProgress(progress + skip / 100);
  };

  const updatePlayback = (speed: number) => {
    videoRef.current!.playbackRate += speed;
    setPlayback(playback + speed);
  };

  const resetPlayback = () => {
    videoRef.current!.playbackRate = 1;
    setPlayback(1);
  };

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
      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.5)",
        }}
      >
        <Slider
          sx={{ width: "98%" }}
          aria-label="progress-slider"
          onChange={scrub}
          value={progress}
        />
        <Box
          sx={{
            width: "99%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
            <IconButton onClick={togglePlay}>
              {paused ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton variant="plain" onClick={() => skip(-5)}>
              <Replay5 />
            </IconButton>
            <IconButton variant="plain" onClick={() => skip(5)}>
              <Forward5 />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexBasis: "400px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Box
              gap={1}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton variant="plain" onClick={() => updatePlayback(-0.25)}>
                <FastRewind />
              </IconButton>
              <Typography textColor="primary.50" onClick={resetPlayback}>
                {playback.toFixed(2)}x
              </Typography>
              <IconButton variant="plain" onClick={() => updatePlayback(0.25)}>
                <FastForward />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexBasis: "200px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton disabled>
                {volume > 0 ? <VolumeUp /> : <VolumeOff />}
              </IconButton>
              <Slider
                sx={{ flexBasis: "150px" }}
                defaultValue={1}
                max={1}
                step={0.1}
                onChange={volumeChange}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
