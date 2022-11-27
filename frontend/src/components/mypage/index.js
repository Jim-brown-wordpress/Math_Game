import React from 'react';
import {Container , Grid ,Card  , CardActionArea , CardActions , Button , CardContent , CardMedia , Typography , Avatar ,Box ,TextField,FormControlLabel,Checkbox,Link } from '@mui/material';
import {SportsEsports , Roofing, ReplyAll , LockOutlined , Spa } from '@mui/icons-material';
import {connect} from 'react-redux';
import {LogoutUser} from '../../store/actions/authAction';

import socket from '../../api';
import {useNavigate} from 'react-router-dom';

const MyPage = props => {
    const navigate = useNavigate();
    const setLevel = (level) => {
        navigate(`/ready/${level}`);
    }
    React.useEffect(() => {
        if(!props.auth.isAuthenticated)
            navigate('/login');
    } , []);
    return (
        <div className='mypage-bg'>
            <Button variant='contained' color='error' sx={{  borderRadius:10 , marginTop:5 , marginLeft:2 }}  onClick = {() => {props.LogoutUser(navigate)}}  >
                <ReplyAll sx={{ width:50 , height : 50}} /><span /><Typography variant='body1'> LogOut </Typography>
            </Button>
            <Box
                sx={{
                    marginTop:8,
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    color:'white',
                    }}
                >
                <Avatar src={`img/avatar.png`} variant='square' sx={{ color:'#6d1b7b'  , border:20, borderRadius:10 , width:250 , height:250 , }} ></Avatar>
                <Typography component='h1' variant='h3' sx={{ marginTop:3  , color:'#e91e63'}} >
                    {props.auth.user.fullName} Profile
                </Typography>
                <Box component='div'  noValidate sx = {{ mt:1 , width:'60%' }}   >
                    <Typography
                        margin = "normal" color='black' sx={{ input:{color:'white'} , mt:5 }} variant = 'h5'
                        >
                            fullName: {props.auth.user.fullName}
                    </Typography>
                    <Typography
                        margin = "normal" color='black' sx={{ input:{color:'white'} , mt:2 }} variant = 'h5'
                        >
                            country: {props.auth.user.country}
                    </Typography>
                    <Typography
                        margin = "normal" color='black' sx={{ input:{color:'white'} , mt:2 }} variant = 'h5'
                        >
                            email: {props.auth.user.email}
                    </Typography>
                    {/* <Typography
                        margin = "normal" color='black' sx={{ input:{color:'white'} , mt:2 }} variant = 'h5'
                        >
                            percent-accuracy: 67%
                    </Typography> */}
                    <Box sx = {{ display:'flex' , justifyContent:'space-between' , mt:3 }} >
                        <Button variant='contained' fullWidth onClick={() => setLevel(1)}>Level 1</Button>
                        <Button variant='contained' fullWidth sx = {{ marginLeft:2 }}  onClick={() => setLevel(2)}>Level 2</Button>
                        <Button variant='contained' fullWidth sx = {{ marginLeft:2 }} onClick={() => setLevel(3)}>Level 3</Button>
                        <Button variant='contained' fullWidth sx = {{ marginLeft:2 }} onClick={() => setLevel(4)}>Level 4</Button>
                        <Button variant='contained' fullWidth sx = {{ marginLeft:2 }} onClick={() => setLevel(5)}>Level 5</Button>
                    </Box>
                    {props.auth.user.role == "admin"?
                        <Button variant='contained' color='secondary' sx={{  borderRadius:10 , mt:5  }} fullWidth href='ready'  >
                            <Typography variant='body1' >Game Admin<SportsEsports sx={{ width:50 , height : 50}} /> </Typography>
                        </Button>:""
                    }
                    <Button variant='contained' color='secondary' sx={{  borderRadius:10 , mt:5  }} fullWidth href='ready' disabled >
                        <Typography variant='body1' >Join Game <SportsEsports sx={{ width:50 , height : 50}} /> </Typography>
                    </Button>

                </Box>
            </Box>
        </div>
    )
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps , {LogoutUser})(MyPage);
