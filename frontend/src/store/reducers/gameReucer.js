import {ENTEREDREADYROOM , READYTOSTART , OUTROOM , WRONG , RIGHT ,        MAXN} from '../actions/type';

const initialState = {
    users : [],
}


///user : {name , email , country , level , state:join or ready , wrong, right}

export default function(state = initialState , action){
    switch(action.type){
        case ENTEREDREADYROOM:
            if(state.users.length < MAXN){
                return {
                    ...state,
                    users : state.users.concat({...action.payload , state:'join' , wrong:0 , right:0})
                }
            }
        case READYTOSTART:
            return {
                ...state,
                users :  state.users.map(item => item.email === action.payload ? {...item , state:'ready'}:item)
            }
        case OUTROOM:
            return {
                ...state,
                users:state.users.filter(item => item.email !== action.payload)
            }
        case WRONG:
            return {
                ...state,
                users : state.users.map(item => item.email === action.payload ? {...item , wrong:item.wrong+1}:item)
            }
        case RIGHT:
            return {
                ...state,
                users :  state.users.map(item => item.email === action.payload ? {...item ,right:item.right+1}:item)
            }
        default:
            return state;
    }
}
