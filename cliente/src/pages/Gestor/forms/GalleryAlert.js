import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.titulo}</DialogTitle>
        <DialogContent
          style={{
            textAlign: "center",
          }}
        >
          <div>{props.selectFromGalleryComponent}</div>
          <div>{props.selectFromOpenEmoji}</div>
          <div class="ui horizontal divider">Imágenes almacenadas</div>
          {props.selectFromServer}
          <DialogContentText id="alert-dialog-description">
            {props.body}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
