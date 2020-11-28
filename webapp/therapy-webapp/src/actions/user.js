import { login, logOut } from "../api/authentication";

export const setUser = (User, token) => {
  return {
    type: "SET_USER",
    payload: { User, token },
  };
};

export const startLogInUser = ({
  email = undefined,
  password = undefined,
} = {}) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      login({ email, password })
        .then(({ data, headers }) => {
          dispatch(setUser(data.user, data.token));
          resolve(data.Success);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export const startLoggingOut = () => {
  return async (dispatch) => {
    dispatch(eraseUser());
  };
};

export const eraseUser = () => ({
  type: "ERASE_USER",
});
