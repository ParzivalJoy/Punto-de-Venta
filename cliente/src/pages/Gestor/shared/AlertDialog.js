import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAgree = () => {
    props.setFieldValue("isCompleted", false);
    props.action();
  };

  const handleClose = () => {
    props.setFieldValue("isCompleted", false);
  };

  return (
    <div>
      {/* {handleOpenClose} */}
      <Dialog
        open={props.switch}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.titulo}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {props.disagree}
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            {props.agree}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
