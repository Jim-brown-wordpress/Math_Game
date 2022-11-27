import axios from 'axios';
import {ERROR, SETAUTH} from './type';


export const registerUser = (userData , enqueueSnackbar) => dispatch =>{
    axios.post("/register" ,userData)
        .then(res => {
            enqueueSnackbar("successfully registered" , {variant:'success' });
            window.location.href = '/login';
        })
        .catch(err =>{
            enqueueSnackbar(err.response.data.message.message , {variant:'error' });
            dispatch({type:ERROR , payload:err.response.data.message.message});
        });
}


export const loginUser = (userData , navigate , enqueueSnackbar ) => dispatch => {
    axios.post("/login" , userData)
        .then(res => {
            dispatch({type:SETAUTH , payload:res.data.user});
            window.localStorage.setItem('token' ,"JWT " + res.data.accessToken);
            enqueueSnackbar(`welcome ${res.data.user.fullName}` , {variant:'success'});
            navigate('/mypage');
        })
        .catch(err =>{
            enqueueSnackbar(err.response.data.message , {variant:'error' });
            dispatch({type:ERROR , payload:err.response.data.message})
        });
}

export const LogoutUser = (navigate) => dispatch => {
    window.localStorage.removeItem('token');
    dispatch({type:SETAUTH , payload:{}});
    navigate('/login');
}
