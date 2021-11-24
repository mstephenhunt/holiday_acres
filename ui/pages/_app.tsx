import React from "react";
import {
  ThemeProvider,
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "../src/theme";

const generateClassName = createGenerateClassName({
  productionPrefix: "myclasses-",
});

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const [key, setKey] = React.useState(0);

  React.useEffect(() => {
    setKey(1);
  }, []);

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <StylesProvider key={key} generateClassName={generateClassName}>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    </StylesProvider>
  );
}
