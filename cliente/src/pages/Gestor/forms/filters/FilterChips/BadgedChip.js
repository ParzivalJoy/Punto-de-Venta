import React from "react";
import Chip from "@material-ui/core/Chip";
import Badge from "@material-ui/core/Badge";

import {
  makeStyles,
  withStyles
} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.2)
  }
}));


export default function BadgetChip(props) {
  
  const classes = useStyles();
  return (<Badge badgeContent={props.badgetContent || ""} color="secondary" showZero>
    <Chip
      key={props.key}
      //   icon={icon}
      label={props.label || ""}
      onDelete={props.onDelete}
      color="primary"
      className={classes.chip}
      onClick={props.onClick}
    />
  </Badge>);
}
