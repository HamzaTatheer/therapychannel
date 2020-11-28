import React, { Component, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (localStorage.getItem("user") != null) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user_info,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
