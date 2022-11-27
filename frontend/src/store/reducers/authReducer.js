import { SETAUTH } from "../actions/type";

const initialState = {
    isAuthenticated:false,
    user : {}
}

export default function(state = initialState , action){
    switch(action.type){
        case SETAUTH:
            return {
                ...state,
                isAuthenticated:action.payload !== undefined && action.payload !==null && Object.keys(action.payload).length>0,
                user:action.payload
            }
        default:
            return state;
    }
}
