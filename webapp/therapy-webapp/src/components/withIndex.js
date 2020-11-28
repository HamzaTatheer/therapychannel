import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Hidden from "@material-ui/core/Hidden";
import { connect } from "react-redux";
import { compose } from "redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { startLogInUser, startLoggingOut, setUser } from "../actions/user";
import { showLoading, hideLoading } from "../actions/loading";
import { toggleDarkMode } from "../actions/CustomizeTheme";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Home as HomeIcon,
  ChatBubble,
  Label,
  ListAlt,
  Subway,
  LocalHospital,
  Nature as NatureIcon,
} from "@material-ui/icons";
import {
  ChevronLeft as ChevronLeftIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";
import { NavLink, withRouter } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import DarkMode from "../reducers/DarkMode";
import { toggleDrawer } from "../actions/drawer";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.therapychannel.com/">
        Therapy Channel
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    textAlign: "center",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  selectedTab: {
    backgroundColor: "#cb3d57" + " !important",
  },
}));

const MenuItem_WithoutRouter = (props) => {
  const { MenuIcon, title, routeName, location, history } = props;
  const classes = useStyles();

  const handleTabClick = (link) => {
    history.push(link);
  };

  return (
    <Tooltip TransitionComponent={Fade} title="Clients" placement="right">
      <ListItem
        selected={
          location
            ? location.pathname.split("/")[1] == routeName.split("/")[1]
            : false
        }
        classes={{ selected: classes.selectedTab }}
        button
        onClick={() => {
          handleTabClick(routeName);
        }}
      >
        <ListItemIcon>
          <MenuIcon />
        </ListItemIcon>
        <ListItemText>{title}</ListItemText>
      </ListItem>
    </Tooltip>
  );
};

const MenuItem = withRouter(MenuItem_WithoutRouter);

const withIndex = (WrappedComponent) => {
  return (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(props.isDrawerOpen ? true : false);
    const { ...rest } = props;

    const handleDrawerOpen = () => {
      props.toggleDrawer();
      setOpen(true);
    };
    const handleDrawerClose = () => {
      props.toggleDrawer();
      setOpen(false);
    };

    const handleLogOut = async () => {
      props.showLoading();
      try {
        await props.startLoggingOut();
      } catch (err) {
        console.log(err);
      }
      //setOpen(false);
      props.hideLoading();
      props.history.push("/login");
    };

    useEffect(() => {
      let user = localStorage.getItem("user");
      let token = localStorage.getItem("token");

      if (user) {
        props.setUser(JSON.parse(user), token);
      } else {
        console.log("No user found!");
      }
    }, []);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            {props.user ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Therapy Channel
            </Typography>
            {props.user ? (
              <Typography component="h1" variant="h6" color="inherit">
                <IconButton onClick={handleLogOut} color="inherit">
                  <AccountCircleIcon />
                </IconButton>
                {props.user.NAME}
              </Typography>
            ) : null}
          </Toolbar>
          {props.loading ? <LinearProgress color="secondary" /> : null}
        </AppBar>
        <Hidden only={props.user ? [] : ["xs", "sm", "md", "lg", "xl"]}>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              <MenuItem title="Home" routeName="/home" MenuIcon={HomeIcon} />
              <MenuItem
                title="Chats"
                routeName="/chats"
                MenuIcon={ChatBubble}
              />
              <MenuItem
                title="Therapists"
                routeName="/therapists"
                MenuIcon={LocalHospital}
              />
            </List>
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <WrappedComponent {...rest} />
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  startLogInUser: (user) => dispatch(startLogInUser(user)),
  startLoggingOut: () => dispatch(startLoggingOut()),
  setUser: (user, token) => dispatch(setUser(user, token)),
  showLoading: () => dispatch(showLoading()),
  hideLoading: () => dispatch(hideLoading()),
  toggleTheme: () => dispatch(toggleDarkMode()),
  toggleDrawer: () => dispatch(toggleDrawer()),
});

const mapStateToProps = (state) => ({
  user: state.user.user_info,
  token: state.user.token,
  loading: state.loading,
  DarkMode: state.DarkMode,
  isDrawerOpen: state.isDrawerOpen,
});

const composedWithIndex = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withIndex
);

export default composedWithIndex;
