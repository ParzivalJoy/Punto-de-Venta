import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FontAwesome from "../shared/FontAwesome";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import CakeRoundedIcon from "@material-ui/icons/CakeRounded";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import ShowChartRoundedIcon from "@material-ui/icons/ShowChartRounded";
import EmojiFoodBeverageOutlinedIcon from "@material-ui/icons/EmojiFoodBeverageOutlined";
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import NotificacionForm from "../forms/NotificacionWithMaterialUI";

import TableRemote from "../home/TableRemote";
import EditRow from "../forms/EditarNotificacionForm";
import BirthdayPaper from "../birthdays/index";
import AyudaPaper from "../ayuda/index";
import SellosPaper from "../sellos/index";
import NivelesPaper from "../niveles/index";
import CatalogoPaper from "../catalogo/index";
import MetabaseIframe from "../metabase/index";
import DemoHelpers from "../autoDemo/index";

import Date from "../forms/filters/DateRange";
import Rango from "../forms/filters/RangoPicker";

import { Box, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import useBubbletownApi from "../helpers/useBubbletownApi";
import CircularProgress from "@material-ui/core/CircularProgress";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // background: "#eee",
    // backgroundImage:
    //   "url(" + "https://www.transparenttextures.com/patterns/cubes.png" + ")",
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
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: "flex",
    // alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  ItemIcon: {
    // display:"flex",
    alignSelf: "center",
    // justifyContent:"center"
  },
  timeNow: {
    alignSelf: "flex-start",
    position: "absolute",
    right: "30px",
    textAlign: "end",
  },
  col: {
    backgroundColor: "#a8e6cf",
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentPage, SetCurrentPage] = React.useState(0);
  const { data: Time, loading } = useBubbletownApi({
    path: `time`,
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            BubbleTown
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <Box className={classes.timeNow}>
              <Typography variant="overline">{Time.current_date}</Typography>
              <Typography variant="h6">{Time.current_time}</Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            key={1}
            component={Link}
            to="/home"
            className={currentPage == 1 && classes.col}
            onClick={() => {
              SetCurrentPage(1);
            }}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Notificaciones"} />
          </ListItem>
          <ListItem
            button
            key={2}
            component={Link}
            to="/forms"
            className={currentPage == 2 && classes.col}
            onClick={() => {
              SetCurrentPage(2);
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Formularios"} />
          </ListItem>
          <ListItem
            button
            key={3}
            component={Link}
            to="/birthdays"
            className={currentPage == 3 && classes.col}
            onClick={() => {
              SetCurrentPage(3);
            }}
          >
            <ListItemIcon>
              <CakeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Cumpleaños"} />
          </ListItem>
          <ListItem
            button
            key={4}
            component={Link}
            to="/questionsAnswers"
            className={currentPage == 4 && classes.col}
            onClick={() => {
              SetCurrentPage(4);
            }}
          >
            <ListItemIcon>
              <HelpOutlineRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Ayuda (Q&A)"} />
          </ListItem>
          <ListItem
            button
            key={5}
            component={Link}
            to="/stamps"
            className={currentPage == 5 && classes.col}
            onClick={() => {
              SetCurrentPage(5);
            }}
          >
            <ListItemIcon>
              <FontAwesome stamp={true} />
            </ListItemIcon>
            <ListItemText primary={"Sistema de sellos"} />
          </ListItem>
          <ListItem
            button
            key={6}
            component={Link}
            to="/points"
            className={currentPage == 6 && classes.col}
            onClick={() => {
              SetCurrentPage(6);
            }}
          >
            <ListItemIcon>
              <FontAwesome coins={true} />
            </ListItemIcon>
            <ListItemText primary={"Sistema de puntos"} />
          </ListItem>
          <ListItem
            button
            key={7}
            component={Link}
            to="/catalogo"
            className={currentPage == 7 && classes.col}
            onClick={() => {
              SetCurrentPage(7);
            }}
          >
            <ListItemIcon>
              <EmojiFoodBeverageOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Catálogo"} />
          </ListItem>
          {/* <ListItem
            button
            key={8}
            component={Link}
            to="/demoPV"
            className={currentPage == 8 && classes.col}
            onClick={() => {
              SetCurrentPage(8);
            }}
          >
            <ListItemIcon>
              <SettingsInputComponentIcon />
            </ListItemIcon>
            <ListItemText primary={"Herramientas de pruebas"} />
          </ListItem> */}
          {/* <ListItem button key={8} component={Link} to="/metabase" className={currentPage == 8 && classes.col} onClick={() => {SetCurrentPage(8);}}>
            <ListItemIcon >
              <ShowChartRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Analíticos (Metabase)"} />
          </ListItem> */}
          {/* <ListItem button key={9} component={Link} to="/palette" className={currentPage == 9 && classes.col} onClick={() => {SetCurrentPage(9);}}>
            <ListItemIcon>
              <FontAwesome palette={true} />
            </ListItemIcon>
            <ListItemText primary={"Preferencias"} />
          </ListItem> */}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/forms">
            <NotificacionForm />
          </Route>
          <Route path="/home">
            <TableRemote />
          </Route>
          <Route path="/catalogo">
            <CatalogoPaper />
          </Route>
          <Route path="/birthdays">
            <BirthdayPaper />
          </Route>
          <Route path="/questionsAnswers">
            <AyudaPaper />
          </Route>
          <Route path="/stamps">
            <SellosPaper />
          </Route>
          <Route path="/points">
            <NivelesPaper />
          </Route>
          {/* <Route path="/demoPV">
            <DemoHelpers />
          </Route> */}
          {/* <Route path="/metabase">
            <MetabaseIframe />
          </Route> */}
          {/* <Routs */}
          <Route path="/" />
        </Switch>
      </main>
    </div>
  );
}
