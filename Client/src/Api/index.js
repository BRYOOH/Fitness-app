const axios = require("axios");

const API = axios.create({
baseURL:"http://localhost:4000/",
});

const UserSignin = async(data) => API.post("/signup",data);
const UserLogin = async(data) => API.post("/signin",data);

const getDashboard = async(token) => API.get("/dashboard",{
    headers:{Authorization:`Bearer ${token}`}
});

const getWorkoutByDate = async(token,date) => API.get(`/workout${date}`,{
    headers:{Authorization:`Bearer ${token}`}
});
const addWorkout = async(token,data) => API.post("/workout",data,{
    headers:{Authorization:`Bearer ${token}`}
});

module.exports({UserLogin,UserSignin,getDashboard,addWorkout,getWorkoutByDate});