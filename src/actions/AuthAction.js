import * as AuthApi from '../api/AuthRequest.js';

//--------login-------\\
export const loginIn = (formData) => async(dispatch) => {

    //como es asincrono el metodo, mediante el dispatch que es su argumento
    //podemos hacer consultas y solicitudes 
    dispatch({type: "AUTH_START"});

    try {
        const {data} = await AuthApi.loginIn(formData);
        dispatch({type: "AUTH_SUCCESS", data: data});
    } catch (error) {
        console.log(error);
        dispatch({type: "AUTH_FAIL"}); 
    }
}

//-------SingUp--------\\

export const singUp = (formData) => async(dispatch) => {

    dispatch({type: "AUTH_START"});

    try {
        const {data} = await AuthApi.singUp(formData);
        dispatch({type: "AUTH_SUCCESS", data: data});
    } catch (error) {
        console.log(error);
        dispatch({type: "AUTH_FAIL"}); 
    }
}

//-------LogOut--------\\

export const logOut = () => async(dispatch) => {
    dispatch({type: "LOG_OUT"});
}