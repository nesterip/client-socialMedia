import axios from "axios";

const PORT = "https://server-socialmedia-production-a709.up.railway.app/";
//conectando con la api mediante axios
const API = axios.create({baseURL: PORT});

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post(`/message/`, data);