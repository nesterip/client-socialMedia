import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/UserAction.js';

const User = ({person}) => {
    //Ruta de las imagenes locales por defecto
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    //redux
    const dispatch = useDispatch();

    //Data currentUser
    const {user} = useSelector((state) => state.authReducer.authData);

    //verificando si dentro de la data de person esta el currentUser como followers
    //si es si, esto quiere decir que si seguimos a esta persona
    const [following, setFollowing] = useState(person.followers.includes(user._id));

    //controlador del follow
    const handleFollow = () => {
        following ? dispatch(unFollowUser(person._id, user)) : dispatch(followUser(person._id, user))
        setFollowing((prev) => !prev);
    }
    
    return (
        <div className="followerr">
            <div className='follower-top'>
                <img src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "defaultProfile.jpg"} alt="imagen perfil seguidor" className='followerImg'/>
                <div className="followerName">
                    <span>{person.firstname}</span>
                    <span>@{person.username}</span>
                </div>
            </div>
            <button className={following ? "unFollow_btn" : "follow_btn"} onClick={handleFollow}>{following ? "No Seguir" : "Seguir"}</button>
        </div>
    )
}

export default User