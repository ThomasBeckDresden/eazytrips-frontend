import { makeStyles } from "@material-ui/core/styles";

const useCardStyle = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    padding: "4px 8px 0px",

    // margin: " 16px auto",
  },
  media: {
    height: 0,
    // 16:9
  },
  tick: {
    padding: "0",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    padding: "0px",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  outer: {
    margin: "8px 0",
  },
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: "8px",
  },
  span: {
    backgroundColor: theme.palette.secondary.light,
    width: "8px",
    height: "72px",
    margin: "0 16px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "16px",
  },
  distance: {
    padding: "4px",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.dark,
  },
  landing: {
    width: "80%",
    alignSelf: "center",
  },
  address: {},
}));

export default useCardStyle;
