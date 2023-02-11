import axios from "axios";

//conectando con la api mediante axios
const API = axios.create({baseURL: process.env.PORT});

//post al server
export const uploadImg = (data) => API.post('/upload', data);

export const uploadPost = (data) => API.post('/post', data);