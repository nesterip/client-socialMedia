import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest.js';

const Conversation = ({data, currentUserId, online}) => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        //obteniendo el id del user con quien el currentUser esta chateando
        const userId = data.members.find((id) => id !== currentUserId);

        //aqui obtendremos la data de ese user desde mongoDB
        const getUserData = async() => {
            try {
                const {data} = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            } 
        }
        getUserData();
    }, [])
    

    return (
        <>
            <div className="follower-a conversation">
                <div>
                    {online && <div className="online-dot"></div>}
                    <img src={userData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.jpg"} 
                        alt="imagen de perfil del usuario" 
                        className='followerImg' 
                        style={{width: '50px', height: '50px'}}
                    />
                    <div className="nameConversation">
                        <span>{userData?.firstname + " " + userData?.lastname}</span>
                        <span>{online ? "Online" : "Desconectado"}</span>
                    </div>
                </div>
            </div>
            <hr style={{width: '85%', border: '0.1px solid #ececec'}}/>
        </>
    );
};

export default Conversation