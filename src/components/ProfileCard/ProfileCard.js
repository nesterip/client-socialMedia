import React, { useState, useEffect } from 'react'
import './ProfileCard.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js';

//Informacion del user en el HOME
const ProfileCard = ({what = false}) => {

    const params = useParams();

    //id del usuario al cual veremos su perfil
    const profileUserId = params.id;

    const [profileUser, setProfileUser] = useState({});

    //data del currentUser
    const data = useSelector((state) => state.authReducer.authData.user);

       //Consultando la data del user a renderizar
    useEffect(() => {
        const fetchProfileUser = async() => {

            //si es el perfil del current user, no hay necesidad de consultar con el servidor la data
            if(profileUserId === data._id){
                setProfileUser(data);
            }
            else{
                //obteniendo la data del perfil
                const profileUser = await UserApi.getUser(profileUserId);
                setProfileUser(profileUser);
            }
        }
        fetchProfileUser();
    }, [data, profileUserId]);
    
    //datos de los posts del user, para contabilizarlos
    const {posts} = useSelector((state) => state.postReducer);

    //ruta de las imagenes por defecto
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    //solo los posts del current user
    const myPosts = posts.filter((post) => post.userId === profileUserId);

    //para saber si este modulo se esta renderizando desde el perfil del currentUser
    const myProfile = what;

    return (
        <div className="profileCard">
            <div className="profileImg">
                <img src={profileUser.coverPicture ? serverPublic + profileUser.coverPicture : serverPublic + "defaultCover.jpg"} alt="imagen de cover"/>
                <img src={profileUser.profilePicture ? serverPublic + profileUser.profilePicture : serverPublic + "defaultProfile.jpg"} alt="imagen de perfil"/>
            </div>

            <div className="profileName">
                <span>{profileUser.firstname + " " + profileUser.lastname}</span>
                <span>{profileUser.workAt ? profileUser.workAt : "Escribe donde Trabajas"}</span>
            </div>
            <hr/>
            <div className="followers">
                <div className="follower">
                    <span>{profileUser.followers.length}</span>
                    <span>Followers</span>
                </div>
                <div className="hr"></div>
                <div className="follower">
                    <span>{profileUser.following.length}</span>
                    <span>Following</span>
                </div>
                {myProfile && (
                    <>
                        <div className="hr"></div>
                        <div className="follower">
                            <span>{myPosts.length}</span>
                            <span>Posts</span>
                        </div>
                    </>
                )}
            </div>
            <hr/>
            {myProfile ?'' :<span>
                                <Link style={{textDecoration: "none", color: "inherit"}} to={`/profile/${profileUser._id}`}>Mi Perfil</Link>
                            </span>
            }  
        </div>
    )
}

export default ProfileCard