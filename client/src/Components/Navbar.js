import React, {useContext} from 'react';
import AuthContext from '../Contexts/AuthContext';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import { createTheme } from '@mui/material';

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const navigate = useNavigate();
  const {user, handleLogout} = useContext(AuthContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const logout = () => {
    handleClose();
    handleLogout();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleClose();
    navigate('/auth/login');
  };

  const handleRegister = () => {
    handleClose();
    navigate('/auth/register');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography style={{cursor: 'pointer'}} variant="h6" className={classes.title} onClick={() => navigate('/')}>
            Online Forum
          </Typography>
          <Button color='inherit' onClick={() => navigate('/category')}>
            Categories
          </Button>
          {user ?
            (
                <div>
                    <Button
                      onClick={handleMenu}
                      color="inherit"
                    >
                      {user.name}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </div>
            )
            :
            (
                <div>
                    <Button
                      onClick={handleMenu}
                      color="inherit"
                    >
                      Account
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleLogin}>Login</MenuItem>
                      <MenuItem onClick={handleRegister}>Register</MenuItem>
                    </Menu>
                </div>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
