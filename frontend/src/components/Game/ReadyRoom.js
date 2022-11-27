import * as React from 'react';
import {Typography , Avatar ,Box , Button , Card , CardContent , CardActions} from '@mui/material';
import socket from '../../api';
import {connect} from 'react-redux';
import {useNavigate , useParams} from 'react-router-dom';


const participates = 4;


socket.on('readyToStart' , data => {

});
socket.on('out' , data => {

});



const ReadyRoom = (props) => {
    const {level} = useParams();
    const [ready , setReady] = React.useState(false);
    const [clients , setClients] = React.useState([]);

    const navigate = useNavigate();
    React.useEffect(() => {
        if(!props.auth.isAuthenticated)
            navigate('/login');
        // console.log(clients)
        socket.emit('enteredReadyRoom' , {
            level,
            fullName:props.auth.user.fullName,
            email:props.auth.user.email,
            country:props.auth.user.country,
            ready:false
        })
    } , []);
    React.useEffect(() => {
        const temp = clients.filter(item => item.ready === false);
        if(temp.length ===0 && clients.length ===5)
            navigate(`/start/${level}`);
    } , [clients]);
    socket.on('enteredReadyRoom' , data => {
        if(data.entered){
            // console.log(data.clients);
            setClients([...data.clients]);
        }
    });
    socket.on('out' , data => {
        // console.log('out----' , data.clients);
        setClients([...data.clients]);
    });
    socket.on('readyToStart' , data => {
        console.log('readyToStart----' , data.clients);
        setClients([...data.clients]);
    });
    const set_Ready = () => {
        setReady(true);
        socket.emit('readyToStart' , {email:props.auth.user.email , level});
    }
    const set_Out = () => {
        setReady(false);

        socket.emit('out' , {email:props.auth.user.email , level});

        navigate('/mypage');
    }
    return (
        <div className='mypage-bg'>
            <Typography container = 'div' variant='h4' sx = {{ textAlign:'center' , pt:5 ,color:'#e91e63' }}>
                Please Click Start Button
            </Typography>
            <Box sx = {{ display:'flex', alignItems:'center' , justifyContent:'center' , mt:5 }}>
                <Avatar src={require('../../assets/img/vs.png')} variant='square' sx={{ color:'#6d1b7b' , border:10, borderRadius:5   , width:{lg:300 , md:200 , sm:200} , height:{lg:300 , md:200 , sm:200} , color:'pink' }} />
            </Box>
            <Box sx = {{ display:'flex' , justifyContent:'space-around' , width:'100%' , mt:20 }}   >
                <Card sx = {{ borderRadius:12 , border:12 , borderColor:ready?"green":"white"}}>
                    <CardContent>
                        <Avatar src={require('../../assets/img/avatar.png')} variant='square' sx={{ color:'#33eaff' , border:10 , borderRadius:5   , width:200 , height:200 , }} />
                        <Typography textAlign='center' mt={3} bgcolor = 'peru' color='white' >{props.auth.user.fullName}</Typography>
                        <Typography textAlign='center'  bgcolor = 'peru' color='white' >{props.auth.user.country}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' sx = {{ ml:3 }} color = 'error' onClick = {set_Out} >Out</Button>
                        <Button variant='contained' sx = {{ ml:3 }} color = 'secondary' onClick={set_Ready} disabled = {ready} >Start</Button>
                    </CardActions>
                </Card>
                {clients.filter(item => item.email!==props.auth.user.email).map((item , index) => (
                    <Card key={item.email} sx = {{ borderRadius:12, border:12 , borderColor:item.ready?"green":"white"}}>
                        <CardContent>
                            <Avatar src={require(`../../assets/img/avatar${index+1}.png`)} variant='square' sx={{ color:'#33eaff' , border:10 , borderRadius:5   , width:200 , height:200 , }} />
                            <Typography textAlign='center' mt={3} bgcolor = 'peru' color='white' >{item.name}{item.email}</Typography>
                            <Typography textAlign='center' bgcolor = 'peru' color='white' >{item.country}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' sx = {{ ml:3 }} color = 'error' disabled >Out</Button>
                            <Button variant='contained' sx = {{ ml:3 }} color = 'secondary'disabled  >Start</Button>
                        </CardActions>
                    </Card>
                ))}
                {[...Array(participates+1- Math.max(clients.length,1)).keys()].map(item => (
                    <Card key = {item} sx = {{ borderRadius:12, border:12 , borderColor:"white"}}>
                        <CardContent>
                            <Avatar src='' variant='square' sx={{ color:'#33eaff' , border:10 , borderRadius:5   , width:200 , height:200 , }} />
                            <Typography textAlign='center' mt={3} bgcolor = 'peru' color='white' >?</Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' sx = {{ ml:3 }} color = 'error' disabled >---</Button>
                            <Button variant='contained' sx = {{ ml:3 }} color = 'secondary' disabled  >----</Button>
                        </CardActions>
                    </Card>
                ))}

                {/* <Card sx = {{ borderRadius:12 ,border:12, borderColor:'green'}}>
                    <CardContent>
                        <Avatar src='img/avatar3.png' variant='square' sx={{ color:'#33eaff' , border:10 , borderRadius:5   , width:200 , height:200 , }} />
                        <Typography textAlign='center' mt={3} bgcolor = 'peru' color='white' >Jim Brown</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' sx = {{ ml:3 }} color = 'error' >Out</Button>
                        <Button variant='contained' sx = {{ ml:3 }} color = 'secondary' >Start</Button>
                    </CardActions>
                </Card>
                <Card sx = {{ borderRadius:12}}>
                    <CardContent>
                        <Avatar src='img/avatar4.png' variant='square' sx={{ color:'#33eaff' , border:10 , borderRadius:5   , width:200 , height:200 , }} />
                        <Typography textAlign='center' mt={3} bgcolor = 'peru' color='white' >Jim Brown</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' sx = {{ ml:3 }} color = 'error' >Out</Button>
                        <Button variant='contained' sx = {{ ml:3 }} color = 'secondary' >Start</Button>
                    </CardActions>
                </Card>
                <Card sx = {{ borderRadius:12}}>
                    <CardContent>
                        <Avatar src='img/avatar5.png' variant='square' sx={{ color:'#33eaff' , border:10 , borderRadius:5   , width:200 , height:200 , }} />
                        <Typography textAlign='center' mt={3} bgcolor = 'peru' color='white' >Jim Brown</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' sx = {{ ml:3 }} color = 'error' >Out</Button>
                        <Button variant='contained' sx = {{ ml:3 }} color = 'secondary' >Start</Button>
                    </CardActions>
                </Card> */}
            </Box>
        </div>
    )
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps)(ReadyRoom);
