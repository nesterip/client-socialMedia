import axios from "axios";

//conectando con la api mediante axios
const API = axios.create({baseURL: process.env.PORT || "http://localhost:5000"});

//post al server
export const uploadImg = (data) => API.post('/upload', data);

export const uploadPost = (data) => API.post('/post', data);