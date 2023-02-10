import { useState } from 'react';
import { Modal,useMantineTheme} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/UploadAction.js';
import { updateUser } from '../../actions/UserAction.js';

function ProfileModal({modalOpened, setModelOpened, data}) {
    //tema o apariencia del model
    const theme = useMantineTheme();

    //destructuramos para sacar el password aparte
    const {password, ...other} = data;

    //data del user
    const [user, setUser] = useState(other);

    const [profileImg, setProfileImg] = useState(null);
    const [coverImg, setCoverImg] = useState(null);

    const dispatch = useDispatch();
    const param = useParams();
    
    const { userr } = useSelector((state) => state.authReducer.authData);

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };
    
    //encargado de recibir las imagenes que el user suba para el perfil o cover
    const onImageChange = (e) => {
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0];
            e.target.name === "profileImg" ? setProfileImg(img) : setCoverImg(img);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let userData = user;
        
        //subiendo imagen de perfil
        if(profileImg){
            const data = new FormData;
            const filename = Date.now() + profileImg.name;
            data.append("name", filename);
            data.append("file", profileImg);
            userData.profilePicture = filename;
            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error);
            }
        }

        //subiendo imagen de cover
        if(coverImg){
            const data = new FormData;
            const filename = Date.now() + coverImg.name;
            data.append("name", filename);
            data.append("file", coverImg);
            userData.coverPicture = filename;
            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error);
            }
        }

        //actualizando datos del user
        dispatch(updateUser(param.id, userData));
        //cerrando el modal
        setModelOpened(false);
    }

    return (
    <>
        <Modal opened={modalOpened}
                onClose={() => setModelOpened(false)}
                overlayColor={theme.colorScheme ==='dark' ? theme.color[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3}
                size="40%">

            <form className='infoForm'>
                <h3>Tu Informacion</h3>
                <div>
                    <input type="text" 
                        placeholder='Nombre' 
                        className='authInput' 
                        name='firstname'
                        onChange={handleChange}
                        value={user.firstname}
                    />
                    <input type="text" 
                        placeholder='Apellido' 
                        className='authInput' 
                        name='lastname'
                        onChange={handleChange}
                        value={user.lastname}
                    />
                </div>
                <div>
                <input type="text" 
                        placeholder='Trabajas en?' 
                        className='authInput' 
                        name='workAt'
                        onChange={handleChange}
                        value={user.workAt}
                    />
                </div>
                <div>
                    <input type="text" 
                        placeholder='Vives en' 
                        className='authInput' 
                        name='livesIn'
                        onChange={handleChange}
                        value={user.livesIn}
                    />
                    <input type="text" 
                        placeholder='Username' 
                        className='authInput' 
                        name='username'
                        onChange={handleChange}
                        value={user.username}
                    />
                </div>
                <div>
                    <input type="text" 
                            placeholder='Estatus sentimental' 
                            className='authInput' 
                            name='relationship'
                            onChange={handleChange}
                            value={user.relationship}
                        />
                </div>

                <div>
                    Imagen de Perfil
                    <input type="file" name='profileImg' onChange={onImageChange}/>
                    Imagen de Portada
                    <input type="file" name='coverImg' onChange={onImageChange}/>
                </div>

                <button className='button' style={{margin: '1rem'}} onClick={handleSubmit}>Actualizar</button>
            </form>
        </Modal>
    </>
    );
}

export default ProfileModal;