import * as React from 'react';
import socket from '../api';
import {useParams} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import { Typography , Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';

const Result = (props) => {
    const {level} = useParams();
    const [myInfo , setMyInfo] = React.useState([]);
    const navigate = useNavigate();
    React.useEffect(() => {
        if(!props.isAuthenticated)
            navigate('/login');
        socket.emit('getGameInfo' , {level  , problem:false , email:props.user.email });
    } , []);
    socket.on('getGameInfo' ,data => {
        // console.log(data)
        setMyInfo(data.myInfo);
        socket.emit('leaveRoom' , {level, email:props.user.email });
    });
    socket.on('leaveRoom' , data => {

    });
    return (
        <div className='mypage-bg'>
            <Container>
                <Button variant = 'contained' color = 'warning' sx = {{ marginTop:5 }} onClick = {() => {
                        navigate('/mypage');
                    }}>
                    Return
                </Button>
                <Typography variant='h3' sx = {{ marginTop:10 , textAlign:'center' , color:'blueviolet' }} >
                    Result
                </Typography>
                <TableContainer component={Paper} sx = {{ marginTop:15 }} >
                    <Table sx={{width: '100%' }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Level</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Country</TableCell>
                            <TableCell align="right">Right</TableCell>
                            <TableCell align="right">Wrong</TableCell>
                            <TableCell align="right">accuracy</TableCell>
                            <TableCell align="right">score</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {/* {clients.sort((item1 , item2) => (item2.right-item2.wrong) - (item1.right-item1.wrong)).map((row , index) => ( */}

                                {/* {Object.keys(myInfo).length>0? */}
                                    <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {level}
                                        </TableCell>
                                        <TableCell align="right">{{...myInfo}.hasOwnProperty('fullName')?myInfo.fullName:""}</TableCell>
                                        <TableCell align="right">{{...myInfo}.hasOwnProperty('country')?myInfo.country:""}</TableCell>
                                        <TableCell align="right">{{...myInfo}.hasOwnProperty('right')?myInfo.right:""}</TableCell>
                                        <TableCell align="right">{{...myInfo}.hasOwnProperty('wrong')?myInfo.wrong:""}</TableCell>
                                        <TableCell align="right">{{...myInfo}.hasOwnProperty('wrong')&& {...myInfo}.hasOwnProperty('right')?Math.round(myInfo.right*100 /(myInfo.right+myInfo.wrong === 0?1:myInfo.right+myInfo.wrong) ):""}%</TableCell>
                                        <TableCell align="right">{{...myInfo}.hasOwnProperty('wrong')&& {...myInfo}.hasOwnProperty('right')?myInfo.right * 5:""}</TableCell>
                                    </TableRow>
                                {/* } */}
                        {/* ))} */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    user:state.auth.user,
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Result);
