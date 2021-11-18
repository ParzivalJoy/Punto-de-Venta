import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import EditRow from "../forms/EditarNotificacionForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  // const [open, setOpen] = React.useState(true);
  const [isConfirmada, setIsConfirmada ] = React.useState(false);

  const handleAgree = () => {
    props.setFieldValue(false);
    props.action();
    // console.log()
    // setOpen(false);
  };

  const handleClose = () => {
    props.setFieldValue(false);
    // setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen="true"
        open={props.switch}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-title">{props.titulo}</DialogTitle>
        <DialogContent>
          <EditRow id={props.idp} />
          <DialogContentText id="alert-dialog-description">
            {props.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#D50000" }}>
            {/* <Button onClick={handleClose} color="secundary"> */}
            {props.disagree}
          </Button>
          {/* <Button onClick={handleAgree} color="primary" autoFocus>
            {props.agree}
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
