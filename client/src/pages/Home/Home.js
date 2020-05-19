/* eslint-disable */
import React from 'react';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Search from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useMutation} from "@apollo/react-hooks";
import {Query} from '@apollo/react-components'
import {useApolloClient} from "@apollo/react-hooks";
import Post from "./Post";
import gql from 'graphql-tag'
import Axios from "axios";
import { ApolloConsumer } from "@apollo/react-components";



import {useQuery} from "@apollo/react-hooks";
const {useState} = require("react");
const {useEffect} = require("react");



const useStyles = makeStyles(theme => ({
    search: {
        marginBottom: '150px',
        width: '100%'

    },
    post: {
        height: '400px',
        marginTop: '-100px'
    },
    break:  {[theme.breakpoints.down('sm')]: {
    justifyContent: 'center'

}}
}))


const getLocalState = gql`
    query state {
        anyState @client
    }
`




const Home = (props) => {
    const client = useApolloClient()

    //TODO update
    const [posts,setPosts] = useState([])



    //TODO update with backend
    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/posts/').then(res => {
            let postData = []
            res.data.map( p => {
                let post ={};
                post.title = p.title;
                post.body = p.body;
                postData.push(post)
            })
            setPosts(postData)
        }).catch( err => console.log(err))
    },[])

    const classes = useStyles()

    return (
    <Container maxWidth={'md'}>



        <Box mt={10} >
            <Grid container className={`${classes.break} ${classes.search}`} >
                <Grid item>
                    <Search/>
                </Grid>
                <Grid item style={{display:'block', width:'80%'}}>
                    <TextField
                    placeholder={'Search...'}
                    fullWidth


                    >
                    </TextField >
                </Grid>
            </Grid>
        </Box>

        <Box mt={4}>
        <Grid container spacing={1} direction={'row'} className={classes.break}>
            {posts.map((p, index) => (
                <Grid key={index} item className={classes.post} sm={4}>
                <Post  postTitle={p.title.slice(0,8)} postBody={p.body.slice(0,20)} />
                </Grid>
            ))}
        </Grid>
        </Box>

    </Container>)
};

export default Home;