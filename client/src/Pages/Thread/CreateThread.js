import { Button, TextField } from '@mui/material';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';

const CreateThread = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
        title,
        content,
        userId: user._id,
        forumId: id
    };

    const response = await axios.post('/api/thread/create', data);
    const {_id} = response.data;
    navigate('/thread/'+_id);
  }

  return (
    <div style={{padding: "2rem"}}>
        <h1 style={{marginBottom: "2rem"}}>Create Thread</h1>

        <form onSubmit={handleOnSubmit}>
            <TextField label="Title" required fullWidth margin='normal' value={title} onChange={e => setTitle(e.target.value)} />
            <textarea placeholder='Content' 
                      required 
                      value={content} 
                      style={{width: '100%', height: 250}}
                      onChange={e => setContent(e.target.value)} >

            </textarea>
            <Button type='submit' variant='contained' color='primary'>Create</Button>
        </form>
    </div>
  )
}

export default CreateThread