import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  chip: {
    margin: 2
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    width: "100%"
  },
  fullList: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    padding: "10px"
  },
  listItem: {
    margin: theme.spacing(1),
    minWidth: 250
  },
  noLabel: {
    marginTop: theme.spacing(3)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  tagSelect: {
    display: "flex",
    flexDirection: "column"
  }
}));

export default useStyles;
