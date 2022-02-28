import React, { useEffect, useState } from "react";
import view from "../../assets/img/view.svg";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../Preloader/Preloader";
import Comment from "../Comment/Comment";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import {
  createCommentThunk,
  editOrCreateCommentFlagAction,
  getPostCommentsThunk,
  patchCommentThunk,
} from "../../redux/actions/commentsAction";

const schema = yup
  .object({
    text: yup
      .string()
      .min(3, "Минимум 3 символа")
      .required("Это обязательное поле"),
    // file: yup.required("Это обязательное поле"),
  })
  .required();

const FullPost = ({ isFetching }) => {
  const dispatch = useDispatch();
  const [editComment, setEditComment] = useState(true);

  const auth = useSelector((state) => state.auth);
  const fullPost = useSelector((state) => state.posts.fullPost);
  const comments = useSelector((state) => state.comments);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onCancelEditComment = () => {
    setEditComment(true);
    dispatch(editOrCreateCommentFlagAction("create"));
    resetField("text");
  };
  const onSubmit = (data) => {
    if (editComment) {
      dispatch(createCommentThunk(data.text, fullPost._id));
    } else {
      dispatch(
        patchCommentThunk(data.text, comments.editedComment._id, fullPost._id)
      );
      setEditComment(true);
      dispatch(getPostCommentsThunk(fullPost._id));
    }
    resetField("text");
  };

  useEffect(() => {
    if (fullPost._id) {
      dispatch(getPostCommentsThunk(fullPost._id));
    }
  }, [fullPost._id, dispatch]);

  let comment = comments.comments.map((c) => (
    <Comment
      {...c}
      fullPostId={fullPost._id}
      setValue={setValue}
      authId={auth.user._id}
      setEditComment={setEditComment}
      comments={comments}
      key={c._id}
    />
  ));

  return (
    <>
      {isFetching ? (
        <Preloader text="Идет загрузка..." />
      ) : (
        <div className="full__post">
          <div className="full__postTitleBox">
            <img
              className="full__postImage"
              src={`http://localhost:5656` + fullPost.photoUrl}
              alt=""
            />
            <div className="full__postTitleWrapper">
              <div className="full__postDate">
                <div className="full__date">{fullPost.createdAt}</div>
                <div className="full__view">
                  <img src={view} alt="" className="full__viewIcon" />
                  <div className="full__viewCount">{fullPost.views}</div>
                </div>
              </div>
              <div className="full__postTitle">{fullPost.title}</div>
              <div className="full__postDesc">{fullPost.description}</div>
            </div>
          </div>
          <div className="full__postContainer">
            <div className="full__postText">{fullPost.text}</div>
            <div className="full__comments">
              Комментарии ({comments.totalPostComments})
            </div>
            <div className="full__postComments">{comment}</div>
            <div className="full__postAddComment">
              <div className="full__addCommentTitle">
                {editComment
                  ? "Добавить комментарий"
                  : "Редактировать комментарий"}
              </div>
              <span>{errors.text?.message}</span>

              <textarea
                {...register("text")}
                className="full__addCommentInput"
                defaultValue=""
              />
              <div className="full__addCommentBtn">
                {editComment ? (
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="yellow__button"
                  >
                    Отправить
                  </button>
                ) : (
                  <div className="full__addCommentBtn">
                    <button
                      onClick={handleSubmit(onSubmit)}
                      className="yellow__button"
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={onCancelEditComment}
                      className="yellow__button"
                    >
                      Отмена
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FullPost;
