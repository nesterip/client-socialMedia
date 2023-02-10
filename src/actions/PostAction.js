
import * as PostApi from '../api/PostRequest.js';

export const getTimeLinePosts = (id) => async(dispatch) => {
    dispatch({type: "RETRIEVING_START"});
    try {                   //recalcar que este getTimeLinePosts es el de PostApi
                            //no es lo mismo que este donde esta
        const {data} = await PostApi.getTimeLinePosts(id);
        dispatch({type: "RETRIEVING_SUCCESS", data: data});
    } catch (error) {
        dispatch({type: "RETRIEVING_FAIL"});
        console.log(error);
    }
}

export const removePost = (id, userId) => async(dispatch) => {
    dispatch({type: "REMOVE_POST_START"});
    try {
        await PostApi.removePost(id, userId);
        dispatch({type:"REMOVE_POST_SUCCESS", data:id});
    } catch (error) {
        dispatch({type: "REMOVE_POST_FAIL"});
        console.log(error);
    }
}