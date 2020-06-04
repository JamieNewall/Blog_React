import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import gql from 'graphql-tag'
import {connect} from 'react-redux'
import {useMutation, useQuery} from "@apollo/react-hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import {Redirect} from 'react-router-dom'


const {useRef} = require("react");


const {useState} = require("react");

const {useEffect} = require("react");

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    container: {
        width: '80%',
        margin: 'auto',
        marginTop: '20px'
    }
});

function createData(PostTitle, postDate, views) {
    return { PostTitle, postDate, views};
}


const getAllPostsQuery = gql`
    query getAllPosts($userId: String){
        posts(userId: $userId){
            views
            _id
            postTitle
            postDate
            likes
       
        }
    }
    
`

const deletePostQuery = gql`
    mutation deletePost($postId: String) {
        deletePost(postId: $postId)

    }
`






const AllPosts = ({props, userId}) => {

    const {data, error, loading} = useQuery(getAllPostsQuery, {onCompleted:()=>console.log('went for data') ,pollInterval:500,variables:{userId: userId},fetchPolicy:"no-cache"})
    const okRef = useRef('ok')
    const cancelRef = useRef('cancel')
    const rowRef = useRef([])



    if(data){
        if(rowRef.current.length !== data.posts.length){
        rowRef.current = Array(data.posts.length).fill().map((_, i) =>{
            return rowRef.current[i] || React.createRef()
        })
        }
    }

    const [open, setOpen] = useState(false)
    const [postIdentifiedToBeDeleted, setPostIdentifier] = useState(null)
    const [redirect ,setRedirect] = useState(false)
    const [postToEdit, setPostToEdit] = useState(null)

    const [deletePostMutation, _] = useMutation(deletePostQuery,{})

    const handleClickOpen = (i) => {
        setOpen(true);
        setPostIdentifier(i)

    };

    const handleEditPostClick = (i) => {
        console.log('clicked')
        setPostIdentifier(i)
        let post = data.posts[i]
        setPostToEdit(post._id)
        setRedirect(true)

    }


    const deletePost =  async (postId) => {

        let {data, error, loading} = await deletePostMutation({variables:{postId}})
        if(error) {throw error}
        if(loading){console.log('loading....')}

        return data
    }

    const handleCloseOnOk = async (e, i) => {

        const postId = rowRef.current[postIdentifiedToBeDeleted]

        // console.log(data.posts[postIdentifiedToBeDeleted])
        await deletePost(data.posts[postIdentifiedToBeDeleted]._id)
        setPostIdentifier(null)



        setOpen(false);
    };

    const handleCloseOnCancel = (e) => {
        setOpen(false);
    };





    const classes = useStyles()

    if(loading) {
        return <CircularProgress/>
    }

    if(error) {
        return <div>{`${error} There has beena an error, please refresh the page.`}</div>
    }

    if(redirect) {
        return <Redirect to={`/edit_post/${postToEdit}`}></Redirect>
    }

    return (
        <>
        <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Post Title</TableCell>
                        <TableCell align="center">Post Date</TableCell>
                        <TableCell align="center">Likes</TableCell>
                        <TableCell align="center">Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.posts.map((row,i) => {

                            return (
                        <TableRow ref={rowRef.current[i]} postId={row._id}>
                            <TableCell align="center" >{row.postTitle}</TableCell>
                            <TableCell align="center">{row.postDate}</TableCell>
                            <TableCell align="center">{row.likes}</TableCell>
                            <TableCell align="center">
                            <DeleteIcon onClick={()=> handleClickOpen(i)} />
                            <EditIcon onClick={() => handleEditPostClick(i) }/>
                            </TableCell>
                        </TableRow>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>


        {/*Modal*/}
        <Dialog open={open} onClose={handleCloseOnCancel}>
        <DialogTitle>Are you Sure? </DialogTitle>
        <DialogContent>
            <DialogContentText>Are you sure you want to delete this post - deleted posts cannot be recovered.</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button ref={okRef} onClick={handleCloseOnOk}>Ok</Button>
            <Button ref={cancelRef} onClick={handleCloseOnCancel}>Cancel</Button>
        </DialogActions>
        </Dialog>
        </>


    )

}


const mapStateToProps = (state) => ({
    userId: state.userId
})

export default connect(mapStateToProps, null)(AllPosts);
