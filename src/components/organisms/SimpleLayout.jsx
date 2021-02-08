import React from "react";
import Head from "next/head";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const siteTitle = "Book Log";

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

const SimpleLayout = (props) => {
  const { title, children } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title>{props.title ? `${title} | ${siteTitle}` : siteTitle}</title>
      </Head>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Book Log
          </Typography>
        </Toolbar>
      </AppBar>
      <main className="py-20">{children}</main>
    </React.Fragment>
  );
};

export default SimpleLayout;
