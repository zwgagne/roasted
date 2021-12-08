import React, { useContext } from "react";
import styled from "styled-components";
import { ScoreLvl } from "../../Contexts/ScoreLvl";

const AddFriendLink = styled.button`
   display: flex;
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
   align-self: center;
   font-size: 16px;
   font-weight: bold;
   margin-left: 10px;
`

const BtnAddFriend = (props) => {
    const { score, setScore } = useContext(ScoreLvl)

    const ExeFunction = (e) => {
        UpdateScore();
        requestFriend(e)
    }
    const UpdateScore = () => {
        if (document.getElementById("btnFEtat").disabled === false) {
            setScore(score + 2)
            document.getElementById("btnFEtat").disabled = true;
            document.getElementById("NameBtnAddFriend").innerHTML = "Envoyé!"
        }
    }

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
        <AddFriendLink id="btnFEtat" to={props.to} disabled={props.etat} onClick={(e) => ExeFunction(e)}>
            <img src={props.icon} alt="Icon call to action" />
            <NameButton id="NameBtnAddFriend">{props.NameBtn}</NameButton>
        </AddFriendLink>
    )
}

export default BtnAddFriend;