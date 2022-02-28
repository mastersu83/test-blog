const initialState = {
  posts: [],
  postsUser: [],
  fullPost: {},
  totalPosts: 0,
  totalUserPosts: 0,
  pageSize: 5,
  currentPage: 1,
  currentPostId: null,
  editedPost: {},
  editOrCreatePostFlag: "create",
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_POSTS":
      return {
        ...state,
        posts: action.payload.items,
        totalPosts: action.payload.total,
      };
    case "GET_ALL_POSTS_USER":
      return {
        ...state,
        postsUser: action.payload.items,
        totalUserPosts: action.payload.total,
      };
    case "SET_CURRENT_POSTS_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "GET_CURRENT_POST_ID":
      return {
        ...state,
        currentPostId: action.payload,
      };
    case "GET_EDITED_POST":
      return {
        ...state,
        editedPost: action.payload,
      };
    case "GET_FULL_POST":
      return { ...state, fullPost: action.payload };
    case "EDIT_OR_CREATE_POST_FLAG":
      return { ...state, editOrCreatePostFlag: action.payload };
    default:
      return state;
  }
};
