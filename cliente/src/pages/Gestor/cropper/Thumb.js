import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import "./style-icon.css";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  redbor: {
    border: "5px solid #f00"
  },
  greenbor: {
    border: "5px solid #0f0"
  }
}));

class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { file, status } = this.props;
    const { loading, thumb } = this.state;

    if (!file) {
      console.log("No hay archivo");
      return null;
    }

    if (loading) {
      return <p>...</p>;
    }
    return (
      <Avatar
        src={thumb}
        alt={file.name}
        className={status + " img-thumbnail mt-2"}
        sizes="60"
      />
    );
  }
}

export default Thumb;
