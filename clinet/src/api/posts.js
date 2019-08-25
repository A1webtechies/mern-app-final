import request from "./request";

export const createPost = ({ user, post }) => {
  const path = `/api/users/${user._id}/posts`;
  const options = { body: post, method: "POST" };
  return request(path, options);
};

export const destroyPost = ({ user, post }) => {
  const path = `/api/users/${user._id}/posts/${post._id}`;
  const options = { method: "DELETE" };
  return request(path, options);
};

export const updatePost = ({ user, post }) => {
  const path = `/api/users/${user._id}/posts/${post._id}`;
  const options = { body: post, method: "PUT" };
  return request(path, options);
};
