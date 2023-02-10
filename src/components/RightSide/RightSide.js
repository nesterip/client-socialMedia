import React, {useState} from 'react';
import './RightSide.css';
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import {UilSetting} from '@iconscout/react-unicons';
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModal/ShareModal';
import { Link } from 'react-router-dom';

const RightSide = () => {

    //Iniciador de la ventana modal
    const [modalOpened, setModelOpened] = useState(false);

    return (
        <div className="rightSide">
            <div className="navIcons">
                <Link to ={'../home'}>
                    <img src={Home} alt="inicio" />
                </Link>
                <UilSetting/>
                <img src={Noti} alt="Noticias" />
                <Link to = {'../chat'}>
                    <img src={Comment} alt="Comentarios" />
                </Link>
            </div>

            <TrendCard/>

            <button className="button t-s-btn" onClick={()=> setModelOpened(true)}>Compartir</button>
            <ShareModal modalOpened={modalOpened} setModelOpened={setModelOpened}/>
        </div>
    )
}

export default RightSide