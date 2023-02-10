const postReducer = (state = { posts: [], loading: false, uploading: false, error: false, removing: false}, action) => {

    switch (action.type) {

        //---------------UPLOAD POST-------------//
        case "UPLOAD_START":
            return { ...state, error: false, uploading: true };
        case "UPLOAD_SUCCESS":
            return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false };
        case "UPLOAD_FAIL":
            return { ...state, uploading: false, error: true };

        //----------------ODTENIENDO POSTS--------------//
        case "RETRIEVING_START":
            return { ...state, loading: true, error: false };
        case "RETRIEVING_SUCCESS":
            return { ...state, posts: action.data, loading: false, error: false };
        case "RETRIEVING_FAIL":
            return { ...state, loading: false, error: true };
        
        //----------------REMOVIENDO POST----------------//
        case "REMOVE_POST_START":
            return{...state, removing: true, error: false};
        case "REMOVE_POST_SUCCESS":
            return{...state, posts: [...state.posts.filter((post) => post._id !== action.data)]};
        case "REMOVE_POST_FAIL":
            return{...state, removing: false, error:true};

        default:
        return state;
    }
};

export default postReducer;
