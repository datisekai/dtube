import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import { getType } from "./redux/typeReducer";
import { getUser } from "./redux/userReducer";
import Router from "./routes";
import Loading from "./utils/Loading";
import setHeaderAxios from "./utils/setHeaderAxios";
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
