import React, { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  deleteCommentThunk,
  editOrCreateCommentFlagAction,
  getCommentEditIdAction,
  getEditedCommentAction,
} from "../../redux/actions/commentsAction";
import { getDate } from "../../utils/dateFormater";
import { useHistory } from "react-router-dom";

const Comment = ({
  text,
  user,
  createdAt,
  _id,
  comments,
  authId,
  setValue,
  post,
  fullPostId,
  setEditComment,
}) => {
  const dispatch = useDispatch();
  const [showEditCommentBlock, setShowEditCommentBlock] = useState(false);
  const history = useHistory();

  const onMouseEnter = () => {
    if (user._id === authId) {
      setShowEditCommentBlock(true);
    }
  };
  const onMouseLeave = () => {
    setShowEditCommentBlock(false);
  };

  const deletePost = () => {
    dispatch(
      deleteCommentThunk(
        comments.currentPage,
        comments.pageSize,
        fullPostId,
        _id,
        user._id
      )
    );
  };

  const editComment = () => {
    setEditComment(false);
    dispatch(editOrCreateCommentFlagAction("edit"));
    dispatch(getCommentEditIdAction(_id));
    let obj = comments.comments.find((item) => item._id === _id);
    dispatch(getEditedCommentAction(obj));
    history.push("/posts/" + post);
    setValue("text", text);
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="full__postComment"
    >
      <div
        className={`editCommentBlock editPostBlock ${
          showEditCommentBlock ? "show" : ""
        }`}
      >
        <EditOutlined onClick={editComment} className="editPostButton" />
        <DeleteOutlined onClick={deletePost} className="deletePostButton" />
      </div>
      <div className="full__postCommentHeader">
        <div className="full__postCommentName">{user.fullName}</div>
        <div className="full__postCommentDate">{getDate(createdAt)}</div>
      </div>
      <div className="full__postCommentText">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Comment;
