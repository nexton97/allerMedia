import {useState , useEffect} from 'react'
import axios from 'axios'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { EditText} from 'react-edit-text';
import 'react-edit-text/dist/index.css';

const Item = styled(Paper )(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    border : 'none',
    elevation : 0
  }));
export default function DataFetching() {
    const [posts , setPosts] = useState([])
    const getPost = ()=>{
        axios.get('https://storage.googleapis.com/aller-structure-task/test_data.json')
        .then(res => {
            console.log(res)
            setPosts(res.data[0])
            
        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getPost();
    },[])
    console.log(posts)

  return (
    <Box sx={{ flexGrow: 1 }}>
        {posts.map((post,i)=>{
                return(
            
            <Grid container spacing={5}>
                {
                post.columns.map((column,j)=>{
                    return(
                        <Grid item xs={column.width}>
                        <Item elevation={0}><a href={column.url} target="_blank"><img src={column.imageUrl+'&height=500&width=500'} alt={column.title} ></img></a>
                        <EditText 
                        style={{fontSize:'30px'}}
                        className='textbox'
                        name='textbox'
                        defaultValue= {column.title} 
                        editButtonProps={{ style: { marginLeft: '5px' } }}
                        showEditButton
                        /></Item>
                        </Grid>)
                })
                
                }

            </Grid>
            )
            })
        }
    </Box>


  );
}
