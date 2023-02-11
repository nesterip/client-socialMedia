import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteChat, userChats } from '../../api/ChatRequest.js';
import Conversation from '../../components/Conversation/Conversation.js';
import UserToChat from '../../components/UsersToChat/UserToChat.js';
import LogoSearch from '../../components/LogoSearch/LogoSearch.js';
import {UilSetting} from '@iconscout/react-unicons';
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import ChatBox from '../../components/ChatBox/ChatBox.js';
import { io } from 'socket.io-client';
import './Chat.css';


const Chat = () => {

    //Data currentUser
    const {user} = useSelector((state) => state.authReducer.authData);

    //Todos los chats del current user
    const [chats, setChats] = useState([]);

    //Chat actual, que se abrira en detalle(chatBox);
    const [currentChat, setCurrentChat] = useState(null);

    //Usuarios activos online
    const [OnlineUsers, setOnlineUsers] = useState([]);

    //Message que enviaremos al server socket
    const [sendMessage, setSendMessage] = useState(null);

    //Message que recibiremos desde el server socket
    const [recieveMessage, setRecieveMessage] = useState(null);

    //pasando la referencia al socket
    const socket = useRef();

    //Agregando al currentUser a los active user el socket
    //y obteniendo todos los active user del socket
    useEffect(() => {
        const PORT_SOCKET = "https://socket-socialmedia-production.up.railway.app/"
        //conectamos mediante el endpoint del server socket
        socket.current= io(PORT_SOCKET);

        //enviando la accion a realizar y el userId
        //esto seria como axios y route
        //aqui estamos agregando al currentUser a la lista de usuarios activos
        socket.current.emit("new-user-add", user._id);

        //obteniendo la lista de usuarios activos
        //en la cual claramente estara el currentUser
        socket.current.on('get-users', (users => {
            setOnlineUsers(users);
            //console.log(OnlineUsers);
        }))
    },[user]);

    //Enviando message al server socket
    useEffect(() => {
        if(sendMessage !== null){
            socket.current.emit('send-message', sendMessage);
        }
    }, [sendMessage]);

    //recibiendo message del server socket
    //el activador del useEffect lo dejamos vacio para que
    //se active con cualquier cambio que detecte
    useEffect(() => {
        socket.current.on('recieve-message', (data) => {
            setRecieveMessage(data);
        });
    },[]);

    //Obteniendo los chats del currentUser
    useEffect(() => {
        const getChats = async() => {
            try {
                const {data} = await userChats(user._id);
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        }
        getChats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    //Obteniendo el status del not currentUser
    const checkOnlineStatus = (chat) => {
        //not currentUser
        const chatMember = chat.members.find((member) => member !== user._id);
        //verificando si esta o no en linea
        const online = OnlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    }

    //Añadiendo un nuevo chat, pero primero se valida que no este
    //en la lista de chats, para no agregarlo 2 veces
    const addNewChat = (data) => {
        
        if(!chats.some((chat) => chat._id === data._id)){
            setChats([...chats, data]);
        }
    }

    //Metodo encargado de eliminr un chat
    const removeChat = (chat) => {
        if(window.confirm("¿Esta seguro que desea eliminar el chat?")){
            try {
                //eliminando el chat de la BBDD
                deleteChat(chat);
                
                //limpiando el chat abierto
                setCurrentChat(null);

                //quitando el chat eliminado de la lista de chats
                setChats(chats.filter((el) => el._id !== chat));
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
    <div className="Chat">

    {/* Left side */}
        <div className="Left-side-chat">
            <LogoSearch/>
            <div className="Chat-container">
                <h2>Chats</h2>
                <div className="Chat-list">
                    {chats.map((chat) => (
                        <div key={chat._id} onClick={()=> setCurrentChat(chat)}>
                            <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    {/* Right side */}
        <div className="Right-side-chat">

            {/* chat body */}
            <ChatBox chat={currentChat} 
                currentUserId={user._id}
                setSendMessage={setSendMessage}
                recieveMessage={recieveMessage}
                removeChat={removeChat}
            />
        </div>

    {/* Following */}
        <div className="userToChat">
            <div className='rsc-nav'>
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
            </div>
            <UserToChat addNewChat={addNewChat} setCurrentChat={setCurrentChat}/>
        </div>
    </div>
    );
};

export default Chat