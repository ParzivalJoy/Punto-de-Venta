import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  blue: {
    margin: "auto",
    color: '#fff',
    backgroundColor: blue[800],
  },
}));

export default function IconAvatars() {
  const classes = useStyles();

  return (
      <Avatar className={classes.blue}>
        <AddIcon fontSize="large" />
      </Avatar>
  );
}
