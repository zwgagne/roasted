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

    async function requestFriend(e) {
        e.preventDefault();
    try {
        const friendName = props.to;
        await fetch(`http://localhost:5000/friends/send-request/${friendName}`, {
            method: "GET",
            headers: {
                token: localStorage.token,
                "Content-Type": "application/json"
            },
    });
    } catch (err) {
        console.log(err.message)
    }


    }

    return (
        <AddFriendLink to={props.to} onClick={(e) => requestFriend(e)}>
            <img src={props.icon} alt="Icon call to action" />
            <NameButton>{props.NameBtn}</NameButton>
        </AddFriendLink>
    )
}

export default BtnAddFriend;