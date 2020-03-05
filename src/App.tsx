import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { hot } from 'react-hot-loader';
import {
  AppBar,
  createStyles, CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  useTheme
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import TogglReportContainer from './containers/pages/togglReport';
import CounterContainer from './containers/pages/counter';

const App: React.FC = () => {
  const drawerWidth = 240;
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: 36,
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
      },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
    })
  );
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline/>
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
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap>
              React Playground
            </Typography>
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
              {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
          </div>
          <Divider/>
          <List>
            <Link to="/toggl-report">
              <ListItem button>
                <ListItemIcon><AssessmentIcon/></ListItemIcon>
                <ListItemText>Toggl Report</ListItemText>
              </ListItem>
            </Link>
            <Link to="counter">
              <ListItem button>
                <ListItemIcon><ExposurePlus1Icon/></ListItemIcon>
                <ListItemText>Counter</ListItemText>
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <Switch>
            <Route path="/toggl-report" exact>
              <TogglReportContainer/>
            </Route>
            <Route path="/counter" exact>
              <CounterContainer />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default hot(module)(App);
