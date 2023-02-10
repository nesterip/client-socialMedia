import React, { useEffect } from 'react';
import './Post.css';
import PostChild from '../Postchild/PostChild';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeLinePosts } from '../../actions/PostAction.js';
import { useParams } from "react-router-dom";


const Post = () => {

    const dispatch = useDispatch();

    //Capturador de parametros
    const params = useParams();
    //Data currentUser
    const {user} = useSelector((state) => state.authReducer.authData);

    
    //Obteniendo todos los post
    let {posts, loading} = useSelector((state) => state.postReducer);
    
    //Solicitando todos los posts a renderizar
    useEffect(() => {
        dispatch(getTimeLinePosts(user._id));
    }, []);

    //si no hay post renderiza esto
    if(posts.length === 0) return "No hay posts :(";

    //Cuando se tenga por parametro un id quiere decir que solo mostrara los posts que
    //Coincidan con ese id
    if(params.id) posts = posts.filter((post) => post.userId === params.id);

    return (
    <div className="post">
        {loading ? "Cargando los posts..." : posts.map((data, id) =>{
            return (
                <PostChild key={id} id={id} data={data}/>
            )
        })}
        
    </div>
    )
}

export default Post