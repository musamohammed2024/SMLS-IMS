import axios from "axios";
import { getToken } from "../utils/auth";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/users`,
});

// Automatically send JWT with every request
API.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ===============================
// GET ALL USERS
// ===============================
export const getUsers = async () => {
  const res = await API.get("/");
  return res.data;
};

// ===============================
// CREATE USER
// ===============================
export const createUser = async (user) => {
  const res = await API.post("/", user);
  return res.data;
};

// ===============================
// UPDATE USER
// ===============================
export const updateUser = async (id, user) => {
  const res = await API.put(`/${id}`, user);
  return res.data;
};

// ===============================
// CHANGE PASSWORD
// ===============================
export const changePassword = async (id, passwordData) => {
  const res = await API.put(`/${id}/password`, passwordData);
  return res.data;
};

// ===============================
// DELETE USER
// ===============================
export const deleteUser = async (id) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};