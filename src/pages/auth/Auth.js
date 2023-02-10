import React, {useState} from 'react';
import './Auth.css';
import Logo from '../../img/logo.png';
import {useDispatch, useSelector} from 'react-redux';
import { loginIn, singUp } from '../../actions/AuthAction.js';

const Auth = () => {

    //Conectando con redux Store
    const dispatch = useDispatch();

    //Este loading devolvera true mientras este cargando la solicitud o consulta
    const loading = useSelector((state)=>state.authReducer.loading);

    //Controlador de Registro o Inicio de sesion
    const [isSingUp, setIsSingUp] = useState(true);

    //Comprobacion de las contraseñas
    const [confirmPass, setConfirmPass] = useState(false);
    
    //Control de valores del formulario
    const [data, setData] = useState({firstname: "", lastname: "", username: "", password: "", confirmPassword: ""});

    //Controlador de cambios en el formulario
    //nota: el e.target.name entre corchetes porque asi obtenemos 
    //el valor textual de la propieda, y no el valor que contiene como tal
    const handleChange = (e) => {
        setData({...data, [e.target.name] : e.target.value});
    }

    //Funcion que se ejecuta al dar al boton submit
    const handleSubmit = (e) => {
        //No salir a otra ventana
        e.preventDefault();

        //si es registro
        if(isSingUp){
            if((!data.password) || (data.password !== data.confirmPassword)){
                setConfirmPass(true);
            }
            else{
                //enviara la data redux store 
                dispatch(singUp(data));
                resetForm();
            }
        }//si es inicio de sesion
        else{
            //enviara la data redux store 
            dispatch(loginIn(data));
            resetForm();
        }
    } 
    
    //reset de los inputs
    const resetForm = () => {
        setData({firstname: "", lastname: "", username: "", password: "", confirmPassword: ""});
        setConfirmPass(false);
    }

    return (
        <div className="auth">
            {/* Left Side(logo) */}
            <div className="a-left">
                <img src={Logo} alt="logo" />
                <div className="webName">
                    <h1>SOCIAL Friends</h1>
                    <h6>Explora y conoces Personas en todo el mundo</h6>
                </div>
            </div>

            {/* Right side (SingUp) */}
            <div className="a-right">
                <form onSubmit={handleSubmit} className="infoForm authForm">
                    
                    <h3>{isSingUp ? "Resgistrarse" : "Iniciar Sesion"}</h3>
                    {isSingUp && (
                        <div className='row-2'>
                            <input type="text" 
                                placeholder='Nombre' 
                                className='authInput' 
                                name='firstname'
                                onChange={handleChange}
                                value={data.firstname}
                            />
                            <input type="text" 
                            placeholder='Apellido' 
                            className='authInput' 
                            name='lastname'
                            onChange={handleChange}
                            value={data.lastname}
                            />
                        </div>
                    )}
                    <div className="row-2">
                        <input type="text" 
                                placeholder='Nombre de Usuario' 
                                className='authInput' 
                                name='username'
                                onChange={handleChange}
                                value={data.username}
                            />
                    </div>
                    <div className="row-2">
                        <input type="password" 
                            placeholder='Contraseña' 
                            className='authInput' 
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                        />
                        {isSingUp && (
                            <input type="password" 
                                placeholder='Confirmar contraseña' 
                                className='authInput' 
                                name='confirmPassword'
                                onChange={handleChange}
                                value={data.confirmPassword}
                            />
                        )}
                    </div>
                    {confirmPass && <span className='confirmPass'>*Las contraseñas no coinciden</span>}
                    <div className="row-2">
                        <span style={{cursor:"pointer"}} onClick={() => setIsSingUp((prev)=>!prev)}>{isSingUp ? "¿tienes cuenta?/inicia sesion aqui" : "¿No tienes cuenta?/Registrate aqui"}</span>
                    </div>
                    <button type='submit' className="button btnSubmit" disabled={loading}>{loading? "Cargando..." : isSingUp ? "Registrarse" : "Iniciar Sesion"}</button>
                </form>
            </div>
        </div>
    )
}

export default Auth