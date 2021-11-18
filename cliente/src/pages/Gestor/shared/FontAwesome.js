import React from "react";
import { loadCSS } from "fg-loadcss";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
  root: {
    "& > .fa": {
      margin: theme.spacing(2)
    }
  }
}));

export default function FontAwesome(props) {
  const classes = useStyles();

  React.useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);

  if (props.stamp)
    return <Icon className="fa fa-stamp" style={{ fontSize: 17 }} />;
  if (props.coins)
    return <Icon className="fa fa-coins" style={{ fontSize: 17 }} />;
  if (props.palette)
    return <Icon className="fa fa-palette" style={{ fontSize: 17 }} />;
}
