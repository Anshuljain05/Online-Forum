import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateForum = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [title, setTitle] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
        title,
        categoryId: id
    };

    const response = await axios.post('/api/forum/create', data);
    const {_id} = response.data;
    navigate('/forum/'+_id);
  }

  return (
    <div style={{padding: "2rem"}}>
        <h1 style={{marginBottom: "2rem"}}>Create Forum</h1>

        <form onSubmit={handleOnSubmit}>
            <TextField label="Title" required fullWidth margin='normal' value={title} onChange={e => setTitle(e.target.value)} />
            <Button type='submit' variant='contained' color='primary'>Create</Button>
        </form>
    </div>
  )
}

export default CreateForum