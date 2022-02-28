import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostThunk,
  getFullPostThunk,
  patchPostThunk,
} from "../../redux/actions/postsAction";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Preloader from "../Preloader/Preloader";
import { useHistory } from "react-router-dom";

const schema = yup
  .object({
    title: yup
      .string()
      .min(3, "Минимум 3 символа")
      .max(256, "Максимальная длина заголовка")
      .required("Это обязательное поле"),
    description: yup
      .string()
      .min(3, "Минимум 3 символа")
      .max(400, "Максимальная длина описания")
      .required("Это обязательное поле"),
    text: yup
      .string()
      .required("Это обязательное поле")
      .min(3, "Минимум 3 символа"),
    // file: yup.required("Это обязательное поле"),
  })
  .required();

const CreatePost = ({ currentPostId, currentPage, pageSize, isAuth }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (posts.editOrCreatePostFlag === "create") {
      dispatch(createPostThunk(data, currentPage, pageSize));
      history.push("/posts/" + currentPostId);
    } else {
      dispatch(patchPostThunk(data, currentPage, pageSize, currentPostId));
      dispatch(getFullPostThunk(currentPostId));
      history.push("/posts/" + currentPostId);
    }
  };

  if (!isAuth) {
    return <Preloader text="Идет загрузка..." />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create__post">
      <span>{errors.title?.message}</span>
      <input
        {...register("title")}
        defaultValue={
          posts.editOrCreatePostFlag === "edit"
            ? setValue("title", posts.editedPost.title)
            : setValue("title", "")
        }
        className="create__titleInput"
        placeholder="Введите заголовок..."
        type="text"
      />
      <div className="create__shortDesc">Короткое описание:</div>
      <textarea
        {...register("description")}
        className="create__shortInput"
        defaultValue={
          posts.editOrCreatePostFlag === "edit"
            ? setValue("description", posts.editedPost.description)
            : setValue("description", "")
        }
      />
      <div className="create__linkTitle">Ссылка на изображение:</div>
      <div className="create__link">
        <input
          id="file"
          {...register("file", { required: true })}
          className="create__linkInput"
          type="file"
        />
      </div>
      <div className="create__longDesc">Полное описание:</div>
      <textarea
        {...register("text")}
        className="create__longInput"
        defaultValue={
          posts.editOrCreatePostFlag === "edit"
            ? setValue("text", posts.editedPost.text)
            : setValue("text", "")
        }
      />
      <div className="create__btn">
        <button type="onSubmit" className="yellow__button">
          {posts.editOrCreatePostFlag === "edit" ? "Сохранить" : "Опубликовать"}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
