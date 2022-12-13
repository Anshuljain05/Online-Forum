import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {List, ListItem, ListItemText, Button, TextField} from '@material-ui/core';
import AuthContext from '../../Contexts/AuthContext';
import formatDate from '../../utils/formatDate';

function ShowThread() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {user} = useContext(AuthContext);
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    getThread();
    getPosts();
  }, []);

  const getThread = async () => {
    const response = await axios.get('/api/thread/'+id);
    setThread(response.data);
  }

  const getPosts = async () => {
    const response = await axios.get('/api/post/thread/'+id);
    if (response.data.length) {
      setPosts(response.data);
      setPage(page + 1);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }
  const getMorePosts = async () => {
    const response = await axios.get('/api/post/thread/'+id, {
      params: {
        page
      }
    });
    if (response.data.length) {
      setPosts(response.data);
      setPage(page + 1);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }
  const handleReply = async event => {
    event.preventDefault();
    if (!replyContent) return;
    const data = {
      userId: user._id,
      threadId: thread._id,
      content: replyContent
    };
    
    const response = await axios.post('/api/post/create', data);
    setPosts([...posts, response.data]);
    setReplyContent("");
    setIsReplying(false);
  }

  return (
    <div style={{padding: "2rem"}}>
        {thread && <h1>{thread.title}</h1>}

        {thread && <p>{thread.content}</p>}


        <List>
            {posts.map((post, index) => (
                <ListItem key={index}>
                    <ListItemText primary={post.content} secondary={formatDate(post.createdAt)} />
                </ListItem>
            ))}
        </List>
        <Button variant='contained' 
                color='primary' 
                disabled={!hasMore} 
                style={{marginRight: '1rem'}}
                onClick={getMorePosts}>
                  Load More Posts
        </Button>

        <Button variant='contained' 
                color='primary' 
                onClick={() => setIsReplying(true)}>
                  Reply
        </Button>
        {isReplying && (
          <form onSubmit={handleReply}>
            <TextField fullWidth 
                        label='Content' 
                        value={replyContent} 
                        onChange={e => setReplyContent(e.target.value)} />
            <Button type='submit'>Confirm</Button>
          </form>
        )}
    </div>
  )
}

export default ShowThread