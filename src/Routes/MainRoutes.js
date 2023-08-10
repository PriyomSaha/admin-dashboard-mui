import { lazy } from "react";

// project import
import Loadable from "Components/Loadable";
import MainLayout from "Layout/MainLayout";

// render - navigations
const Dashboard = Loadable(
  lazy(() => import("Components/Navigations/Dashboard"))
);
const Orders = Loadable(lazy(() => import("Components/Navigations/Orders")));

const Merchants = Loadable(
  lazy(() => import("Components/Navigations/Merchants"))
);

const Customers = Loadable(
  lazy(() => import("Components/Navigations/Customers"))
);

const Promotions = Loadable(
  lazy(() => import("Components/Navigations/Promotions"))
);

const Analytics = Loadable(
  lazy(() => import("Components/Navigations/Analytics"))
);

const BusinessAnalytics = Loadable(
  lazy(() => import("Components/Navigations/Analytics/Business"))
);
const BusinessReports = Loadable(
  lazy(() => import("Components/Navigations/Analytics/Reports"))
);
const BusinessReviews = Loadable(
  lazy(() => import("Components/Navigations/Analytics/Review"))
);
const Merchant = Loadable(
  lazy(() => import("Components/Navigations/Merchants/Merchant"))
);
const Category = Loadable(
  lazy(() => import("Components/Navigations/Merchants/Category"))
);
const Product = Loadable(
  lazy(() => import("Components/Navigations/Merchants/Product"))
);
const Settings = Loadable(
  lazy(() => import("Components/Navigations/Settings"))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "orders",
      element: <Orders />,
    },
    {
      path: "analytics",
      element: <Analytics />,
      children: [
        {
          path: "business",
          element: <BusinessAnalytics />,
        },
        {
          path: "reports",
          element: <BusinessReports />,
        },
        {
          path: "review",
          element: <BusinessReviews />,
        },
      ],
    },
    {
      path: "merchants",
      element: <Merchants />,
      children: [
        {
          path: "",
          element: <Merchant />,
        },
        {
          path: "product",
          element: <Product />,
        },
        {
          path: "category",
          element: <Category />,
        },
      ],
    },
    {
      path: "settings",
      element: <Settings />,
    },
    {
      path: "customers",
      element: <Customers />,
    },
    {
      path: "promotions",
      element: <Promotions />,
    },
  ],
};

export default MainRoutes;
