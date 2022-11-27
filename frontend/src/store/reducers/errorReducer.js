import {ERROR} from '../actions/type';
const initialState = {
    isValid:true,
    error : ''
}

export default function(state = initialState , action){
    switch(action.type){
        case ERROR:
            return {
                ...state,
                error:action.payload
            }
        default:
            return state;
    }
}
