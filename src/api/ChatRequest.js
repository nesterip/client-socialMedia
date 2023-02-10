import axios from "axios";

//conectando con la api mediante axios
const API = axios.create({baseURL: process.env.PORT || "http://localhost:5000"});

export const newChat = (data) => API.post(`/chat/`, data);
export const userChats = (id) => API.get(`/chat/${id}`);
export const deleteChat = (chatId) => API.delete(`/chat/${chatId}`);
