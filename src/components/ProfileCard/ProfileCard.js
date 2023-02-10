import React from 'react'
import './ProfileCard.css';
import Cover from '../../img/cover.jpg';
import ProfileImg from '../../img/profileImg.jpg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//Informacion del user en el HOME
const ProfileCard = ({what = false}) => {

    //data del user
    const data = useSelector((state) => state.authReducer.authData.user);
    
    //datos de los posts del user, para contabilizarlos
    const {posts} = useSelector((state) => state.postReducer);

    //ruta de las imagenes por defecto
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    //solo los posts del current user
    const myPosts = posts.filter((post) => post.userId === data._id);

    //para saber si este modulo se esta renderizando desde el perfil del currentUser
    const myProfile = what;

    return (
        <div className="profileCard">
            <div className="profileImg">
                <img src={data.coverPicture ? serverPublic + data.coverPicture : serverPublic + "defaultCover.jpg"} alt="imagen de cover"/>
                <img src={data.profilePicture ? serverPublic + data.profilePicture : serverPublic + "defaultProfile.jpg"} alt="imagen de perfil"/>
            </div>

            <div className="profileName">
                <span>{data.firstname + " " + data.lastname}</span>
                <span>{data.workAt ? data.workAt : "Escribe donde Trabajas"}</span>
            </div>
            <hr/>
            <div className="followers">
                <div className="follower">
                    <span>{data.followers.length}</span>
                    <span>Followers</span>
                </div>
                <div className="hr"></div>
                <div className="follower">
                    <span>{data.following.length}</span>
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
                                <Link style={{textDecoration: "none", color: "inherit"}} to={`/profile/${data._id}`}>Mi Perfil</Link>
                            </span>
            }  
        </div>
    )
}

export default ProfileCard