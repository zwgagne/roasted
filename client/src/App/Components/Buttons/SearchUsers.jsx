import React, { useState, useEffect } from "react";
import SearchIcon from "../../../Assets/Images/Icons/Search_Icon.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Avatare } from "../../../Assets/Images/Icons/Avatar_Icon_Profil.svg";
import BtnAddFriend from "./AddFriend";
import AddFriendIcon from "../../../Assets/Images/Icons/Add_Friend_Icon.svg"

const InputSearch = styled.input`
   width: 300px;
   height: 50px;
   margin-right: 30px;
   background-color: #FFFCF6;
   box-shadow: inset 1px 2px 10px rgba(65, 40, 30, 0.15);
   border-radius: 50px;
   border: none;
   font-size: 16px;
   padding: 13px 13px 13px 50px;
   @media (max-width: 796px) {
       width: 350px;
    }
`;

const FormSearch = styled.form`
   display: flex;
   position: inherit;
`;
const IconSearch = styled.img`
   width: 25px;
   margin: 12px 8px 12px 15px;
   position: absolute;  
`;
const UlNav = styled.ul`
   padding-left: 0px;
`;
const ResultUsers = styled(Link)`
   display: flex;
   justify-content: space-between;
   height: 50px;
   align-items: center;
   color: #000000;
   font-size: 14px;
   font-weight: bold;
   text-decoration: none;
   padding: 10px 15px;
   border-bottom: solid 2px;
   &:hover{
       background-color: #FFF6E5;
       border-radius: 8px;
   }
`;
const DropDown = styled.div`
   position: absolute;
   top: 85px;
   right: -84px;
   width: 270px;
   transform: translateX(-95%);
   background-color: #FFFCF7;
   box-shadow: 0px 11px 20px rgba(65, 40, 30, 0.15), 0px 3px 4px rgba(65, 40, 30, 0.2), 0px 6px 10px rgba(65, 40, 30, 0.2);
   border-radius: 8px;
   padding: 1rem;
   overflow: hidden;
   @media (max-width: 796px) {
       position: inherit;
       top: 0px;
       right: 0px;
       width: 80%;
       transform: translateX(0%);
    }
`;
const SpanIconUser = styled.span`
   margin-right: 10px;
   @media (max-width: 796px) {
       
    }
`;
const SpanAddFriend = styled.span`
   display: flex;
   justify-content: right;
   margin-left: 2px;
   width: 70%;
   @media (max-width: 796px) {
       display: none;
    }
`;
const DivContainer = styled.div`
   @media (max-width: 796px) {

  }
`;


const SearchUsers = () => {
    const [usernames, setUsernames] = useState([]);
    const [open, setOpen] = useState(false);
    async function fetchFriends(e) {
        const userName = e.target.value;
        if (userName !== '') {
            try {
                const body = {friendName : userName };
                const response = await fetch(`http://localhost:5000/friends/search-friend/${userName}`, {
                    method: "GET",
                    header: {"Content-Type": "application/json"},
                });
                const res = await response.json();
                setUsernames(res.usernames)
                setOpen(true)
            } catch (err) {
                console.log(err.message)
            }
        }
    }
    return (
        <>
            <SectionUsers>
                <NavUser 
                onKeyUp={(e) => fetchFriends(e)} 
                open={open} 
                onIconClick={() => setOpen(!open)} 
                onInputClick={() => setOpen(false)}
                >
                    <DropdownSearchUser usernames={usernames}/>
                </NavUser>
            </SectionUsers>
        </>
    )
}

function SectionUsers(props) {
    return (
        <DivContainer>
            <UlNav>{props.children}</UlNav>
        </DivContainer>
    );
}
function NavUser(props) {
    return (
        <div>
            <FormSearch>
                <IconSearch src={SearchIcon} onClick={props.onIconClick} />
                <InputSearch name="userName" type="search" onKeyUp={props.onKeyUp} onClick={props.onInputClick} />
            </FormSearch>
            {props.open && props.children}
        </div>
    );
}
function DropdownSearchUser(props) {
    function DropdownUser(props) {
        return (
            <>
                <ResultUsers to={props.linkTo}>
                    <SpanIconUser>{props.Icon1}</SpanIconUser>
                    {props.children}
                    <SpanIconUser>{props.AddFriend}</SpanIconUser>
                    <SpanAddFriend>
                        <BtnAddFriend to={props.GoTo} icon={AddFriendIcon} />
                    </SpanAddFriend>
                </ResultUsers>
            </>
        )
    }
    return (
        <DropDown>
            {props.usernames.map((username) => (
                <DropdownUser linkTo="/profil" Icon1={<Avatare />} GoTo="/profil">
                 {username.user_name}
                </DropdownUser>
            ))}
        </DropDown>
    )
}

export default SearchUsers;