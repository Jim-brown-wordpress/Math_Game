import * as React from 'react';
import {Container , Typography , Box , Avatar , Stack , TextField , Grid , LinearProgress , Button} from '@mui/material';
import TimePicker from '../../common/TimePicker';
import {useNavigate , useParams} from 'react-router-dom';
import socket from '../../api';
import {connect} from 'react-redux';
import axios from 'axios';

const _TIME = 80;
const _PROBLEMSL = 20;

const StartRoom = (props) => {
    const navigate = useNavigate();
    const {level} = useParams();
    const [_time , setTime] = React.useState(_TIME);
    const [clients , setClients] = React.useState([]);
    const [problems , setProblems] = React.useState([]);
    const [answer , setAnswer] = React.useState(0);
    const [problemIndex , setProblemIndex] = React.useState(0);
    let interval;
    React.useEffect(() => {
        if(!props.isAuthenticated)
            navigate('/login');
        socket.emit('getGameInfo' , {level , problem:true});
        interval = setInterval(() => {
            setTime(prev => prev-1);
        } , 1000);
        return () => clearInterval(interval);
    } , []);
    React.useEffect(() =>{
        if(_time == 0){
            axios.post('/setResult' , {...clients.filter(item =>item.email===props.user.email)[0]})
                .then(res => {
                    let sum = 0;
                    res.data.scores.map(item => {sum+=item});
                    if(sum == 500)
                        navigate('/congratulation');

                })
                .catch(err =>console.log(err));
            navigate(`/result/${level}`);
            // console.log('end')
            // clearInterval(interval);
            // socket.emit('exitGame' , {level});
            // navigate('/result');
            // setTime(80);
        }
    } , [_time]);

    socket.on('getGameInfo' , data =>{
        console.log('~~~~~~~~~~~StartROom');
        console.log(data.clients);
        setClients(data.clients);
        setProblems(data.problems);
        // console.log(data);
    });
    socket.on('wrong' , data =>{
        setClients(data.clients);
    });
    socket.on('right' , data =>{
        setClients(data.clients);
    });
    return (
        <div className='mypage-bg'>
            <Container maxWidth = 'sm' sx = {{ textAlign:'center' }} >
                <Typography variant='h5' pt={5} color = 'red' >
                    Game Room Remain Time : <Typography component='span' variant='h4' color='purple' >{_time}</Typography>
                </Typography>
            </Container>
            <Box
                sx = {{  marginX:5 , marginTop:5 , padding:10 }}
                >
                <Box  >
                    {problems.length > 0?
                        <Typography variant='h4' textAlign='center' marginY='auto' >
                            {problems[problemIndex][0]} <span>&#215;</span> {problems[problemIndex][1]} ={' '}
                            <Box display='inline' >
                                <TextField
                                    label = 'Result'
                                    variant='standard'
                                    size='small'
                                    sx={{bgcolor:'white' }} focused disabled = {clients.length > 0 &&clients.filter(item =>item.email===props.user.email)[0].wrong === 3}
                                    value = {answer}
                                    onChange = {e => setAnswer(e.target.value) }

                                />
                                <Button
                                    variant = 'contained'
                                    color = 'warning' sx = {{ marginLeft:2 }}
                                    disabled = {clients.length > 0 &&clients.filter(item =>item.email===props.user.email)[0].wrong === 3}
                                    onClick = {() => {
                                        if(problemIndex < 19){

                                            if(problems[problemIndex][0] * problems[problemIndex][1] != answer){
                                                /* Socket wrong */
                                                socket.emit('wrong' , {email:props.user.email , level});
                                            }
                                            else{
                                                /* Socket right */
                                                console.log('right');
                                                socket.emit('right' , {email:props.user.email , level});
                                            }

                                            setProblemIndex(prev => prev+1);
                                        }
                                    }}
                                    >Submit
                                </Button>
                            </Box>
                        </Typography>:''
                    }
                </Box>
                <Grid container spacing={5} marginTop={15} >
                    <Grid item sx container >
                        <Grid item lg = {1} md = {12} sm = {12} sx = {12}  textAlign = 'center' >
                            <Avatar src={require('../../../src/assets/img/avatar.png')} variant='square' sx={{
                                color:'#33eaff' ,
                                border:10 ,
                                borderRadius:5   ,
                                width:100 ,
                                height:100 ,
                                borderBottomColor:'red' ,
                                borderLeftColor:clients.length>0 && clients.filter(item =>item.email===props.user.email)[0].wrong >0? 'red':'#33eaff',
                                borderTopColor:clients.length>0 &&clients.filter(item =>item.email===props.user.email)[0].wrong >1? 'red':'#33eaff',
                                borderRightColor:clients.length>0 &&clients.filter(item =>item.email===props.user.email)[0].wrong >2? 'red':'#33eaff',
                            }} />
                        </Grid>
                        <Grid item lg = {10} md = {12}  sm = {12} sx = {12}  mt = {5} >
                            <LinearProgress variant='determinate' value={clients.length>0 &&clients.filter(item =>item.email===props.user.email)[0].right*5} color = 'secondary' sx = {{ height:30 }} />
                        </Grid>
                    </Grid>
                    {clients.filter(item => item.email!==props.user.email).map((item , index) => (
                        <Grid item sx container key = {index} >
                            <Grid item lg = {1} md = {12} sm = {12} sx = {12} >
                                <Avatar src={require(`../../../src/assets/img/avatar${index+1}.png`)} variant='square' sx={{
                                    color:'#33eaff' ,
                                    border:10 ,
                                    borderRadius:5   ,
                                    width:100 ,
                                    height:100 ,
                                    borderBottomColor:'red',
                                    borderLeftColor:item.wrong >0? 'red':'#33eaff',
                                    borderTopColor:item.wrong >1? 'red':'#33eaff',
                                    borderRightColor:item.wrong >2? 'red':'#33eaff',
                                }} />
                            </Grid>
                            <Grid item lg = {10} md = {12} sm = {12} sx = {12} mt = {5} >
                                <LinearProgress variant='determinate' value={item.right*5} color = 'secondary' sx = {{ height:30 }}  />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

const mapStateToProps = state => ({
    user:state.auth.user,
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps)(StartRoom);
