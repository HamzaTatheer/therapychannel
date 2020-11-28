const userReducerDefaultProps = false;

export default (state = userReducerDefaultProps, action) => {
  console.log(action.type);

  switch (action.type) {
    case "TOGGLE_DRAWER":
      console.log(!state);
      return !state;

    default:
      return state;
  }
};
