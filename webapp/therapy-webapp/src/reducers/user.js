const userReducerDefaultProps = {
  user_info: null,
  token: null,
};

export default (state = userReducerDefaultProps, action) => {
  console.log(action.type);

  switch (action.type) {
    case "SET_USER":
      const { User } = action.payload;
      const { token } = action.payload;
      const { _id, name, email, role } = User;

      console.log(User);
      console.log(token);

      if (_id && name && email && role && token)
        console.log(
          "User object Reached Reducer action SET_USER with all parameteres required"
        );
      else {
        console.log(
          "All parameters of User Object Not given to reducer. Some were not part of action"
        );
        return state;
      }

      let user_info = { _id, name, email, role };

      localStorage.setItem("user", JSON.stringify(user_info));
      localStorage.setItem("token", token);

      return { ...state, user_info, token };

    case "ERASE_USER":
      console.log("Erasing User");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return userReducerDefaultProps;
    default:
      return state;
  }
};
