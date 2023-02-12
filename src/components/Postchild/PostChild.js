import React, { useState } from 'react';
import './PostChild.css';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Like from '../../img/like.png';
import notLike from '../../img/notlike.png';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';
import { useParams } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { removePost } from '../../actions/PostAction.js';

const PostChild = ({data}) => {

    const dispatch = useDispatch();

    //Capturador de parametros
    const params = useParams();

    //DAta currentUser
    const {user} = useSelector((state) => state.authReducer.authData);

    //Identifica si el currentUser dio like a este post
    const [liked, setLiked] = useState(data.likes.includes(user._id));
    //Contador de like del post
    const [likes, setLikes] = useState(data.likes.length);

    //Manipulador de likes
    const handleLiked = () => {
        //cambiando valor para modificar el icono de me gusta
        setLiked((prev) => !prev);

        //enviando la data al action que se encargadara del servidor
        likePost(data._id, user._id);

        /*aca estamos restando 1 o sumando dependiendo de si es like o delike
         *porque?, porque al momento de dar me gusta en el servidor se agregara el me gusta
         *pero a nivel visual o local no ya que tendriamos que recargar la pagina, entonces para no hacerlo
         *lo hacemos asi 
        */
        liked ? setLikes((prev) => prev-1) : setLikes((prev) => prev+1);

    }

    //Eliminando un post
    const handleRemovePost = () => {
        dispatch(removePost(data._id, user._id));
    }


    return (
    <div className="postChild">
        {params.id ? <BsFillTrashFill onClick={handleRemovePost}/> : ""}
        <img src={data.image ? `${process.env.REACT_APP_PUBLIC_FOLDER}${data.image}` : ""} alt="imagendel post"/>
        <div className="postReact">
            <img src={liked ? Like : notLike} alt="me gusta" onClick={handleLiked} />
            <img src={Comment} alt="comentar" />
            <img src={Share} alt="compartir" />
        </div>
        <span>{likes} likes</span>
        <div className="postDetail">
            <span><b>{`${data.username}`}</b></span>
            <span>{data.desc}</span>
        </div>
    </div>
    )
}

export default PostChild