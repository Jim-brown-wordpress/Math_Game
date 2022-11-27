import * as React from 'react';
import {connect} from 'react-redux';
import {Route , useNavigate} from 'react-router-dom';


const PrivateRoute = ({component:Component,path ,auth}) => {
    // const navigate = useNavigate();
    // if(auth.isAuthenticated)
        return <Route path={path} element = {Component}/>;
    // navigate('/login');
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps)(PrivateRoute);
