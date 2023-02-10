import React, { useEffect, useState } from 'react';
import './FollowersCard.css';
import { Followers } from '../../Data/FollowersData';
import User from '../User/User';
import {useSelector} from 'react-redux';
import { getAllUsers } from '../../api/UserRequest.js';

const FollowersCar = () => {
    //Almacenaremos todos los users de la BBDD
    const [persons, setPersons] = useState([]);

    //Data del currentUser
    const {user} = useSelector((state) => state.authReducer.authData);

    //haciendo solicitud de todos los usuarios en la BBDD
    //para mostrarlos como sugerencias de amistad
    useEffect(() => {
        const fetchPersons = async() => {
            const {data} = await getAllUsers();
            setPersons(data);
        }

        fetchPersons();
    }, [])

    return (
        <div className="followersCard">
            <h3>Personas que podrias conocer</h3>
            
            {persons.map((person, id) => {
                //para que no renderice el current user
                if(person._id !== user._id){
                    return(
                        <User person={person} key={id}/>
                    )
                }
            })}

            <span>Ver mas</span>
        </div>
    )
}

export default FollowersCar