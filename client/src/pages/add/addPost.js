import React, {createRef} from 'react';
import {ADD_POST_TO_STATE} from '../../redux/actions'
import {ADD_TITLE_TO_STATE} from '../../redux/actions'
import {ADD_TAGS_TO_STATE} from '../../redux/actions'
import {ADD_TAG_INPUT_TO_STATE} from '../../redux/actions'
import {ADD_TAG_INPUT_SELECTED_TO_STATE} from '../../redux/actions'
import {REMOVE_TAG_FROM_TAG_ARRAY} from '../../redux/actions'

import {makeStyles} from "@material-ui/core/styles";
import {connect} from 'react-redux'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import CssBaseLine from '@material-ui/core/CssBaseline'
import {Label} from "@material-ui/icons";
import Autocomplete from '@material-ui/lab/Autocomplete';

const {useRef} = require("react");

const useStyles = makeStyles( (theme) => ({
    inputPost: {
        width: '80%',
        marginTop: '0'


    },
    formContainer:{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '0.5rem',
        alignContent: 'center',


    },
    wordCount: {
        marginTop: '10px',
        color: 'red'
    },
    title: {
        marginTop: '1rem'
    },
    chip: {
        width: ''
    },
    chipContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5)
        },
        marginTop: '2rem',
        width: '30%'
    },
    tagInput: {
        width: '20%'
    },
    autocompleteInput: {

}
}))



const AddPost = ( {props,currentPostWordCount, postText, addTagsToLocalState, addPostToLocalState, titleText, addTitleToLocalState,
                      tagInputValue, addTagInputToLocalState, tagsArray, tagInputValueSelected, addTagInputSelectedToLocalState, deleteTagFromState}) => {

    const classes = useStyles()

    let refContainer = {}
    let globalRef = useRef([])
    if (globalRef.current.length !== tagsArray.length) {
        globalRef.current = Array(tagsArray.length).fill().map((_, i) => globalRef.current[i] || createRef())
        console.log(globalRef.current)
    }
    // tagsArray.map(item =>   {
    //
    //  let ref = globalRef[item]
    //
    //   refContainer[item] = ref
    //
    // })

    // console.log(refContainer)


    const chipRef = useRef(null)

    let handleChange = (e) => {
        e.preventDefault()

        let value = e.target.value
        console.log(e.target.id)

        switch(e.target.id) {
            case 'post-body':

                addPostToLocalState(value)
                return
            case 'post-title':


                addTitleToLocalState(value)
                return


            default:
                // console.log(e.target.defaultValue)
        }

    }

    let handleTagChange = (event, newValue) => {

        addTagInputToLocalState(newValue.title)
        addTagsToLocalState(newValue.title)


    }

    let handleTagSelectedChange = (event, newInputValue) => {
        addTagInputSelectedToLocalState(newInputValue)

    }





    function handleClick() {

    }

    function handleDelete(e,index) {
        let strToRemove = globalRef.current[index].current.children[0].textContent

        deleteTagFromState(strToRemove)

        // let selectedString;
        // deleteTagFromState(selectedString)


    }



    return(
        <Container>
        <CssBaseLine/>

        <form className={classes.formContainer}>
            <h2 className={classes.title}>Post Title</h2>
            <TextField className={classes.inputPost}
                       onChange={handleChange}
                       value={titleText}
                       id={'post-title'}
            />

            <h2 className={classes.title}>Post Body</h2>
            <TextField
            className={classes.inputPost}
            id={'post-body'}
            label={"Add Post Here...."}
            multiline={true}
            rowsMax={30}
            onChange={handleChange}
            value={postText}
            />
            <div className={classes.wordCount}>{`${currentPostWordCount} Words`}</div>

            <h3 className={classes.title}>Tags</h3>


            <Autocomplete
                id="tags"
                value={tagInputValue}
                onChange={handleTagChange}
               inputValue={tagInputValueSelected}
                onInputChange={handleTagSelectedChange}
                options={programmingLanguages}
                className={'tags'}



                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}

                renderInput={(params) => <TextField {...params} label="Tags" variant="outlined" />}
            />




            <div className={classes.chipContainer}>

            <>

            {

                tagsArray.map((item, i) => {

                    return (
                        <Chip
                        className={classes.chip}
                        index={i}
                        label={item}
                        ref={globalRef.current[i]}
                        onClick={handleClick}
                        onDelete={(e) => handleDelete(e,i)}
                        />
                    )
                })
            }




                </>

            </div>

        </form>


    </Container>
    )
};





const mapStateToProps = (state) => ({
    postText: state.postText,
    currentPostWordCount: state.currentPostWordCount,
    titleText: state.titleText,
    tagInputValue: state.tagInputValue,
    tagsArray: state.tagsArray,
    tagInputValueSelected: state.tagInputValueSelected

})

const mapDispatchToProps = (dispatch) => ({

    addPostToLocalState : (payload) => dispatch(ADD_POST_TO_STATE(payload)),
    addTitleToLocalState : (payload) => dispatch(ADD_TITLE_TO_STATE(payload)),
    addTagsToLocalState: (payload) => dispatch(ADD_TAGS_TO_STATE(payload)),
    addTagInputToLocalState: (payload) => dispatch(ADD_TAG_INPUT_TO_STATE(payload)),
    addTagInputSelectedToLocalState: (payload) => dispatch(ADD_TAG_INPUT_SELECTED_TO_STATE(payload)),
    deleteTagFromState: (payload) => dispatch(REMOVE_TAG_FROM_TAG_ARRAY(payload))
})

const programmingLanguages = [
    {title:"Python"},
    {title:"Javascript"},
    {title:"Java"},
    {title: "HTML"},
    {title: "CSS"},
    {title: "C++"},

]


export default connect(mapStateToProps, mapDispatchToProps)(AddPost);