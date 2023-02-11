import axios from "axios";

//conectando con la api mediante axios
const API = axios.create({baseURL: process.env.PORT});

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post(`/message/`, data);