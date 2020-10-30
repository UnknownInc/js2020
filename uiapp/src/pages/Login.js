import React from 'react';
import { observer } from "mobx-react-lite";
import {useHistory} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import useStores from '../stores/useStores';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  form:{
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    display:'flex',
    flexDirection:'column',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: '40ch',
  },
}));

const LoginPage = observer(()=>{
  const classes = useStyles();
  const {session} = useStores();
  const history = useHistory();
  const [values, setValues] = React.useState({
    email:'',
    password: '',
    showPassword: false,
    hasError: false
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegisterClick = ()=>{
    history.push('/register');
  }

  const handleLoginClick = async ()=>{
    try{
      await session.login(values.email, values.password);
      history.push('/');
    } catch (e) {
      setValues({ ...values, hasError: true});
    }
  }

  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <Paper elevation={3} className={classes.form}>
          <Typography variant="h4">Login</Typography>
          <br/>
          <Divider/>
          <br/>
          {values.hasError?<Alert severity="error">Invalid email or password.</Alert>:null}
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name='email'
              type={'email'}
              value={values.email}
              onChange={handleChange('email')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton><AccountCircle /></IconButton>
                </InputAdornment>
              }
            />

          </FormControl>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button variant='contained' color='primary' onClick={handleLoginClick}>Login</Button>
          <div style={{textAlign:'center'}}>not registered?</div>
          <Button onClick={handleRegisterClick}>Register now</Button>
        </Paper>
      </Grid>
    </React.Fragment>
  );
})

export default LoginPage;