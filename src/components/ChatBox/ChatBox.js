import React, { useEffect, useState } from 'react'
import { addMessage, getMessages } from '../../api/MessageRequest.js';
import { getUser} from '../../api/UserRequest.js';
//import {format} from 'timeago.js';
import TimeAgo from 'timeago-react';
import InputEmoji from 'react-input-emoji';
import { BsFillTrashFill } from 'react-icons/bs';
import { useRef } from 'react';

const ChatBox = ({chat, currentUserId, setSendMessage, recieveMessage, removeChat}) => {

    //Data del not CurrentUser
    const [userData, setUserData] = useState(null);

    //Todos los mensajes del chat
    const [messages, setMessages] = useState([]);

    //Nuevo mensaje que se agregara a todos los mensajes
    const [newMessage, setNewMessage] = useState("");

    //usaremos esta constante para hacer que el chat siempre
    //este al final del scroll
    const scroll = useRef();

    //detectando los message recibidos del server socket
    useEffect(() => {
        //si hay algun mesage del server socket y ademas si pertenese a
        //este chat, entonces lo añadimos a los messages
        if(recieveMessage !== null && recieveMessage.chatId === chat._id){
            setMessages([...messages, recieveMessage]);
        }
    },[recieveMessage]);

    //obteniendo la data del not currentUser
    useEffect(()=>{
        //not currentUser
        const userId = chat?.members?.find((id) => id !== currentUserId);
        const getUserData = async() => {
            try {
                const {data} = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            } 
        }
        if(chat !== null) getUserData();
    },[chat]);

    //Obteniendo los message entre esos dos users
    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const {data} = await getMessages(chat._id);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        }
        if(chat!==null) fetchMessage();
    }, [chat]);
    
    //Controlador de cambios del input
    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    }

    //Controlador de envio de mensajes
    const handleSend = async(e) => {
        e.preventDefault();

        //objeto con los datos y estructura necesaria para subir a la BBDD
        const message = {
            senderId: currentUserId,
            text: newMessage,
            chatId: chat._id
        }

        //enviando el message a la BBDD
        try {
            const {data} = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }

        //enviando el menssage al socket server para
        //que aparesca en tiempo real al user con quien
        //chatea el current User
        const receiverId = chat?.members?.find((id) => id !== currentUserId);
        setSendMessage((msj)=> ({...msj, receiverId}));
    }

    //scroll siempre al final del chat automaticamente
    useEffect(() => {
        scroll.current?.scrollIntoView({behavior: "smooth"});
    },[messages]);

    return (
        <>
            <div className="ChatBox-container">
            {chat? (
                <>
                {/* Chat header */}
                <div className="chat-header">
                    <div className="follower-a">
                        <div>
                            <img src={userData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.jpg"} 
                                alt="imagen de perfil del usuario" 
                                className='followerImg' 
                                style={{width: '55px', height: '55px'}}
                            />
                            <div className="nameConversation">
                                <span>{userData?.firstname + " " + userData?.lastname}</span>
                            </div>
                            <BsFillTrashFill className="trashChat" onClick={() => removeChat(chat._id)}/>
                        </div>
                    </div>
                    <hr style={{width: '95%', border: '0.1px solid #ececec'}}/>
                </div>

                {/* Chat body */}
                <div className="chat-body">
                    {messages.map((message) => (
                        <div key={message.createdAt}
                            ref={scroll}
                            className={message.senderId === currentUserId ? "messagee own" : "messagee"}
                        >
                            <span>{message.text}</span>
                            <span><TimeAgo datetime={message.createdAt} locale='en_US'/></span>
                            {/* <span>{format(message.createdAt)}</span> */}
                        </div>
                    ))}
                </div>

                {/* chat sender */}
                <div className="chat-sender">
                    <div>+</div>
                    <InputEmoji value={newMessage} onChange={handleChange}/>
                    <button className='button' onClick={handleSend}>Enviar</button>
                </div>
                </>) : (<span className='chatbox-empty-message'>Selecciona un chat</span>)}
            </div>
        </>
    )
}

export default ChatBox