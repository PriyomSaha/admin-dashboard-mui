import { lazy } from "react";

// project import
import Loadable from "Components/Loadable";
import MinimalLayout from "Layout/MinimalLayout/index";

// render - login
const AuthLogin = Loadable(
  lazy(() => import("Components/Authentication/Login"))
);
const ChangePassword = Loadable(
  lazy(() => import("Components/Authentication/ResetPassword"))
);
const ForgotoPassword = Loadable(
  lazy(() => import("Components/Authentication/ForgotPassword"))
);

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "login",
      element: <AuthLogin />,
    },
    {
      path: "reset",
      element: <ChangePassword />,
    },
    {
      path: "forgotpassword",
      element: <ForgotoPassword />,
    },
  ],
};

export default LoginRoutes;
