import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import LogIn from "./components/authentication/LogIn";
import Home from "./components/Home/Home";
import Chats from "./components/Chats/Chats";
import Chat from "./components/Chats/Chat/Chat";
import Therapists from "./components/Therapists/Therapists";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { connect } from "react-redux";

const store = configureStore();
// import * as serviceWorker from './serviceWorker';

const DayObject = {
  palette: {
    type: "light",
    primary: {
      main: "#228B22",
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#fff",
    },
    background: {
      paper: "#D3D3D3",
      default: "#FFFFFF",
    },
  },
};

const NightObject = {
  palette: {
    type: "dark",
    primary: {
      main: "#cb3d57",
    },
    secondary: {
      main: "#8f9095",
      contrastText: "#fff",
    },
    background: {
      paper: "#181e34",
      default: "#020a20",
    },
  },
};

const DayTheme = createMuiTheme(DayObject);
const NightTheme = createMuiTheme(NightObject);

const mapStateToProps = (state) => ({
  DarkMode: state.DarkMode,
});

const App = connect(mapStateToProps)((props) => {
  return (
    <MuiThemeProvider theme={props.DarkMode ? NightTheme : DayTheme}>
      <Router>
        <Switch>
          <Route exact path={["/", "/login"]} component={LogIn} />
          <Route exact path={["/Home", "/home"]} component={Home} />
          <Route exact path={["/Chats", "/chats"]} component={Chats} />
          <Route exact path={["/Chats/Chat", "/chats/chat"]} component={Chat} />
          <Route
            exact
            path={["/Therapists", "/therapists"]}
            component={Therapists}
          />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
