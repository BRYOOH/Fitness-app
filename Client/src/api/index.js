import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/",
});

export const UserSignUp = async (data) => API.post("/signup", data);
export const UserSignIn = async (data) => API.post("/signin", data);

export const getDashboardDetails = async (token) =>
  API.get("/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token, date) =>
  await API.get(`/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });