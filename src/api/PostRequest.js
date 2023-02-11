import axios from "axios";

const PORT = "https://server-socialmedia-production-a709.up.railway.app/";
//conectando con la api mediante axios
const API = axios.create({baseURL: PORT});

export const getTimeLinePosts = (id) => API.get(`/post/${id}/timeline`);

export const likePost = (id, userId) => API.put(`/post/${id}/like`, {userId: userId});

//para pasar data por aca con delete hay que envolver en la propiedad data
export const removePost = (id, userId) => API.delete(`/post/${id}`, {data : {userId}});