import React from "react";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import Movie from "@material-ui/icons/Movie";

const Photo = ({
  index,
  onClick,
  photo,
  margin,
  direction,
  top,
  left,
  key
}) => {
  const styles = {
    container: {
      position: "relative",
      margin: margin,
      overflow: "hidden"
    },
    imgStyle: { display: "block" },
    imgWithClick: { cursor: "pointer" },
    overlay: {
      position: "absolute",
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)" /* Black see-through */,
      color: "#f1f1f1",
      width: "100%",
      fontSize: "1.2rem",
      padding: "1vw",
      textAlign: "center"
    },
    align: {
      display: "flex",
      justifyContent: "space-around"
    }
  };

  const handleClick = event => {
    onClick(event, { photo, index });
  };
  //ignore raw props
  const { rawWidth, rawHeight, ...photoProps } = photo;

  return (
    <div key={key + Math.random()} style={styles.container}>
      <img
        {...photoProps}
        data-testid="gallery-link"
        alt={key}
        style={
          onClick
            ? { ...styles.imgStyle, ...styles.imgWithClick }
            : styles.imgStyle
        }
        src={photo.thumb || photo.src}
        onClick={onClick ? handleClick : null}
      />
      {photo.name && (
        <div style={styles.overlay}>
          <div style={styles.align}>
            {photo.type === "movie" ? <Movie /> : <PhotoLibrary />}
            <span>{photo.name}</span>
            <span />
          </div>
        </div>
      )}
    </div>
  );
};

export default Photo;
