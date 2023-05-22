import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {List, ListItem, ListItemText, Divider} from '@mui/material';
import formatDate from '../../utils/formatDate';
import AuthContext from '../../Contexts/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);
  const { email } = user;
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [updateBtnStatus, setUpdateBtnStatus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [batch, setBatch] = useState("");


  useEffect(() => {
    if(!updateBtnStatus){
      getProfile();
    }
  }, [updateBtnStatus]);

  const getProfile = async () => {
    const response = await axios.get('/api/profile/'+ email);
    setProfileData(response.data);
  }

  const handleEdit = () => {
    if(profileData.firstName){
      setFirstName(profileData.firstName);
    }
    if(profileData.lastName){
      setLastName(profileData.lastName);
    }
    if(profileData.college){
      setCollege(profileData.college);
    }
    if(profileData.branch){
      setBranch(profileData.branch);
    }
    if(profileData.specialization){
      setSpecialization(profileData.specialization);
    }
    if(profileData.batch){
      setBatch(profileData.batch);
    }
    setUpdateBtnStatus(true);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const data = {
        email,
        firstName,
        lastName,
        college,
        branch,
        specialization,
        batch,
    };

    const response = await axios.post('/api/profile/update', data);
    navigate('/profile');
    setUpdateBtnStatus(false);
  }


  return (
    profileData ? (
      updateBtnStatus ? (
        <div style={{padding: "2rem"}}>
          <form onSubmit={handleUpdate}>
            <div style={{ display: 'grid', gridTemplateColumns: '15% 1fr' }}>
              <h3>First Name: </h3>
              <TextField label="First Name" required margin='normal' fullWidth defaultValue={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '15% 1fr' }}>
              <h3>Last Name: </h3>
              <TextField label="Last Name" margin='normal' fullWidth defaultValue={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '15% 1fr' }}>
              <h3>Email: </h3>
              <TextField label="Email" margin='normal' disabled fullWidth defaultValue={email} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '15% 1fr' }}>
              <h3>College Name: </h3>
              <TextField label="College Name" margin='normal' fullWidth defaultValue={college} onChange={e => setCollege(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '15% 1fr' }}>
              <h3>Branch: </h3>
              <TextField label="Branch" margin='normal' fullWidth defaultValue={branch} onChange={e => setBranch(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '15% 1fr' }}>
              <h3>Specialization: </h3>
              <TextField label="Specialization" margin='normal' fullWidth defaultValue={specialization} onChange={e => setSpecialization(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '15% 1fr' }}>
              <h3>Batch: </h3>
              <TextField label="Batch" margin='normal' fullWidth defaultValue={batch} onChange={e => setBatch(e.target.value)} />
            </div>
            <Button type='submit' variant='contained' color='primary'>Update Profile</Button>
            <Button variant='contained' color='inherit' style={{ marginLeft: 10}} onClick={() => setUpdateBtnStatus(false)}>Close Edit</Button>
          </form>
        </div>
      ) : (
        <div style={{padding: "2rem"}}>
          <div style={{ fontSize: "30px", fontWeight: 'bold' }}>{profileData.firstName} {profileData.lastName}</div>
          <p style={{ fontSize: '24px'}}>{profileData.email}</p>
          <hr/>
          <div style={{ padding: "1rem" }}>
            <p style={{fontSize: '18px', display: 'grid', gridTemplateColumns: '15% 1fr'}}>
              <strong>College Name: </strong>
              {profileData.college}
            </p>
            <p style={{fontSize: '18px', display: 'grid', gridTemplateColumns: '15% 1fr'}}>
              <strong>Branch: </strong>
              {profileData.branch}
            </p>
            <p style={{fontSize: '18px', display: 'grid', gridTemplateColumns: '15% 1fr'}}>
              <strong>Specialization: </strong>
              {profileData.specialization}
            </p>
            <p style={{fontSize: '18px', display: 'grid', gridTemplateColumns: '15% 1fr'}}>
              <strong>Batch: </strong>
              {profileData.batch}
            </p>
          </div>
          <Button variant='contained' color='primary' onClick={handleEdit}>Edit Profile</Button>

        </div>
      )
    ) : (
      <div>
        <h1>No Data found!</h1>
      </div>
    )
  )
}

export default Profile