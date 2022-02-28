import { commentsApi } from "../../api/api";

export const getPostCommentsAction = (comments) => ({
  type: "GET_POST_COMMENTS",
  payload: comments,
});

export const getAllCommentsUserAction = (post) => ({
  type: "GET_ALL_COMMENTS_USER",
  payload: post,
});

export const setCurrentCommentsPageAction = (currentPage) => ({
  type: "SET_CURRENT_COMMENTS_PAGE",
  payload: currentPage,
});

export const getCommentEditIdAction = (id) => ({
  type: "GET_CURRENT_COMMENTS_ID",
  payload: id,
});

export const getEditedCommentAction = (obj) => ({
  type: "GET_EDITED_COMMENT",
  payload: obj,
});

export const editOrCreateCommentFlagAction = (flag) => ({
  type: "EDIT_OR_CREATE_COMMENT_FLAG",
  payload: flag,
});

export const getPostCommentsThunk = (postId) => async (dispatch) => {
  try {
    let resp = await commentsApi.getPostComments(postId);
    dispatch(getPostCommentsAction(resp.data));
  } catch (e) {
    console.log(e.message);
  }
};

export const getAllCommentsUserThunk =
  (currentPage, pageSize, id) => async (dispatch) => {
    try {
      let resp = await commentsApi.getAllCommentsUser(
        currentPage,
        pageSize,
        id
      );
      dispatch(setCurrentCommentsPageAction(currentPage));
      dispatch(getAllCommentsUserAction(resp.data));
    } catch (e) {
      console.log(e.message);
    }
  };

export const createCommentThunk = (text, postId) => async (dispatch) => {
  try {
    await commentsApi.createComment(text, postId);
    dispatch(getPostCommentsThunk(postId));
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteCommentThunk =
  (currentPage, pageSize, commentPostId, commentId, userid) =>
  async (dispatch) => {
    try {
      await commentsApi.deleteComment(commentId);
      dispatch(getPostCommentsThunk(commentPostId));
      dispatch(getAllCommentsUserThunk(currentPage, pageSize, userid));
    } catch (e) {
      console.log(e.message);
    }
  };

export const patchCommentThunk =
  (text, commentPostId, postId) => async (dispatch) => {
    try {
      await commentsApi.patchComment(text, commentPostId);
      dispatch(getPostCommentsThunk(postId));
    } catch (e) {
      console.log(e.message);
    }
  };
