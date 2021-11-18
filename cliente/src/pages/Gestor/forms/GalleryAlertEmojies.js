import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog(props) {
  const handleClose = () => {
    props.close();
  };

  return (
    <div>
      {/* {handleOpenClose} */}
      <Dialog
        open={props.switch}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.titulo}</DialogTitle>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
            style={{ position: "absolute", top: "10px" }}
          >
            Cerrar
          </Button>
        </DialogActions>
        <DialogContent
          style={{
            textAlign: "center",
          }}
        >
          <div>{props.selectFromGalleryComponent}</div>
          <div>{props.selectFromOpenEmoji}</div>
          {/* <div class="ui horizontal divider">Imágenes almacenadas</div> */}
          {props.selectFromServer}
          <DialogContentText id="alert-dialog-description">
            {props.body}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
