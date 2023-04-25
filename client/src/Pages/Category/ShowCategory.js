import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {List, ListItem, ListItemText, Divider} from '@mui/material';
import formatDate from '../../utils/formatDate';

function ShowCategories() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [category, setCategory] = useState(null);
  const [fora, setFora] = useState([]);

  useEffect(() => {
    getCategory();
    getFora();
  }, []);

  const getCategory = async () => {
    const response = await axios.get('/api/category/'+id);
    setCategory(response.data);
  }

  const getFora = async () => {
    const response = await axios.get('/api/forum/category/'+id);
    setFora(response.data);
  }

  return (
    <div style={{padding: "2rem"}}>
        {category && <h1>{category.title}</h1>}

        <Button variant='contained' color='primary' onClick={() => navigate('/forum/create/'+id)}>Create Forum</Button>

        <List>
            {fora.map((forum, index) => (
                <ListItem key={index} button onClick={() => navigate(`/forum/${forum._id}`)}>
                    <ListItemText primary={forum.title} secondary={formatDate(forum.createdAt)} />
                </ListItem>
            ))}
        </List>
    </div>
  )
}

export default ShowCategories