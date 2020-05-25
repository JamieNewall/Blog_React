/* eslint-disable */
import React from 'react';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Search from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from 'react-redux'
import { SnackbarProvider, useSnackbar } from 'notistack';
import {useMutation} from "@apollo/react-hooks";
import {Query} from '@apollo/react-components'
import {useApolloClient} from "@apollo/react-hooks";
import Post from "./Post";
import gql from 'graphql-tag'
import Axios from "axios";
import { ApolloConsumer } from "@apollo/react-components";
import {SET_POSTS} from '../../redux/actions'



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




const Home = ({props, resetSubmit, submitSuccessful}) => {

    const client = useApolloClient()

    const GetAllPostsQuery = gql`
        query {
            getAllPosts {
                postTitle
                postContent
                views
            }
        }
    `
    useEffect(() => {

     resetSubmit()

    },[])

    const classes = useStyles()
    const {  enqueueSnackbar }  = useSnackbar();

    return (

    <Container maxWidth={'md'}>

        {submitSuccessful &&

            enqueueSnackbar('Post Added!', {variant: 'success'})



        }

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

            <Query query={GetAllPostsQuery}>
                { ({data, error, loading}) => {
                    if (loading) return 'loading....'
                    if (error) return 'something went wrong....'

                    return (
                        <>
                        { data.getAllPosts.map( (post, i) => {
                            return (
                                <Grid key={i} item className={classes.post} sm={4}>
                                <Post postTitle={post.postTitle.slice(0,8)} postBody={post.postContent.slice(0,20)}  />
                                </Grid>
                                )
                        })}
                        </>
                        )}}
            </Query>


        </Grid>
        </Box>

    </Container>
        )
};


const stateToProps = (state) => ({
    submitSuccessful: state.submitSuccessful,
    allPosts: state.allPosts

})

const dispatchToProps = (dispatch) => ({
    resetSubmit: () => dispatch({type:'RESET_SUBMIT'}),

})



export default connect(stateToProps, dispatchToProps)(Home);