import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Channel from "./pages/Channel";
import { useEffect } from "react";
import axios from "axios";
import Login from "./pages/Login";
import setHeaderAxios from "./utils/setHeaderAxios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/userReducer";
import Loading from "./utils/Loading";
import { getType } from "./redux/typeReducer";
import Detail from "./pages/Detail";
import PlayList from "./pages/PlayList";
import PlayLike from "./pages/PlayLike";
import MyVideo from "./pages/MyVideo";
import PrivateRoute from "./utils/PrivateRoute";
import Recently from "./pages/Recently";
import Subscription from "./pages/Subscription";
import Popular from "./pages/Popular";
import Shorts from "./pages/Shorts";
import Search from "./pages/Search";
import Page404 from "./pages/404";
import Router from "./routes";
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  axios.defaults.baseURL =
    "https://dtube-server-production-b434.up.railway.app";
  useEffect(() => {
    dispatch(getType());
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setHeaderAxios(sessionStorage.getItem("token"));
      dispatch(getUser());
    }
  }, [sessionStorage.getItem("token")]);

  if (sessionStorage.getItem("token") && typeof user === "undefined")
    return <Loading />;

  return (
    <div className='App'>
      <Header />
      <Router />
    </div>
  );
}

export default App;
