import { useAuth } from "@/context/AuthContext";
import { Comp404 } from "@/screens/app/404";
import { Dashboard } from "@/screens/app/dashboard";
import { Login } from "@/screens/app/auth";
import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { UTILS } from "@/constants/utils";
import { Layout } from "@/layout";
import { Help } from "@/screens/app/help";
import { Profile } from "@/screens/app/profile";
import { Post } from "@/screens/app/posts";
import { CreatePost } from "@/screens/app/create-post";

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
    <Layout />
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
        {
          path: "profile",
          Component: Profile,
        },
        {
          path: "post",
          Component: Post,
        },
        {
          path: "create-post",
          Component: CreatePost,
        },
        {
          path: "help",
          Component: Help,
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
