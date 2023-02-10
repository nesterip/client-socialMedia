import React, {useState, useRef} from 'react';
import './PostShare.css';
import {UilLocationPoint, 
        UilSchedule, 
        UilPlayCircle, 
        UilScenery, 
        UilTimes} from '@iconscout/react-unicons';
import { useSelector, useDispatch } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction.js';



const PostShare = () => {

    //Observador del estado de la carga de un post
    const loading = useSelector((state) => state.postReducer.uploading);
    
    //Imagen del post a subir
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();

    //Ruta Imagenes locales
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    //El useRef lo usamos para activar un evento desde otro lugar
    const imgRef = useRef();
    const desc = useRef();

    //Data currentUser
    const {user} = useSelector((state)=>state.authReducer.authData);

    //Capturando la imagen del post a subir
    const onImageChange = (e)=>{
        //aca estamos obteniendo la imagen desde el evento
        //y lo estamos seteando en el State image
        //luego donde vayamos a usarla hay que aplicar URL.createObjectURL(imagen)
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0];
            setImage(img);
        }
    }

    //reset para limpiar los input
    const resetShare = () => {
        setImage(null);
        desc.current.value = "";
    }

    //Subir el Post
    const handleSubmit = (e) => {
        //para no ir a otra pagina
        e.preventDefault();

        //postModel es el formato para un post
        const newPost = {
            userId: user._id,
            username:user.username,
            desc: desc.current.value,
            image: ""
        }

        //preparacion de una imagen para ser subia a un servidor
        //necesita: name(nombre) y file(imagen como tal)
        if(image){
            //dandole el formato
            const data = new FormData();
            //Date.now es la fecha exacta en que se ejecuta esta linea
            //aqui combinamos esa fecha mas el nombre de la imagen para 
            //asegurarnos de que no hayan dos nombres iguales
            const filename = Date.now() + image.name;
            data.append("name", filename);
            data.append("file", image);
            newPost.image = filename;

            //Subiendo la img del post
            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error);
            }
        }
        //Subiendo el post
        dispatch(uploadPost(newPost));
        
        //Reset de los inputs
        resetShare();
    }

    return (
    <div className="postShare">
        <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.jpg"} alt="imagen perfil" />
        <div>
            <input ref={desc} required type="text" placeholder='¿Que estas pensando?' className='postInput'/>
            <div className="postOption">  {/* este evento click desencadenara el evento en el input, mediante el ref  */}
                <div className="option" style={{color:'var(--photo)'}} onClick={()=> imgRef.current.click()}>
                    <UilScenery/>Imagen
                </div>
                <div className="option" style={{color:'var(--video)'}}>
                    <UilPlayCircle/>Video
                </div>
                <div className="option" style={{color:'var(--location)'}}>
                    <UilLocationPoint/>Ubicacion
                </div>
                <div className="option" style={{color:'var(--shedule)'}}>
                    <UilSchedule/>Calendario
                </div>
                <button className='button' onClick={handleSubmit} disabled={loading}>{loading ? "Cargando..." : "Compartir"}</button>
                <div style={{display: 'none '}}>    {/* el ref lo usamos para poder efecutar el evento onchange desde otra parte*/}
                    <input type="file" name='myImage' ref={imgRef} onChange={onImageChange}/>
                </div>
            </div>
            {image && (
                <div className="previewImage">
                    <UilTimes onClick={()=> setImage(null)}/>
                    <img src={URL.createObjectURL(image)} alt="imagen a cargar" />
                </div>
            )}
        </div>
    </div>
    ); 
};

export default PostShare