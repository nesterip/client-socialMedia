import * as UploadApi from '../api/UploadRequest.js';

//con el dispatch hacemos las consultas y solicitudes al reducer
export const uploadImage = (data) => async(dispatch) => {
    try {
        await UploadApi.uploadImg(data);
    } catch (error) {
        console.log(error);
    }
}

export const uploadPost = (post) => async(dispatch) => {
    dispatch({type: "UPLOAD_START"});

    try {
        const newPost = await UploadApi.uploadPost(post);
        dispatch({type: "UPLOAD_SUCCESS", data: newPost.data});
    } catch (error) {
        console.log(error);
        dispatch({type: "UPLOAD_FAIL"});
    }
}