import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import BirthdayForm from "./BirthdayForm";

const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//     // alignItems: 'center',
//     flexWrap: "wrap",
//     "& > *": {
//       margin: theme.spacing(1),
//       width: theme.spacing(96),
//       height: theme.spacing(16)
//     }
//   },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  }
  // paper: {
  //     marginTop: theme.spacing(8),
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //   }
}));

export default function BonificacionPaper() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={15} className={classes.paper}>
        <BirthdayForm></BirthdayForm>
      </Paper>
    </div>
  );
}
