import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import gameReducer from './gameReucer';

const reducer = combineReducers({
    auth:authReducer,
    game:gameReducer,
    error:errorReducer
});


export default reducer;
