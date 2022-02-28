import axios from "axios";

let instance = axios.create({
  baseURL: "/",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export function currentInstance() {
  instance = axios.create({
    baseURL: "/",
    headers: { Authorization: localStorage.getItem("token") },
  });
}

export const authApi = {
  register(fullName, email, password) {
    return instance
      .post(`auth/register`, {
        fullName: fullName,
        email: email,
        password: password,
      })
      .then((resp) => {
        if (resp.statusText) {
          return resp;
        }
      });
  },
  login(email, password) {
    return instance
      .post(`auth/login`, {
        email: email,
        password: password,
      })
      .then((resp) => {
        return resp;
      });
  },
  authMe() {
    return instance.get(`auth/me`).then((resp) => {
      return resp;
    });
  },
};
export const postsApi = {
  createPost(title, description, imgUrl, text) {
    return instance
      .post(`posts`, {
        title: title,
        description: description,
        text: text,
        photoUrl: imgUrl,
      })
      .then((resp) => {
        return resp;
      });
  },
  uploadFile(formData) {
    return instance
      .post(`posts/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        return resp.data.url;
      });
  },

  getAllPosts(currentPage, pageSize) {
    return instance
      .get(`posts?page=${currentPage}&limit=${pageSize}`)
      .then((resp) => {
        return resp;
      });
  },
  getAllPostsUser(currentPage, pageSize, id) {
    return instance
      .get(`posts?userId=${id}&page=${currentPage}`)
      .then((resp) => {
        return resp;
      });
  },
  getPost(id) {
    return instance.get(`posts/` + id).then((resp) => {
      return resp;
    });
  },
  deletePost(id) {
    return instance.delete(`posts/` + id);
  },
  patchPost({ title, description, text }, id) {
    return instance.patch(`posts/` + id, {
      title: title,
      description: description,
      text: text,
    });
  },
  searchPost(search) {
    return instance.get(`posts?query=${search}&limit=5`);
  },
};
export const commentsApi = {
  getPostComments(id) {
    return instance.get(`comments/post/${id}`).then((resp) => {
      return resp;
    });
  },
  getAllCommentsUser(currentPage, pageSize, id) {
    return instance
      .get(`comments?userId=${id}&page=${currentPage}`)
      .then((resp) => {
        return resp;
      });
  },

  createComment(text, postId) {
    return instance.post(`comments`, { text, postId }).then((resp) => {
      return resp;
    });
  },
  deleteComment(id) {
    return instance.delete(`comments/` + id);
  },
  patchComment(text, id) {
    return instance.patch(`comments/` + id, {
      text: text,
    });
  },
};
