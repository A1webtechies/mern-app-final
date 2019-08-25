import request from "./request";

export const fetchUsers = () => request("/api/users");
