import { postsApi } from "../../api/api";

export const getAllPostsAction = (post) => ({
  type: "GET_ALL_POSTS",
  payload: post,
});
export const getAllPostsUserAction = (post) => ({
  type: "GET_ALL_POSTS_USER",
  payload: post,
});

export const getFullPostAction = (post) => ({
  type: "GET_FULL_POST",
  payload: post,
});

export const setCurrentPostsPageAction = (currentPage) => ({
  type: "SET_CURRENT_POSTS_PAGE",
  payload: currentPage,
});

export const getPostEditIdAction = (id) => ({
  type: "GET_CURRENT_POST_ID",
  payload: id,
});

export const getEditedPostAction = (obj) => ({
  type: "GET_EDITED_POST",
  payload: obj,
});

export const editOrCreatePostFlagAction = (flag) => ({
  type: "EDIT_OR_CREATE_POST_FLAG",
  payload: flag,
});

export const createPostThunk =
  ({ title, description, file, text }, currentPage, pageSize) =>
  async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file[0]);
      let imgUrl = await postsApi.uploadFile(formData);
      let resp = await postsApi.createPost(title, description, imgUrl, text);

      dispatch(getAllPostsThunk(currentPage, pageSize, resp.data._id));
    } catch (e) {
      console.log(e.message);
    }
  };

export const getAllPostsThunk =
  (currentPage, pageSize, id) => async (dispatch) => {
    try {
      let resp = await postsApi.getAllPosts(currentPage, pageSize);
      dispatch(setCurrentPostsPageAction(currentPage));
      dispatch(getAllPostsAction(resp.data));
      dispatch(getFullPostThunk(!id ? resp.data.items[0]._id : id));
    } catch (e) {
      console.log(e.message);
    }
  };
export const getAllPostsUserThunk =
  (currentPage, pageSize, id) => async (dispatch) => {
    try {
      let resp = await postsApi.getAllPostsUser(currentPage, pageSize, id);
      dispatch(setCurrentPostsPageAction(currentPage));
      dispatch(getAllPostsUserAction(resp.data));
    } catch (e) {
      console.log(e.message);
    }
  };

export const getFullPostThunk = (id) => async (dispatch) => {
  try {
    let resp = await postsApi.getPost(id);
    dispatch(getPostEditIdAction(resp.data._id));
    dispatch(getFullPostAction(resp.data));
  } catch (e) {
    console.log(e.message);
  }
};

export const deletePostThunk =
  (currentPage, pageSize, id, userId) => async (dispatch) => {
    try {
      await postsApi.deletePost(id);
      dispatch(getAllPostsThunk(currentPage, pageSize, null));
      dispatch(getAllPostsUserThunk(currentPage, pageSize, userId));
    } catch (e) {
      console.log(e.message);
    }
  };

export const patchPostThunk =
  (data, currentPage, pageSize, id) => async (dispatch) => {
    try {
      await postsApi.patchPost(data, id);
      dispatch(getAllPostsThunk(currentPage, pageSize, id));
    } catch (e) {
      console.log(e.message);
    }
  };

export const searchPostThunk = (search) => async (dispatch) => {
  try {
    let resp = await postsApi.searchPost(search);
    dispatch(getAllPostsAction(resp.data));
  } catch (e) {
    console.log(e.message);
  }
};
