import { useAuth } from "@/context/AuthContext";
import { Comp404 } from "@/screens/app/404";
import { Dashboard } from "@/screens/app/dashboard";
import { Login } from "@/screens/app/auth";
import { LandingPage } from "@/screens/main";
import { Chat } from "@/screens/app/chat";
import { ChatsList } from "@/screens/app/chats-list";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from "react-router";
import { UTILS } from "@/constants/utils";
import { Layout } from "@/layout";
import { Help } from "@/screens/app/help";
import { Profile } from "@/screens/app/profile";
import { Post } from "@/screens/app/posts";
import { CreatePost } from "@/screens/app/create-post";
import { Favorites } from "@/screens/app/favorites";

export const PublicRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (
    !UTILS.isEmptyObject(user ?? {}) &&
    (location.pathname === "/" || location.pathname === "/auth")
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export const PrivateRoute = () => {
  const { user } = useAuth();

  return UTILS.isEmptyObject(user ?? {}) ? (
    <Navigate to="/" replace />
  ) : (
    <Layout />
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
          Component: LandingPage,
        },
        {
          path: "auth",
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
          path: "favorites",
          Component: Favorites,
        },
        {
          path: "help",
          Component: Help,
        },
        {
          path: "chats",
          Component: ChatsList,
        },
        {
          path: "chat/:id?",
          Component: Chat,
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
