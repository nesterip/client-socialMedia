import axios from "axios";

const PORT = "https://server-socialmedia-production-a709.up.railway.app/";
//conectando con la api mediante axios
const API = axios.create({baseURL: PORT});

//aca estamos conectando con la api a esa direccion y se esta pasando la data
export const loginIn = (formData) => API.post('/auth/login', formData);
export const singUp = (formData) => API.post('/auth/register', formData);