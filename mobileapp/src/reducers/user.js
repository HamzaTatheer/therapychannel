const userReducerDefaultProps = { user_info: null, access_token: null,refresh_token: null };

export default (state = userReducerDefaultProps, action) => {
    console.log(action.type);


  switch (action.type) {
    case "SET_USER":
    
      const {User} = action.payload;
      const {access_token,refresh_token} = action.payload;
      const {USER_ID, NAME, EMAIL, ROLE} = User;

      console.log(User);
      console.log(access_token);
      console.log(refresh_token);


      let id=USER_ID;
      let name=NAME;
      let email=EMAIL;
      let role=ROLE;

      if (id && name && email && role && access_token && refresh_token)
          console.log("User object Reached Reducer action SET_USER with all parameteres required");
      else{
          console.log("All parameters of User Object Not given to reducer. Some were not part of action");
          return state;
      }

      let user_info = {USER_ID,NAME,EMAIL,ROLE};

//      localStorage.setItem("user",JSON.stringify(user_info));
//     localStorage.setItem("accesstoken",access_token);
//      localStorage.setItem("refreshtoken",refresh_token);



      return { ...state, user_info, access_token, refresh_token };



      
    case "ERASE_USER":
      console.log('Erasing User');
//     localStorage.removeItem("user");
//     localStorage.removeItem("refreshtoken");
//     localStorage.removeItem("accesstoken");
      return userReducerDefaultProps;
    default:
      return state;
  }
}