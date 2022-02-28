// import React from "react";
// import { Redirect } from "react-router-dom";
// import { useSelector } from "react-redux";
//
// export const withAuthRedirect = (Component) => {
//   function RedirectComponent(props) {
//     const isAuth = useSelector((state) => state.auth.isAuth);
//     if (!isAuth) return <Redirect to={"/"} />;
//     return <Component {...props} />;
//   }
//
//   return RedirectComponent;
// };
