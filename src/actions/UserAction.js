import * as UserApi from '../api/UserRequest.js';

export const updateUser = (id, userData) => async(dispatch) => {
    dispatch({type: "UPDATING_START"});
    try {
        const {data} = await UserApi.updateUser(id, userData);
        dispatch({type: "UPDATING_SUCCESS", data: data});
    } catch (error) {
        console.log(error);
        dispatch({type: "UPDATING_FAIL"});
    }
}

export const followUser = (id, userData) => async(dispatch) => {
    dispatch({type: "FOLLOW_USER", data: id});
    UserApi.followUser(id, userData);
}

export const unFollowUser = (id, userData) => async(dispatch) => {
    dispatch({type: "UN_FOLLOW_USER", data:id});
    UserApi.unFollowUser(id, userData);
}