import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [sendProgress, setSendProgress] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAgree = async () => {
    setSendProgress(1);
    var status = await props.action();
    console.log(status);
    if (status === 2) setSendProgress(2);
    else setSendProgress(3);
    //  setLoading(false);
  };

  const handleClose = () => {
    // props.setFieldValue("isCompleted", false);
    props.close();
    // props.setFieldValue("sendProgress", 0);
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
        <DialogTitle id="alert-dialog-title">
          {sendProgress === 0
            ? props.titulo
            : sendProgress === 1
            ? "Enviando..."
            : sendProgress === 2
            ? "Completado"
            : "Ocurrio un error al enviar"}
        </DialogTitle>
        <DialogContent style={{ display: "inherit", alignItems: "center" }}>
          {sendProgress === 1 ? (
            <CircularProgress color="primary" />
          ) : sendProgress === 2 ? (
            <>
              <CheckIcon
                style={{
                  fontSize: 40,
                  color: "#45D6A9",
                  borderStyle: "solid",
                  borderColor: "#45D6A9",
                }}
              />
            </>
          ) : sendProgress === 3 ? (
            <ErrorIcon
              style={{ fontSize: 40, color: "red", marginBottom: "15px" }}
            />
          ) : (
            ""
          )}
          {/* Debug helper: 
           {`Codigo de estado: ${props.sendProgress}`} */}
          <DialogContentText
            style={{ paddingLeft: "15px" }}
            id="alert-dialog-description"
          >
            {sendProgress === 0 ? (
              props.body
            ) : sendProgress === 1 ? (
              "Por favor espere"
            ) : sendProgress === 2 ? (
              <>
                {" "}
                <div>Enviado con éxito!</div>
                <div>{props.okmessage}</div>{" "}
              </>
            ) : (
              "Verifique que el formulario este completo, llenado correctamente y usted tenga una conexión a internet o que el servidor se encuentre en servicio"
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {sendProgress === 0 ? (
            <>
              <Button onClick={handleClose} color="primary">
                {props.disagree}
              </Button>
              <Button onClick={handleAgree} color="primary" autoFocus>
                {props.agree}
              </Button>
            </>
          ) : sendProgress === 2 ? (
            <Button onClick={handleClose} color="primary" autoFocus>
              {props.agree}
            </Button>
          ) : (
            <Button onClick={handleAgree} color="primary" autoFocus>
              {"Reintentar"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
