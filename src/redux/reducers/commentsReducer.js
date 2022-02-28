const initialState = {
  comments: [],
  commentsUser: [],
  totalComments: 0,
  totalPostComments: 0,
  totalUserComments: 0,
  editedComment: {},
  currentCommentId: null,
  pageSize: 5,
  currentPage: 1,
  editOrCreateCommentFlag: "create",
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POST_COMMENTS":
      return {
        ...state,
        comments: action.payload,
        totalPostComments: action.payload.length,
      };
    case "GET_ALL_COMMENTS_USER":
      return {
        ...state,
        commentsUser: action.payload.items,
        totalUserComments: action.payload.total,
      };
    case "SET_CURRENT_COMMENTS_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "GET_EDITED_COMMENT":
      return {
        ...state,
        editedComment: action.payload,
      };
    case "GET_CURRENT_COMMENTS_ID":
      return {
        ...state,
        currentCommentId: action.payload,
      };
    case "EDIT_OR_CREATE_COMMENT_FLAG":
      return { ...state, editOrCreateCommentFlag: action.payload };
    default:
      return state;
  }
};
