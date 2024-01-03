export type Styles = {
  base: object;
  row: object;
  scrubButtons: object;
  altGroup: object;
  playback: object;
  volume: object;
};

export const controlOptions = new Map<string, Styles>();

// VERTICAL
controlOptions.set("horizontal", {
  base: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.5)",
  },
  row: {
    width: "99%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrubButtons: { display: "flex", flexDirection: "row", gap: 1.5 },
  altGroup: {
    flexBasis: "400px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "end",
  },
  playback: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  volume: {
    flexBasis: "200px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

// HORIZONTAL
controlOptions.set("vertical", {
  base: {
    position: "absolute",
    top: "0",
    right: "0",
    paddingRight: "5px",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.5)",
  },
  row: {
    height: "99%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrubButtons: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  altGroup: {
    flexBasis: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "end",
  },
  playback: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  volume: {
    flexBasis: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1.5
  },
});
