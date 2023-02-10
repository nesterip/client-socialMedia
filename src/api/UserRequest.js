import axios from "axios";

const PORT = process.env.PORT || "http://localhost:5000";
//conectando con la api mediante axios
const API = axios.create({baseURL: PORT});

//aqui estamos enviando la data del token al authMiddleWare del server
API.interceptors.request.use((req) => {
    //si hay una sesion en el local storage
    if(localStorage.getItem('profile')){
        //obteniendo el token
        //parseamos la informacion porque lo que se almacena en el local Storage es una cadena de texto
        //y pareandolo lo volvemos un objeto para poder acceder a la propiedad token
        req.headers.Authorization =`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const getUser = (userId) => API.get(`/user/${userId}`);

export const updateUser = (id, userData) =>  API.put(`/user/${id}`, userData);

export const getAllUsers = () => API.get(`/user`);

export const followUser = (id, userData) => API.put(`/user/${id}/follow`, userData);

export const unFollowUser = (id, userData) => API.put(`/user/${id}/unfollow`, userData);