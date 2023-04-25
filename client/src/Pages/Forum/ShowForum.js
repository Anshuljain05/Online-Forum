import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {List, ListItem, ListItemText, Divider} from '@mui/material';
import formatDate from '../../utils/formatDate';

function ShowForum() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [forum, setForum] = useState(null);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    getForum();
    getThreads();
  }, []);

  const getForum = async () => {
    const response = await axios.get('/api/forum/'+id);
    setForum(response.data);
  }

  const getThreads = async () => {
    const response = await axios.get('/api/thread/forum/'+id);
    setThreads(response.data);
  }

  return (
    <div style={{padding: "2rem"}}>
        {forum && <h1>{forum.title}</h1>}

        <Button variant='contained' color='primary' onClick={() => navigate('/thread/create/'+id)}>Create Thread</Button>

        <List>
            {threads.map((thread, index) => (
                <ListItem key={index} button onClick={() => navigate(`/thread/${thread._id}`)}>
                    <ListItemText primary={thread.title} secondary={formatDate(thread.createdAt)} />
                </ListItem>
            ))}
        </List>
    </div>
  )
}

export default ShowForum