import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { newChat } from '../../api/ChatRequest.js';
import { getUser } from '../../api/UserRequest.js';

const ToChat = ({user, addNewChat, setCurrentChat}) => {

    //Data currentUser
    const userCurrent = useSelector((state) => state.authReducer.authData.user);

    //Ruta img locales por default
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const [userData, setUserData] = useState({});

    //Obteniendo los datos del user
    useEffect(() => {
        const getDataUser = async() => {
            try {
                const {data} = await getUser(user);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
            
        }
        getDataUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleWrite = async() => {
        //data para crear el nuevo chat
        const dataChat = {
            senderId: userCurrent._id,
            receiverId: userData._id
        }
        //enviando la solicitud para el nuevo chat
        try {
            const {data} = await newChat(dataChat);

            //agregando el nuevo chat a la lista de chats
            addNewChat(data);

            //abriendo el nuevo chat creado
            setCurrentChat(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="followerr">
                <div className='follower-top'>
                    <img src={userData.profilePicture ? serverPublic + userData.profilePicture : serverPublic + "defaultProfile.jpg"} alt="imagen perfil seguidor" className='followerImg'/>
                    <div className="toChatName">
                        <span>{userData.firstname + " " + userData.lastname}</span>
                    </div>
                </div>
                <button className="follow_btn" onClick={handleWrite}>Chatear</button>
            </div>
            <hr style={{width: '85%', border: '0.1px solid #ececec'}}/>
        </>
    )
}

export default ToChat