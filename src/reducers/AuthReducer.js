const authReducer = (state = {authData: null, loading: false, error: false}, action) => {
    switch (action.type) {
        //----------------AUTH--------------//
        case "AUTH_START":
            return {...state, loading:true, error: false};
        case "AUTH_SUCCESS":
            //al estar todo bien tambien almacenamos en el local store
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return {...state, authData: action.data, loading:false, error:false};
        case "AUTH_FAIL":
            return {...state, loading: false, error: true};
        
            //----------------LOG OUT------------//
        case "LOG_OUT":
            localStorage.clear();
            return {...state, authData: null, loading: false, error: false};
        
        //----------------UPDATING----------------//
        case "UPDATING_START":
            return {...state, loading:true, error: false};
        case "UPDATING_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return {...state, authData: action.data, loading:false, error:false};
        case "UPDATING_FAIL":
            return {...state, loading: false, error: true};

        //-------------FOLLOW - UNFOLLOW----------//
        case "FOLLOW_USER":
            console.log("follow")
            return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following, action.data]}}};

        case "UN_FOLLOW_USER":
            console.log("unfollow")
            return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following.filter((personId) => personId !== action.data)]}}};
        default:
            return state;
    }
};

export default authReducer;