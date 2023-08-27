import { lazy } from "react";

// project import
import Loadable from "Components/Loadable";
import MinimalLayout from "Layout/MinimalLayout/index";

// render - login
const AuthLogin = Loadable(
  lazy(() => import("Components/Authentication/Login"))
);
const ResetPassword = Loadable(
  lazy(() => import("Components/Authentication/ResetPassword"))
);
const ForgotPassword = Loadable(
  lazy(() => import("Components/Authentication/ForgotPassword"))
);
const Register = Loadable(
  lazy(() => import("Components/Authentication/Register"))
);

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: ":login",
      element: <AuthLogin />,
    },
    {
      path: "reset",
      element: <ResetPassword />,
    },
    {
      path: "forgotpassword",
      element: <ForgotPassword />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
};

export default LoginRoutes;
