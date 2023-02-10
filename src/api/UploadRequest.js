import axios from "axios";

const PORT = process.env.PORT || "http://localhost:5000";
//conectando con la api mediante axios
const API = axios.create({baseURL: PORT});

//post al server
export const uploadImg = (data) => API.post('/upload', data);

export const uploadPost = (data) => API.post('/post', data);