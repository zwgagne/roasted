import React from "react";
import { ReactComponent as AddFriend } from "../../../Assets/Images/Icons/Add_Friend_Icon.svg";
import styled from "styled-components";

const AddFriendLink = styled.button`
   background-color: #EEDDBE;
   padding: 10px 15px;
   border-radius: 40px;
   border: none;
   cursor: pointer;
   &:hover{
       background-color: #f3e9d7;
   }
`

const BtnAddFriend = (props) => {
    return (
        <AddFriendLink to={props.GoTo}>
            <AddFriend />
        </AddFriendLink>
    )
}

export default BtnAddFriend;