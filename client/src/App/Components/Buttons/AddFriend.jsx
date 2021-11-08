import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AddFriend } from "../../../Assets/Images/Icons/Add_Friend_Icon.svg";
import styled from "styled-components";

const AddFriendLink = styled(Link)`
   background-color: #EEDDBE;
   padding: 10px 15px;
   border-radius: 40px;
`

const BtnAddFriend = (props) => {
    return (
        <AddFriendLink to={props.GoTo}>
            <AddFriend />
        </AddFriendLink>
    )
}

export default BtnAddFriend;