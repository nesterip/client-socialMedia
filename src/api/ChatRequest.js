import axios from "axios";

const PORT = "https://server-socialmedia-production-a709.up.railway.app/";
//conectando con la api mediante axios
const API = axios.create({baseURL: PORT});

export const newChat = (data) => API.post(`/chat/`, data);
export const userChats = (id) => API.get(`/chat/${id}`);
export const deleteChat = (chatId) => API.delete(`/chat/${chatId}`);
