import React, { useCallback, useState, useEffect, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Forward30Icon from "@material-ui/icons/Forward30";
import Replay10Icon from "@material-ui/icons/Replay10";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { useStyles, ProgressSlider } from "./styles";

const Video = ({ src, closeModal }, ref) => {
  const [state, setState] = useState({
    video: null,
    player: null,
    progress: 0,
    playbackRate: 1,
    volume: 1,
    fullScreen: false
  });

  const [fullScreen, setFullScreen] = useState(false);

  const [focused, setFocus] = useState(false);

  const classes = useStyles({ focused, fullScreen });

  const timeout = useRef(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const handleProgress = useCallback(() => {
    const percent =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setState({
      progress: percent
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    setState({
      video: video
    });
    video.play();
    videoRef.current.addEventListener("timeupdate", handleProgress);
    return function cleanup() {
      clearInterval(timeout.current);
      video.pause();
      video.removeEventListener("timeupdate", handleProgress);
    };
  }, [handleProgress]);

  const togglePlay = () => {
    const method = videoRef.current.paused ? "play" : "pause";
    videoRef.current[method]();
  };

  const toggleFullscreen = () => {
    setFullScreen(!fullScreen);
  };

  const scrub = (e, val) => {
    focusControls(e);
    const scrubTime = (val / 100) * videoRef.current.duration;
    if (!isNaN(scrubTime)) {
      videoRef.current.currentTime = scrubTime;
    }
  };

  const focusControls = e => {
    clearInterval(timeout.current);
    timeout.current = setInterval(() => {
      setFocus(false);
    }, 2000);
    setFocus(true);
  };

  const skip = e => {
    const skipValue = e.currentTarget.dataset.skip;
    if (!isNaN(skipValue)) {
      videoRef.current.currentTime += Number(skipValue);
    }
  };

  return (
    <div
      className={classes.root}
      ref={playerRef}
      onPointerDown={focusControls}
      onMouseOver={focusControls}
      data-testid="video-player"
    >
      <video ref={videoRef} className={classes.video}>
        <source src={src} type="video/mp4" />
        <p>Your browser doesn't support HTML5 video.</p>
      </video>
      <div className={classes.controls}>
        <ProgressSlider
          orientation="vertical"
          value={state.progress || 0}
          aria-labelledby="vertical-slider"
          onChange={scrub}
        />
        <IconButton className={classes.button} onClick={closeModal}>
          <CloseIcon fontSize="large" />
        </IconButton>
        <IconButton className={classes.button} onClick={togglePlay}>
          {videoRef.current && !!videoRef.current.paused ? (
            <PlayArrowIcon />
          ) : (
            <PauseIcon />
          )}
        </IconButton>
        <IconButton data-skip="25" className={classes.button} onClick={skip}>
          <Forward30Icon />
        </IconButton>
        <IconButton data-skip="-10" className={classes.button} onClick={skip}>
          <Replay10Icon />
        </IconButton>
        <IconButton className={classes.button} onClick={toggleFullscreen}>
          {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </div>
    </div>
  );
};

export default React.forwardRef(Video);
