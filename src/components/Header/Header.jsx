import React, { useEffect, useState } from "react";
import search from "../../assets/img/search.svg";
import { Link, Route, Switch } from "react-router-dom";
import addPost from "../../assets/img/addPost.svg";
import logIn from "../../assets/img/logIn.svg";
import logOut from "../../assets/img/logOut.svg";
import { logOutThunk, setErrorText } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import {
  editOrCreatePostFlagAction,
  getEditedPostAction,
  searchPostThunk,
} from "../../redux/actions/postsAction";
import { useDebounce } from "use-debounce";

const Header = ({ toggleLoginPopup }) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [inputValue] = useDebounce(searchInputValue, 1000);

  const auth = useSelector((state) => state.auth);
  const onAddPost = () => {
    dispatch(editOrCreatePostFlagAction("create"));
    dispatch(getEditedPostAction({}));
    if (!auth.isAuth) {
      dispatch(setErrorText("Необходимо войти"));
    }
  };

  const showSearch = () => {
    setSearchInput(!searchInput);
    dispatch(searchPostThunk(""));
  };

  const onSearchChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  useEffect(() => {
    dispatch(searchPostThunk(searchInputValue));
  }, [inputValue]);

  const onLogOut = () => {
    dispatch(logOutThunk());
  };
  return (
    <div className="posts__header">
      {searchInput ? (
        <input
          onBlur={showSearch}
          onChange={onSearchChange}
          name="search"
          autoFocus={true}
          className="posts__headerSearch"
          type="text"
        />
      ) : (
        <>
          <Link to="/">
            <div className="posts__headerTitle">
              {auth.user.fullName && auth.user.fullName.toUpperCase()} BLOG
            </div>
          </Link>
          <div className="posts__headerIcons">
            <img
              onClick={showSearch}
              src={search}
              alt=""
              className="posts__headerIcon"
              title="Поиск"
            />
            <Link to="/create-post">
              <img
                onClick={onAddPost}
                src={addPost}
                alt=""
                className="posts__headerIcon"
                title="Создать статью"
              />
            </Link>

            {!auth.isAuth && (
              <img
                onClick={toggleLoginPopup}
                src={logIn}
                alt=""
                className="posts__headerIcon"
                title="Вход"
              />
            )}

            <Switch>
              {auth.isAuth && (
                <Route>
                  <Link to="/">
                    <img
                      onClick={onLogOut}
                      src={logOut}
                      alt=""
                      className="posts__headerIcon"
                      title="Выход"
                    />
                  </Link>
                </Route>
              )}
            </Switch>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
