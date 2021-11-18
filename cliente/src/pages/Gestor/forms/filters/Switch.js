import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { createMuiTheme } from "@material-ui/core/styles";
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
          <Switch
            checked={state}
            onChange={handleChange}
            value={state}
            color="primary"
          />
        // </ThemeProvider>
      }
      label="Modo intervalo"
    />
  );
}
