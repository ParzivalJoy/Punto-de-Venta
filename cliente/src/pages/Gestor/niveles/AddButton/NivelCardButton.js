import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

import AvatarAddICon from "./AvatarAddIcon";

const useStyles = makeStyles({
  root: {
    minWidth: 150,
    backgroundColor: "primary",
    color: "primary"
  },
  title: {
    textAlign: "center",
    alignItems: "center",
    color: "#1565C0",
    marginBottom: 12
  },
  pos: {
    marginBottom: 12
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      style={{ backgroundColor: "#EDF0FA", border: "2px dashed #1565C0",  height: "300px"}}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography className={classes.title} variant="subtitle2" component="h2">
          Añadir otro nivel
        </Typography>
        <AvatarAddICon className={classes.pos}></AvatarAddICon>
      </CardContent>
    </Button>
  );
}
