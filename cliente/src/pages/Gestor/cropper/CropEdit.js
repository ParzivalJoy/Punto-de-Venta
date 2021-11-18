import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { Slider } from "@mui/material";
import Cropper from "react-easy-crop";
import "./styles.css";
import getCroppedImg from "./cropImage";

export default function CropControls(props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    //HAY QUE REFACTOORIZAR TODAS LAS EDIT TOOLS EN UN SOLO COMPONENTE,
    // AÃADIR COMPs: RECORTAR Y CANCELAR
    // showResult(croppedAreaPixels);
    props.onCropAreaChange(croppedAreaPixels);
  }, []);

  // console.log(props.icono, props.values.icono.fileUrl);
  return (
    <div>
      <div className="crop-container">
        <Cropper
          image={props.icono.fileUrl}
          crop={crop}
          zoom={zoom}
          aspect={ props.aspectRatioFraction }
          // aspect={ 4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      {props.recortar && console.log("PRESIONO RECORTAR")}
      <div className="controls">
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e, zoom) => setZoom(zoom)}
          classes={{ container: "slider" }}
        />
      </div>
    </div>
  );
}

// const rootElement = document.getElementById('root')
// ReactDOM.render(<App />, rootElement)
