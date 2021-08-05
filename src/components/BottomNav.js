import { useHistory } from "react-router";
import { Container, Box } from "@material-ui/core";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {},
  items: {
    zIndex: 3,
  },
});

export default function BottomNav() {
  const classes = useStyles();
  const history = useHistory();
  const handleClickSignIn = (event) => {
    if (history.location.pathname === "/signInPage") {
      return history.goBack();
    }
    return history.push("/signInPage");
  };
  return (
    <Container style={{ background: "white" }}>
      <BottomNavigation showLabels className={classes.root}>
        <BottomNavigationAction
          className={classes.items}
          label="Discover"
          icon={<SearchIcon></SearchIcon>}
          name="discover"
          onClick={(e) => history.push("/")}
        />
        <BottomNavigationAction
          className={classes.items}
          label="Saved Trips"
          icon={<BookmarkBorderIcon />}
          onClick={(e) => history.push("/savedtrips")}
        />
        <BottomNavigationAction
          className={classes.items}
          label="Profile"
          icon={<AccountCircleIcon />}
          onClick={handleClickSignIn}
        />
      </BottomNavigation>
    </Container>
  );
}
