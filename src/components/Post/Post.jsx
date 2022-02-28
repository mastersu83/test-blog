import React, { useState } from "react";
import view from "../../assets/img/view.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deletePostThunk,
  editOrCreatePostFlagAction,
  getEditedPostAction,
  getFullPostAction,
  getPostEditIdAction,
} from "../../redux/actions/postsAction";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getPostCommentsThunk } from "../../redux/actions/commentsAction";
import { getDate } from "../../utils/dateFormater";

const Post = ({
  title,
  description,
  createdAt,
  views,
  _id,
  photoUrl,
  handleActivePost,
  activePost,
  user,
  authId,
  posts,
}) => {
  const dispatch = useDispatch();
  const [showEditPostBlock, setShowEditPostBlock] = useState(false);
  const [linkUnderline, setLinkUnderline] = useState(false);

  const getFullPost = (id) => {
    let obj = posts.find((item) => item._id === id);
    dispatch(getFullPostAction(obj));
    dispatch(getPostEditIdAction(id));
    dispatch(getPostCommentsThunk(id));
    handleActivePost(id);
  };

  const deletePost = () => {
    dispatch(deletePostThunk(posts.currentPage, posts.pageSize, _id, user._id));
  };

  const onMouseEnter = () => {
    if (user._id === authId) {
      setShowEditPostBlock(true);
    }
    setLinkUnderline(true);
  };
  const onMouseLeave = () => {
    setShowEditPostBlock(false);
    setLinkUnderline(false);
  };

  const editPost = () => {
    dispatch(editOrCreatePostFlagAction("edit"));
    dispatch(getPostEditIdAction(_id));
    let obj = posts.find((item) => item._id === _id);
    dispatch(getEditedPostAction(obj));
  };

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className={`posts__item ${activePost === _id ? "active-post" : ""}`}>
        <div className="posts__itemPost">
          <div className={`editPostBlock ${showEditPostBlock ? "show" : ""}`}>
            <Link to={"/edit-post/" + _id}>
              <EditOutlined onClick={editPost} className="editPostButton" />
            </Link>
            <DeleteOutlined onClick={deletePost} className="deletePostButton" />
          </div>
          <Link to={"/posts/" + _id}>
            <div
              onClick={() => getFullPost(_id)}
              className={`posts__itemTitle ${
                linkUnderline ? "link-underline" : ""
              }`}
            >
              {title}
            </div>
          </Link>

          <div className="posts__itemText">{description}</div>
          <div className="posts__itemDate">
            <div className="posts__date">{getDate(createdAt)}</div>
            <div className="posts__view">
              <img src={view} alt="" className="posts__viewIcon" />
              <span className="posts__viewCount">{views}</span>
            </div>
          </div>
        </div>
        <img
          src={`http://localhost:5656` + photoUrl}
          alt=""
          className="posts__itemImg"
        />
      </div>
    </div>
  );
};

export default Post;
