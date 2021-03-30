import { Card, Typography } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { useStopwatch } from "react-timer-hook";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={RegisterAttendance} />
          <Route
            exact
            path="/maundy-thursday"
            component={() => <RegisterAttendance title={"Maundy Thursday"} />}
          />
          <Route
            exact
            path="/good-friday"
            component={() => <RegisterAttendance title={"Good Friday"} />}
          />
          <Route
            exact
            path="/easter-vigil"
            component={() => <RegisterAttendance title={"Easter Vigil"} />}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

const RegisterAttendance = ({ title }) => {
  const [state, setState] = useState({
    result: "No result",
  });

  const { seconds, minutes, hours, reset } = useStopwatch({
    autoStart: true,
  });

  const handleScan = (data) => {
    if (data) {
      setState({
        result: data,
      });
      reset();
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  console.log(title);
  return (
    <div style={{ height: "400", width: "400" }}>
      <Typography>{title}</Typography>
      <Card style={{ margin: 100, background: "teal" }}>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ margin: 40 }}
        />
      </Card>
      <Card>
        <Typography style={{ textAlign: "center" }}>
          {state.result} Scanned at : <span>{hours}</span>:
          <span>{minutes}</span>:<span>{seconds} </span>
          secs
        </Typography>
      </Card>
    </div>
  );
};

export default App;
