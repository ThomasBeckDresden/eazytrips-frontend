import { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Button, Typography, Box } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const drawerHeight = 70;

const useStyles = makeStyles((theme) => ({
  drawer: {
    height: drawerHeight,
    borderRadius: "20px 20px 0 0",
    // flexShrink: 0,
    // whiteSpace: "nowrap",
  },
  paper: {
    boxSizing: "border-box",
    borderRadius: "20px 20px 0 0",
    // padding: `0 ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
    bottom: "8%",

    zIndex: 2,
  },

  drawerOpen: {
    height: `${drawerHeight}%`,
    transition: theme.transitions.create("height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowY: "hidden",
    height: "6rem",
  },
}));

export default function DrawerCustom({ children, heading }) {
  const classes = useStyles();
  const [toggleOpen, setToggleOpen] = useState(false);

  return (
    <div>
      <Drawer
        anchor="bottom"
        open={toggleOpen}
        variant="permanent"
        ModalProps={{
          BackdropProps: {
            invisible: true,
          },
        }}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: toggleOpen === true,
          [classes.drawerClose]: toggleOpen === false,
        })}
        classes={{
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: toggleOpen === true,
            [classes.drawerClose]: toggleOpen === false,
          }),
        }}
      >
        <Button onClick={() => setToggleOpen(!toggleOpen)}>
          {toggleOpen && <ExpandMoreIcon></ExpandMoreIcon>}
          {!toggleOpen && <ExpandLessIcon></ExpandLessIcon>}
        </Button>
        <Typography
          variant="h5"
          component="p"
          color="primary"
          align="center"
          gutterBottom
        >
          {heading}
        </Typography>
        <Box p={3} component="article" id="drawer-padding-wrapper">
          {children}
        </Box>
      </Drawer>
    </div>
  );
}
