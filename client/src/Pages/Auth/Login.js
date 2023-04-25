import React, { useState, useContext } from 'react';
import AuthContext from '../../Contexts/AuthContext';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/material';

const theme = createTheme();

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const {setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    const data = {
        email,
        password
    };

    try {
        const response = await axios.post('/api/auth/login', data);
        const {token, user} = response.data;
        localStorage.setItem("token", token);
        setUser(user);
        navigate('/');
    } catch (error) {
        const message = error.response.data.message;
        if (message === 'user_not_found') {
            setEmailError('No users with this email were found');
        } else if (message === 'wrong_password') {
            setPasswordError('Wrong password');
        }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleOnSubmit}>
          <TextField
            required
            fullWidth
            label="Email Address"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}