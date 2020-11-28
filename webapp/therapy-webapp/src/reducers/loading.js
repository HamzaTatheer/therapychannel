const loadingReducerDefaultProps = 0;

export default (state = loadingReducerDefaultProps, action) => {
  switch (action.type) {
    case "SHOW_LOADING":
      return state + 1;
    case "HIDE_LOADING":
      return state - 1;
    default:
      return state;
  }
};
