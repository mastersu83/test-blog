import "./App.scss";
import React from "react";
import { Home } from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Post from "./pages/Post";
import Auth from "./pages/Auth";
import Reg from "./pages/Reg";
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import { SET_USER_DATA } from "./redux/actions/user";
import Create from "./pages/Create";
import NonAuth from "./pages/NonAuth";
import Err404 from "./pages/404";
import Edit from "./pages/Edit";

function App() {
  const [token, setToken] = React.useState(null);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const location = useLocation();

  React.useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token")));
  }, []);

  React.useEffect(() => {
    dispatch(SET_USER_DATA());
  }, []);

  return (
    <div className="App">
      <Routes>
        {token ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route path="/profile" element={<NonAuth />} />
        )}
        {token ? (
          <Route path="/create" element={<Create />} />
        ) : (
          <Route path="/create" element={<NonAuth />} />
        )}
        {token ? (
          <Route path="/edit/:id" element={<Edit />} />
        ) : (
          <Route path="/edit" element={<NonAuth />} />
        )}
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/reg" element={<Reg />} />
        <Route path="*" element={<Err404 />} />
      </Routes>
    </div>
  );
}

export default App;
