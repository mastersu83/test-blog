import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import {
  getAllPostsThunk,
  getAllPostsUserThunk,
} from "../../redux/actions/postsAction";
import { getAllCommentsUserThunk } from "../../redux/actions/commentsAction";
import { getDate } from "../../utils/dateFormater";

const Profile = ({ toggleLoginPopup }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const auth = useSelector((state) => state.auth);
  const comments = useSelector((state) => state.comments);

  const [activePost, setActivePost] = useState("");
  const [postsOrCommentList, setPostsOrCommentsList] = useState(true);
  const [editComment, setEditComment] = useState(true);

  const handleActivePost = (id) => {
    setActivePost(id);
  };

  const changePostOrCommentsList = () => {
    setPostsOrCommentsList(!postsOrCommentList);
  };

  const onPagePostChanged = (currentPage) => {
    dispatch(getAllPostsUserThunk(currentPage, posts.pageSize, auth.user._id));
    dispatch(
      getAllPostsThunk(currentPage, posts.pageSize, posts.currentPostId)
    );
  };
  const onPageCommentsChanged = (currentPage) => {
    dispatch(
      getAllCommentsUserThunk(currentPage, posts.pageSize, auth.user._id)
    );
  };

  let post = posts.postsUser.map((p) => (
    <Post
      {...p}
      posts={posts.posts}
      auth={auth}
      key={p._id}
      authId={auth.user._id}
      handleActivePost={handleActivePost}
      activePost={activePost}
    />
  ));

  let comment = comments.commentsUser.map((c) => (
    <Comment
      {...c}
      authId={auth.user._id}
      setEditComment={setEditComment}
      comments={comments}
      key={c._id}
    />
  ));

  useEffect(() => {
    dispatch(
      getAllPostsUserThunk(posts.currentPage, posts.pageSize, auth.user._id)
    );
    if (comments.comments.length) {
    }
  }, [comments.comments.length]);

  return (
    <div className="profile">
      <Header toggleLoginPopup={toggleLoginPopup} />
      <div className="posts">
        <div className="profile__content">
          <div className="profile__name">{auth.user.fullName}</div>
          <div className="profile__dateRegister">
            Дата регистрации: <span>{getDate(auth.user.createdAt)}</span>
          </div>
          <div className="profile__buttons">
            <Link to="posts">
              <button
                onClick={changePostOrCommentsList}
                className={`profile__btn ${postsOrCommentList ? "active" : ""}`}
              >
                Статьи
              </button>
            </Link>
            <Link to="comments">
              <button
                onClick={changePostOrCommentsList}
                className={`profile__btn ${
                  !postsOrCommentList ? "active" : ""
                }`}
              >
                Комментарии
              </button>
            </Link>
          </div>
          {postsOrCommentList ? (
            <>
              <div className="posts__list">{post}</div>
              <div className="posts__pagination">
                <Pagination
                  total={posts.totalUserPosts}
                  current={posts.currentPage}
                  showQuickJumper
                  pageSize={posts.pageSize}
                  onChange={onPagePostChanged}
                />
              </div>
            </>
          ) : (
            <>
              <div className="full__postComments">{comment}</div>
              <div className="posts__pagination">
                <Pagination
                  total={comments.totalUserComments}
                  current={comments.currentPage}
                  showQuickJumper
                  pageSize={posts.pageSize}
                  onChange={onPageCommentsChanged}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
