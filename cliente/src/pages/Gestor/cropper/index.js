import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Slider from "@material-ui/core/Slider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Cropper from "react-easy-crop";
import { getOrientation } from "get-orientation/browser";
import getCroppedImg from "./cropImage";
import { getRotatedImage } from "./rotateImage";
import "./styles.css";
import { Button } from "@material-ui/core";
import ImgDialog from "./imgDialog";
import axios from "axios";

const ORIENTATION_TO_ANGLE = {
  "3": 180,
  "6": 90,
  "8": -90
};

export default class CropperFileButton extends React.Component {
  state = {
    imageSrc: null,
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 4 / 3,
    croppedAreaPixels: null,
    croppedImage: null,
    isCropping: false,
    isSendingtoServer: false,
    imageName: null
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    this.setState({
      croppedAreaPixels
    });
  };

  onZoomChange = zoom => {
    this.setState({ zoom });
  };

  // blobToFile = (theBlob, fileName) => {
  //   //A Blob() is almost a File() - it's just missing the two properties below which we will add
  //   theBlob.lastModifiedDate = new Date()
  //   theBlob.name = fileName
  //   return theBlob
  // }

  postImage = async file => {
    var filna;
    if (this.state.imageName != null && this.state.imageName.length > 0)
      filna = this.state.imageName;
    else filna = "filename.png";

    try {
      this.setState({
        isSendingtoServer: true
      });
      const formData = new FormData();
      formData.append("photo", file, filna);
      axios
        .post(`${apiUrl}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
          if (res.data.status === 200)
            this.setState({
              imageName: res.data
            });
        })
        .catch(err => console.log(err));
      this.setState({
        isSendingtoServer: false
      });
    } catch (e) {
      console.error(e);
      this.setState({
        isCropping: false
      });
    }
  };

  showResult = async () => {
    try {
      this.setState({
        isCropping: true
      });
      const croppedImage = await getCroppedImg(
        this.state.imageSrc,
        this.state.croppedAreaPixels,
        this.postImage
      );
      console.log("done", { croppedImage });
      this.setState({
        croppedImage,
        isCropping: false
      });
    } catch (e) {
      console.error(e);
      this.setState({
        isCropping: false
      });
    }
  };

  onClose = async () => {
    this.setState({
      croppedImage: null
    });
  };

  onFileChange = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      this.setState({
        imageSrc: imageDataUrl,
        crop: { x: 0, y: 0 },
        zoom: 1,
        imageName: file.name
      });

      console.log("Changed");
      console.log(this.state.imageName);
    }
  };

  render() {
    return (
      <div className="App">
        <input type="file" onChange={this.onFileChange} />
        {this.state.imageSrc && (
          <Fragment>
            <div className="crop-container">
              <Cropper
                image={this.state.imageSrc}
                crop={this.state.crop}
                zoom={this.state.zoom}
                aspect={this.state.aspect}
                onCropChange={this.onCropChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
                onPostImage={this.postImage}
              />
            </div>
            <div className="controls">
              <Slider
                value={this.state.zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => this.onZoomChange(zoom)}
                classes={{ container: "slider" }}
              />
            </div>
            <div className="button">
              <Button
                color="primary"
                variant="contained"
                onClick={this.showResult}
                disabled={this.state.isCropping}
              >
                Show result
              </Button>
            </div>
            {this.state.isSendingtoServer ? (
              <CircularProgress />
            ) : (
              <ImgDialog img={this.state.croppedImage} onClose={this.onClose} />
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
