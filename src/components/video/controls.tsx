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

import { controlOptions } from "./styles";
import { useSettingsStore } from "../../state/settings";

export default function Controls({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
}) {
  const isHorizontal = useSettingsStore((state) => state.isHorizontal);
  const [progress, setProgress] = React.useState(0);
  const [playback, setPlayback] = React.useState(1);
  const [volume, setVolume] = React.useState(100);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    videoRef.current!.play();
    setPaused(!paused);
  }, []);

  const control = controlOptions.get(isHorizontal ? "horizontal" : "vertical");

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
    const newProgress =
      (videoRef.current!.currentTime + skip) / videoRef.current!.duration;
    scrub({} as Event, newProgress * 100);
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
    <Box sx={control!.base}>
      <Slider
        sx={{ height: "98%", width: "98%" }}
        aria-label="progress-slider"
        orientation={isHorizontal ? "horizontal" : "vertical"}
        onChange={scrub}
        value={progress}
      />
      <Box sx={control!.row}>
        <Box sx={control!.scrubButtons}>
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
        <Box sx={control!.altGroup}>
          <Box gap={1} sx={control!.playback}>
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
          <Box sx={control!.volume}>
            <IconButton disabled>
              {volume > 0 ? <VolumeUp /> : <VolumeOff />}
            </IconButton>
            <Slider
              sx={{ flexBasis: "150px" }}
              defaultValue={1}
              orientation={isHorizontal ? "horizontal" : "vertical"}
              max={1}
              step={0.1}
              onChange={volumeChange}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
