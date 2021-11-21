import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//import { ReactComponent as UserOptionIcon } from "../../../Assets/Images/Icons/UserOption.svg"
import { ReactComponent as Avatare } from "../../../Assets/Images/Icons/Avatar_Icon_Profil.svg";
import BtnAcceptFR from "./AcceptFR";
import BtnRefuseFR from "./RefuseFR";


const TitleFriends = styled.div`
   text-align: center;
   border-bottom: solid 2px #EEDDBE;
   font-family: Inter, sans-serif;
   font-size: 16px;
   font-weight: bold;
   padding-bottom: 15px;
   margin: 17px 0px;
   text-transform: uppercase;
`;
const ResultAllFriends = styled.div`
   padding-left: 25px;
   margin: 10px 0px;
   display: flex;
   align-items: center;
   padding: 10px 15px;
   overflow: hidden;
   &:hover{
       background-color: #FFF6E5;
       border-radius: 8px;
   }
`;
const UserNameFriends = styled.span`
   margin-left: 15px;
   font-weight: bold;
   display: block;
   word-wrap: break-word;
   overflow: hidden;
`;
const SpanBtnActionFR = styled.div`
   width: 60%;
   display: flex;
   justify-content: right;
`;
const UserNameLink = styled(Link)`
   color: #000000;
   text-decoration: none;
`;

const FriendRequest = (props) => {


    function DropdownUser(props) {
        return (
            <>
                <ResultAllFriends>
                    <Link to={props.linkTo}>{props.Icon1}</Link>
                    {props.children}
                    <UserNameFriends>
                        <UserNameLink to={props.linkTo}>{props.UserNameFriend}</UserNameLink>
                    </UserNameFriends>
                    <SpanBtnActionFR>
                        <BtnAcceptFR afr={props.UserNameFriend} />
                        <BtnRefuseFR afr={props.UserNameFriend} />
                    </SpanBtnActionFR>
                </ResultAllFriends>
            </>
        )
    }
    return (
        <>
            <TitleFriends>Buddies request</TitleFriends>
            {props.pendingFriends.map((pending) => (
                    <DropdownUser linkTo="/public" Icon1={<Avatare />} UserNameFriend={pending.user_name} value={pending.user_name} key={pending.user_id} />
                ))}
        </>
    )
}

export default FriendRequest;