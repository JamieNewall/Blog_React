import React from 'react';
import styled from 'styled-components'
import AccountCircle from '@material-ui/icons/AccountCircle'
import {common} from '@material-ui/core/colors'

const StyledDiv = styled.div`
width: 100%;
height: 100px;
background-color: #AABD8C;
display: flex;
justify-content: flex-end;
align-items: center;
`



const Nav = (props) => (
    <StyledDiv>
        <AccountCircle style={{color:common.white, marginRight: "1rem", fontSize:"3rem"}} />

    </StyledDiv>
);

export default Nav;