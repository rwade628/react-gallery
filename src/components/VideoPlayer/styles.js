import { makeStyles, withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

export const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "5px solid rgba(0,0,0,0.2)",
    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    fontSize: "0",
    overflow: "hidden"
  },
  video: props =>
    props.fullScreen
      ? {
          height: "100vh"
        }
      : {
          width: "100vw"
        },
  controls: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    right: 0,
    top: 0,
    paddingRight: 5,
    height: "100%",
    transform: props =>
      props.focused ? "translateX(0px)" : "translateX(100%) translateX(-8px)",
    transition: "all .3s",
    flexWrap: "wrap",
    flexGrow: 1,
    background: "rgba(0,0,0,0.1)"
  },
  button: {
    background: "none",
    border: 0,
    lineHeight: 1,
    color: "white",
    textAlign: "center",
    outline: 0,
    padding: "10px",
    marginRight: "15px",
    cursor: "pointer",
    maxHeight: "50px"
  }
});

export const ProgressSlider = withStyles({
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "$vertical &": {
      marginLeft: -8
    },
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  track: {
    "$vertical &": {
      width: 8,
      borderRadius: 4
    }
  },
  rail: {
    "$vertical &": {
      width: 8,
      borderRadius: 4
    }
  },
  vertical: {}
})(Slider);
