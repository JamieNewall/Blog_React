import React, { createRef } from "react";
import { ADD_POST_TO_STATE } from "../../redux/actions";
import { ADD_TITLE_TO_STATE } from "../../redux/actions";
import { ADD_TAGS_TO_STATE } from "../../redux/actions";
import { ADD_TAG_INPUT_TO_STATE } from "../../redux/actions";
import { ADD_TAG_INPUT_SELECTED_TO_STATE } from "../../redux/actions";
import { REMOVE_TAG_FROM_TAG_ARRAY } from "../../redux/actions";
import { GET_POST_FROM_LOCAL_STATE } from "../../redux/actions";
import { SUBMIT_SUCCESSFUL } from "../../redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import CssBaseLine from "@material-ui/core/CssBaseline";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Redirect, useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const {useEffect} = require("react");

const { useRef } = require("react");

const useStyles = makeStyles((theme) => ({

    inputPost: {
        width: "80%",
        marginTop: "0",
    },
    formContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "0.5rem",
        alignContent: "center",
    },
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    wordCount: {
        marginTop: "10px",
        color: "red",
    },
    title: {
        marginTop: "1rem",
    },
    chip: {
        width: "",
    },
    chipContainer: {
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(0.5),
        },
        marginTop: "2rem",
        width: "30%",
    },
    tagInput: {
        width: "20%",
    },
    autocompleteInput: {},
    button: {
        marginTop: "20px",
        width: "15%",
    },
}));

