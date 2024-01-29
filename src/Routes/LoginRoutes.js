import { lazy } from "react";

// project import
import Loadable from "Components/Loadable";
import MinimalLayout from "Layout/MinimalLayout/index";

// render - login
const AuthLogin = Loadable(
  lazy(() => import("Components/Authentication/Login"))
);
const ChangePassword = Loadable(
  lazy(() => import("Components/Authentication/ChangePassword"))
);
const ResetPassword = Loadable(
  lazy(() => import("Components/Authentication/ResetPassword"))
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
      path: "changepassword/:token",
      element: <ChangePassword />,
    },
    {
      path: "resetpassword",
      element: <ResetPassword />,
    },
    {
      path: "register/:token",
      element: <Register />,
    },
  ],
};

export default LoginRoutes;
