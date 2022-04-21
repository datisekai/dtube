import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import MyVideo from "./pages/MyVideo";
import PlayLike from "./pages/PlayLike";
import PlayList from "./pages/PlayList";
import Popular from "./pages/Popular";
import Shorts from "./pages/Shorts";
import Subscription from "./pages/Subscription";
import PrivateRoute from "./utils/PrivateRoute";
import Recently from "./pages/Recently";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Page404 from "./pages/404";
import Channel from "./pages/Channel";
import Register from "./pages/Register";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/subscription",
      element: (
        <PrivateRoute>
          <Subscription />
        </PrivateRoute>
      ),
    },
    { path: "/popular", element: <Popular /> },
    { path: "/shorts", element: <Shorts /> },
    {
      path: "/my-video",
      element: (
        <PrivateRoute>
          <MyVideo />
        </PrivateRoute>
      ),
    },
    {
      path: "/play-like",
      element: (
        <PrivateRoute>
          <PlayLike />
        </PrivateRoute>
      ),
    },
    { path: "/history", element: <Recently /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/search", element: <Search /> },
    { path: "/watch/:id", element: <Detail /> },
    { path: "/channel/:id/*", element: <Channel /> },
    {
      path: "/play-list",
      element: (
        <PrivateRoute>
          <PlayList />
        </PrivateRoute>
      ),
    },
    {
      path: "/*",
      element: <Page404 />,
    },
  ]);
};

export default Router;