const AddPost = ({
                     props,
                     currentPostWordCount,
                     postText,
                     addTagsToLocalState,
                     addPostToLocalState,
                     titleText,
                     addTitleToLocalState,
                     tagInputValue,
                     addTagInputToLocalState,
                     tagsArray,
                     tagInputValueSelected,
                     addTagInputSelectedToLocalState,
                     deleteTagFromState,
                     submitSuccessful,
                     submitSuccessfulDispatch,
                     userId,
                     resetTagsState
                 }) => {


    const classes = useStyles();
    let postIdParam = useParams()

    const getSpecificPostQuery = gql`
        query getSpecific ($postId: String){
            getSpecificPost(postId: $postId){

                postTitle
                postContent
                tags
            }
        }
    `

    const {data, loading, error} = useQuery(getSpecificPostQuery, {fetchPolicy:"no-cache",variables:{postId:postIdParam.id}})

    useEffect(()=> {

        if(data) {



            resetTagsState()
            let {tags} = data.getSpecificPost
            if (tags.length == 0) {
            } else {
                tags.map( (t) => {
                    addTagsToLocalState(t)
                })
            }


            addTitleToLocalState(data.getSpecificPost.postTitle)
            addPostToLocalState(data.getSpecificPost.postContent)


        }

    },[data])


    let refContainer = {};
    let globalRef = useRef([]);

    if (globalRef.current.length !== tagsArray.length) {
        globalRef.current = Array(tagsArray.length)
            .fill()
            .map((_, i) => globalRef.current[i] || createRef());

    }

    const amendPostMutationQuery = gql`
        mutation amend ($postId: String , $post: newPost){
            amendPost(postId: $postId, post: $post){
                postTitle
            }
        }
    `

    const [amendPostMutation, post] = useMutation(amendPostMutationQuery);

    const chipRef = useRef(null);

    let handleChange = (e) => {
        e.preventDefault();

        let value = e.target.value;

        switch (e.target.id) {
            case "post-body":
                addPostToLocalState(value);
                return;
            case "post-title":
                addTitleToLocalState(value);
                return;
            default:
                return;
        }
    };

    let handleTagChange = (event, newValue) => {
        addTagInputToLocalState(newValue.title);
        addTagsToLocalState(newValue.title);
    };

    let handleTagSelectedChange = (event, newInputValue) => {
        addTagInputSelectedToLocalState(newInputValue);
    };

    function handleDelete(e, index) {
        let strToRemove = globalRef.current[index].current.children[0].textContent;
        deleteTagFromState(strToRemove);
    }

    async function submitPost(e) {
        e.preventDefault();
        const post = {
            postContent: postText,
            postTitle: titleText,
            tags: tagsArray,
            user: userId

        };


        try {
            await amendPostMutation({ variables: {postId: postIdParam.id ,post} });
            submitSuccessfulDispatch();
        } catch (e) {
            alert("There was an error");
        }
    }

    if (submitSuccessful) {
        addTitleToLocalState('')
        addPostToLocalState('')
        addTagsToLocalState('')
        return <Redirect to={"/"} />;
    }

    if (loading){
        return (
            <div className={classes.loadingContainer}>
                <CircularProgress/>
            </div>

        )
    }



    return (
        <Container>
            <CssBaseLine />
            <form className={classes.formContainer}>
                <h2 className={classes.title}>Post Title</h2>
                <TextField
                    className={classes.inputPost}
                    onChange={handleChange}
                    value={titleText}
                    id={"post-title"}
                />
                <h2 className={classes.title}>Content</h2>
                <TextField
                    className={classes.inputPost}
                    id={"post-body"}
                    label={"Add Post Here...."}
                    multiline={true}
                    rows={10}
                    rowsMax={30}
                    onChange={handleChange}
                    value={postText}
                />
                <div
                    className={classes.wordCount}
                >{`${currentPostWordCount} Words`}</div>
                <h3 className={classes.title}>Tags</h3>
                <Autocomplete
                    id="tags"
                    value={tagInputValue}
                    onChange={handleTagChange}
                    inputValue={tagInputValueSelected}
                    onInputChange={handleTagSelectedChange}
                    options={programmingLanguages}
                    className={"tags"}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Tags" variant="outlined" />
                    )}
                />
                <div className={classes.chipContainer}>
                    <>
                        {tagsArray.length > 0 && tagsArray.map((item, i) => {
                            return (
                                <Chip
                                    className={classes.chip}
                                    index={i}
                                    label={item}
                                    color={"secondary"}
                                    ref={globalRef.current[i]}
                                    onDelete={(e) => handleDelete(e, i)}
                                />
                            );
                        })}
                    </>
                </div>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={submitPost}
                >
                    Submit Amends
                </Button>
            </form>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    postText: state.postText,
    currentPostWordCount: state.currentPostWordCount,
    titleText: state.titleText,
    tagInputValue: state.tagInputValue,
    tagsArray: state.tagsArray,
    tagInputValueSelected: state.tagInputValueSelected,
    submitSuccessful: state.submitSuccessful,
    userId: state.userId
});

const mapDispatchToProps = (dispatch) => ({
    addPostToLocalState: (payload) => dispatch(ADD_POST_TO_STATE(payload)),
    addTitleToLocalState: (payload) => dispatch(ADD_TITLE_TO_STATE(payload)),
    addTagsToLocalState: (payload) => dispatch(ADD_TAGS_TO_STATE(payload)),
    addTagInputToLocalState: (payload) =>
        dispatch(ADD_TAG_INPUT_TO_STATE(payload)),
    addTagInputSelectedToLocalState: (payload) =>
        dispatch(ADD_TAG_INPUT_SELECTED_TO_STATE(payload)),
    deleteTagFromState: (payload) => dispatch(REMOVE_TAG_FROM_TAG_ARRAY(payload)),
    getPostFromLocalState: () => dispatch(GET_POST_FROM_LOCAL_STATE()),
    submitSuccessfulDispatch: () => dispatch(SUBMIT_SUCCESSFUL()),
    resetTagsState: () => dispatch({type:'RESET_TAGS_STATE'})
});

const programmingLanguages = [
    { title: "Python" },
    { title: "Javascript" },
    { title: "Java" },
    { title: "HTML" },
    { title: "CSS" },
    { title: "C++" },
];

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
