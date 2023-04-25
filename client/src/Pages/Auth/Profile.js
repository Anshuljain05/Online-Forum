import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {List, ListItem, ListItemText, Divider} from '@mui/material';
import formatDate from '../../utils/formatDate';
import AuthContext from '../../Contexts/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});
  const { email } = user;

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const response = await axios.get('/api/profile/'+ email);
    setProfileData(response.data);
  }
  console.log(profileData)


  return (
    <div style={{padding: "2rem"}}>
        {profileData && <h1>{profileData.firstName} {profileData.lastName}</h1>}

        {/* <Button variant='contained' color='primary' onClick={() => navigate('/forum/create/'+id)}>Create Forum</Button> */}

        {/* <List>
            {fora.map((forum, index) => (
                <ListItem key={index} button onClick={() => navigate(`/forum/${forum._id}`)}>
                    <ListItemText primary={forum.title} secondary={formatDate(forum.createdAt)} />
                </ListItem>
            ))}
        </List> */}
    </div>
  )
}

export default Profile