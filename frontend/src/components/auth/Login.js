import * as React from 'react';
import {Typography , CssBaseline , Box , Container , Avatar , Link , TextField , FormControlLabel , Checkbox , Button , Grid} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {loginUser} from '../../store/actions/authAction';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';


const Copyright = props => {
    return (
        <Typography variant='body2' color = 'text.secondary' align='center' {...props} >
            {'Copyright @ '}
            <Link color='inherit' href = '' >
                Your website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const theme = createTheme();

const Login = (props) =>{
    const {enqueueSnackbar} = useSnackbar();
    const [email , setEmail] = React.useState("");
    const [password , setPassword] = React.useState("");
    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
        console.log({email , password});
        props.loginUser({email , password} , navigate , enqueueSnackbar );
    }

    React.useEffect(() => {
        if(props.isAuthenticated)
            navigate('/mypage');
    } , [])
    React.useEffect(() => {
        console.log('error');
    } , [props.error]);


    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth = 'sm' className ='text-center text-white' >
                <CssBaseline />
                <h2 className='mt-5 '>
                    Winning in the World's Math Game
                </h2>
                <Box
                    sx={{
                        marginTop:8,
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center'
                     }}
                    >
                        <Avatar sx = {{ m:1 , bgcolor:'secondary.main' ,width:72 , height:72 }}>
                            <LockOutlined fontSize='large' />
                        </Avatar>
                        <Typography component='h1' variant='h5' sx={{ marginTop:3 }} >
                            Sign in
                        </Typography>
                        <Box component='form' onSubmit={handleSubmit} noValidate sx = {{ mt:1 }}  >
                            <TextField
                                margin = "normal" required fullWidth id = 'email' label = "Email Address" name = "email" autoComplete = "email" focused color='secondary'
                                sx={{ input:{color:'white'} }}
                                value = {email}
                                onChange = {e => setEmail(e.target.value)}
                                >
                            </TextField>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                color='secondary'
                                focused
                                sx = {{ input:{color:'white'} }}
                                value = {password}
                                onChange = {e => setPassword(e.target.value)}

                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="secondary" sx = {{ color:'pink' }}  />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                // href = '/mypage'
                            >
                                Sign In
                            </Button>
                            <Grid container mt={2} >
                                <Grid item xs = {12} sm = {12} md ={6} textAlign = {{xs : 'center' ,sm : 'center' , md:'left' }}  >
                                    <Link href="#" variant="body2" className='text-white' >
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item xs = {12} sm = {12} md ={6} textAlign = {{ xs : 'center' ,sm : 'center' , md:'right' }}>
                                    <Link href="/register" variant="body2" className='text-white'>
                                    {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

const mapStateToProps = state => ({
    error:state.error,
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps , {loginUser})(Login);
