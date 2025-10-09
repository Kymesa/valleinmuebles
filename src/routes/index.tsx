import { useAuth } from "@/context/AuthContext";
import { Comp404 } from "@/screens/app/404";
import { Dashboard } from "@/screens/app/dashboard";
import { Login } from "@/screens/app/auth";
import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { UTILS } from "@/constants/utils";

export const PublicRoute = () => {
  const { user } = useAuth();

  if (!UTILS.isEmptyObject(user ?? {})) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export const PrivateRoute = () => {
  const { user } = useAuth();

  return !UTILS.isEmptyObject(user ?? {}) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          index: true,
          Component: Login,
        },
      ],
      ErrorBoundary: () => <Comp404 />,
    },

    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        {
          path: "dashboard",
          Component: Dashboard,
        },
      ],
    },

    {
      path: "*",
      element: <Comp404 />,
    },
  ],
  {
    basename: "/",
  }
);
