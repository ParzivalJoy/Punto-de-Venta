import React from "react";
import ReactDOM from "react-dom";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from '@material-ui/styles';
import green from "@material-ui/core/colors/green";

export default function SwitchLabels() {
  const [state, setState] = React.useState(false);

  const handleChange = event => {
    setState(event.target.checked);
  };

  const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: {
        main: "#2196f3"
      }
    }
  });

  return (
    <FormControlLabel
      control={
        // <ThemeProvider theme={theme}>
        <Checkbox
        checked={state}
        onChange={handleChange}
        value={state}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
        // </ThemeProvider>
      }
      label="Modo intervalo"
    />
  );
}
