import { Button } from '@mui/material';
import formatDate from '../../utils/formatDate'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {List, ListItem, ListItemText, Divider} from '@mui/material';

function BrowseCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const response = await axios.get('/api/category');
    setCategories(response.data);
  }

  return (
    <div style={{padding: "2rem"}}>
        <h1>Browse Categories</h1>

        <Button variant='contained' color='primary' onClick={() => navigate('/category/create')}>
            Create Category
        </Button>

        <Divider style={{margin: "2rem 0"}} />

        <List>
            {categories.map((category, index) => (
                <ListItem key={index} button onClick={() => navigate(`/category/${category._id}`)}>
                    <ListItemText primary={category.title} secondary={formatDate(category.createdAt)} />
                </ListItem>
            ))}
        </List>
    </div>
  )
}

export default BrowseCategories