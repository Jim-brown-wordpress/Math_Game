import * as React from 'react';
import {Typography , CssBaseline , Box , Container , Avatar , Link , TextField , FormControlLabel , Checkbox , Button , Grid, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CountrySelect from './CountrySelect';
import {connect} from 'react-redux';
import {registerUser} from '../../store/actions/authAction';
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

const Register = (props) =>{
    const {enqueueSnackbar} = useSnackbar();
    const [fullname , setFullname] = React.useState("");
    const [school , setSchool] = React.useState("");
    const [age , setAge] = React.useState(0);
    const [email , setEmail] = React.useState("");
    const [country , setCountry] = React.useState("");
    const [classN , setClassN] = React.useState(1);
    const [username , setUsername] = React.useState("");
    const [password , setPassword] = React.useState("");
    const handleSubmit = event => {
        event.preventDefault();
        props.registerUser({fullname , school , age , email , country , classN , username , password} , enqueueSnackbar);
    }
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
                            Sign Up
                        </Typography>
                        <Box component='form' onSubmit={handleSubmit} noValidate sx = {{ mt:1 }}  >
                            <TextField
                                margin = "normal" required fullWidth id = 'fullname' label = "Full Name" name = "fullname"  focused color='secondary'
                                sx={{ input:{color:'white'} }}
                                value = {fullname}
                                onChange = {(e) => setFullname(e.target.value)}
                                >
                            </TextField>
                            <TextField
                                margin = "normal" required fullWidth id = 'school' label = "School" name = "school"  focused color='secondary'
                                sx={{ input:{color:'white'} }}
                                value = {school}
                                onChange = {(e) => setSchool(e.target.value)}
                                >
                            </TextField>
                            <TextField
                                margin = "normal" required fullWidth id = 'age' label = "Age" name = "age"  focused color='secondary'
                                sx={{ input:{color:'white'} }} type = 'number'
                                value = {age}
                                onChange = {(e) => setAge(e.target.value)}
                                >
                            </TextField>
                            <TextField
                                margin = "normal" required fullWidth id = 'email' label = "Email Address" name = "email" autoComplete = "email" focused color='secondary'
                                sx={{ input:{color:'white'} }}
                                value = {email}
                                onChange = {(e) => setEmail(e.target.value)}
                                >
                            </TextField>
                            <CountrySelect changeCountry = {setCountry} />
                            <FormControl fullWidth sx = {{ input:{color:'white'} ,marginTop:2 }} focused color='secondary' >
                                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={classN}
                                    label="class"
                                    onChange={(e , newValue) => { setClassN(e.target.value+1);}}
                                    sx = {{ color:'white'}}
                                >
                                    {[...Array(10).keys()].map((item , index) => {
                                        return <MenuItem key={index} value={item}>{item+1}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <TextField
                                margin = "normal" required fullWidth id = 'username' label = "User Name" name = "username"  focused color='secondary'
                                sx={{ input:{color:'white'} }}
                                vaule = {username}
                                onChange = {e => setUsername(e.target.value)}
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
                                vaule = {password}
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
                            >
                                Sign Up
                            </Button>

                            <Grid container mt={2} >
                                <Grid item xs = {12} sm = {12} md ={6} textAlign = {{xs : 'center' ,sm : 'center' , md:'left' }}  >
                                    {/* <Link href="#" variant="body2" className='text-white' >
                                        Forgot password?
                                    </Link> */}
                                </Grid>
                                <Grid item xs = {12} sm = {12} md ={6} textAlign = {{ xs : 'center' ,sm : 'center' , md:'right' }}>
                                    <Link href="/login" variant="body2" className='text-white'>
                                    {"have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

const mapStateToProps = (state) => ({
    error:state.error,
    // auth:state.auth
})

export default connect(mapStateToProps , {registerUser})(Register);
