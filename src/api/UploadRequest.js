import axios from "axios";

const PORT = "https://server-socialmedia-production-a709.up.railway.app/";
//conectando con la api mediante axios
const API = axios.create({baseURL: PORT});

//post al server
export const uploadImg = (data) => API.post('/upload', data);

export const uploadPost = (data) => API.post('/post', data);