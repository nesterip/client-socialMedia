import axios from "axios";

const PORT = process.env.PORT || "http://localhost:5000";
//conectando con la api mediante axios
const API = axios.create({baseURL: PORT});

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post(`/message/`, data);