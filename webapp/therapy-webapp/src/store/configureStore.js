import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import userReducer from "../reducers/user";
import loadingReducer from "../reducers/loading";
import DarkMode from "../reducers/DarkMode";
import thunk from "redux-thunk";
import Drawer from "../reducers/Drawer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      loading: loadingReducer,
      DarkMode: DarkMode,
      isDrawerOpen: Drawer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
