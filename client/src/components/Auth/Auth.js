import React,{useState} from 'react';
import {Avatar,Button,Grid,Typography,Container,Paper} from '@material-ui/core'

import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import useStyles from './styles';

import Input from './Input';
import Icon from './Icon';

//actions
import {signin,signup} from '../../actions/auth'

const initialState = {
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    confirmPassword : '',
}

const Auth = () => {
    const classes = useStyles();
    const [showPassword,setShowPassword] = useState(false);

   const [isSignUp,setIsSignUp] = useState(false);
    const history = useHistory();
   const dispatch = useDispatch();

   const [formData,setFormData] = useState(initialState);

  const handleShowPassword = () =>{
       setShowPassword(prev => !prev);
   }

   const handleSubmit = (e) =>{
    e.preventDefault();    
    if(isSignUp){
        dispatch(signup(formData,history))
    }else{
        dispatch(signin(formData,history))
    }
   }

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData({...formData , [name] : value })
    }
    const switchMode= () =>{
setIsSignUp(prev => !prev);
handleShowPassword(false);
    }

    const googleSuccess = async (res) =>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type : 'AUTH' , data : {result,token}});
            history.push('/');
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = () =>{
        console.log("Google Sign In was Unsuccessful , Try Again")
    }

    return (
<Container component="main" maxWidth="xs"> 
        <Paper className={classes.paper} elevation={3} >
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign IN"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing = {2} >
                    {
                        isSignUp && (
                            <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half  />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half  />

                            </>
                        )
                    }
                    <Input name="email" label="Email Addess" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>
                <Button type="Submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp  ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleLogin 
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    render = {(renderProps)=>(
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon = {<Icon />} variant="contained">Google Sign In </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
              
                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
</Container>
    )
}

export default Auth
