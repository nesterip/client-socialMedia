import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import {UilPen} from '@iconscout/react-unicons';
import ProfileModal from '../profileModel/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js';
import * as AuthApi from '../../actions/AuthAction.js';

const InfoCard = () => {

    //Control de la ventana modal para editar la informacion del currentUSer
    const [modalOpened, setModelOpened] = useState(false);

    const dispatch = useDispatch();

    const params = useParams();

    //id del usuario al cual veremos su perfil
    const profileUserId = params.id;

    //Datos del perfil del usuario
    const [profileUser, setProfileUser] = useState({});

    //Data currentUser
    const {user} = useSelector((state) => state.authReducer.authData);

    //Consultando la data del user a renderizar
    useEffect(() => {
        const fetchProfileUser = async() => {

            //si es el perfil del current user, no hay necesidad de consultar con el servidor la data
            if(profileUserId === user._id){
                setProfileUser(user);
            }
            else{
                //obteniendo la data del perfil
                const profileUser = await UserApi.getUser(profileUserId);
                setProfileUser(profileUser);
            }
        }
        fetchProfileUser();
    }, [user]);

    //Cerando sesion
    const handleLogOut = () => {
        dispatch(AuthApi.logOut());
    }
    
    
    return (
        <div className="infoCard">
            <div className="infoHead">
                <h4>Tu Informacion</h4>
                {profileUserId === user._id ? <UilPen width='2rem' height='1.5rem' onClick={()=> setModelOpened(true)}/> : ""}
                <ProfileModal modalOpened={modalOpened} setModelOpened={setModelOpened} data={user}/>
            </div>
            <div className="info">
                <span><b>Estatus</b></span>
                <span>{profileUser.relationship}</span>
            </div>
            <div className="info">
                <span><b>Vive en</b></span>
                <span>{profileUser.livesIn}</span>
            </div>
            <div className="info">
                <span><b>Trabaja en</b></span>
                <span>{profileUser.workAt}</span>
            </div>
            {profileUserId === user._id ? <button className="button i-out-btn" onClick={handleLogOut}>Cerrar Sesión</button> : ""}
        </div>
    )
}

export default InfoCard