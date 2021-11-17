import React from "react";
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
`;
const NameButton = styled.span`
   font-size: 16px;
   font-weight: bold;
   margin-left: 10px;
`

const BtnAddFriend = (props) => {
    return (
        <AddFriendLink to={props.GoTo}>
            <img src={props.icon} alt="Icon call to action" />
            <NameButton>{props.NameBtn}</NameButton>
        </AddFriendLink>
    )
}

export default BtnAddFriend;