import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ToChat from '../toChat/ToChat';
import './UserToChat.css';

const UserToChat = ({addNewChat, setCurrentChat}) => {

    //Data CurrentUser
    const {user} = useSelector((state) => state.authReducer.authData);

    //Users con los que el currentUser puede iniciar un chat
    const [usersToChat, setUsersToChat] = useState(user.following);

    //Actualizaremos el state cada vez que haya alguna
    //modificacion en el user por si, se agrega otro amigo
    useEffect(() => {
        setUsersToChat(user.following);
    },[user]);
    
    return (
        <div className='userToChat-container'>
            {/* UserToChatHeader */}
            <div className="userToChat-header">
                <h2>Amigos</h2>
            </div>

            {/* UserToChat Body */}
            <div className="userToChat-body">
                {usersToChat.map((user) => <ToChat key={user._id} user={user} addNewChat={addNewChat} setCurrentChat={setCurrentChat}/>)}
            </div>
        </div>
    )
}

export default UserToChat