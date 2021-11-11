import React, { useState } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";
import { ReactComponent as UserOptionIcon } from "../../../Assets/Images/Icons/UserOption.svg"
import { ReactComponent as Avatare } from "../../../Assets/Images/Icons/Avatar_Icon_Profil.svg";

const UserSection = styled.div`
   margin-right: 30px;
   display: flex;
   align-self: center;
   cursor: pointer;
   padding:  0px 15px;
   border-radius: 50px;
   &:hover{
       box-shadow: 0px 3px 4px rgba(65, 40, 30, 0.25);
       background-color: #EEDDBE;
   }
   &:active{
       box-shadow: inset 1px 2px 10px rgba(65, 40, 30, 0.15);
   }
`;
const UlNav = styled.ul`
   padding-left: 0px;
`;
const DropDown = styled.div`
   position: absolute;
   top: 94px;
   right: -280px;
   width: 357px;
   transform: translateX(-95%);
   background-color: #FFFCF7;
   box-shadow: 0px 3px 4px rgba(65, 40, 30, 0.25);
   border-radius: 8px;
   padding: 1rem;
   overflow: hidden;
`;
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
   &:hover{
       background-color: #FFF6E5;
       border-radius: 8px;
   }
`;
const UserNameFriends = styled.span`
   display: flex;
   margin-left: 15px;
   font-weight: bold;
`;
const UserNameLink = styled(Link)`
   color: #000000;
   text-decoration: none;
`;

const UserOption = () => {
    return (
        <>
            <UserSection>
                <SectionUsers>
                    <UserFriend icon={<UserOptionIcon />}>
                        <DropdownAllFriend />
                    </UserFriend>
                </SectionUsers>
            </UserSection>
        </>
    )
}
function SectionUsers(props) {
    return (
        <div>
            <UlNav>{props.children}</UlNav>
        </div>
    );
}
function UserFriend(props) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div type="search" onClick={() => setOpen(!open)}>
                {props.icon}
            </div>
            {open && props.children}
        </div>
    );
}

function DropdownAllFriend() {
    function DropdownUser(props) {
        return (
            <>
                <ResultAllFriends>
                    <Link to={props.linkTo}>{props.Icon1}</Link>
                    {props.children}
                    <UserNameFriends>
                        <UserNameLink to={props.linkTo}>{props.UserNameFriend}</UserNameLink>
                    </UserNameFriends>
                    <span>{props.AddFriend}</span>
                </ResultAllFriends>
            </>
        )
    }
    return (
        <>
            <DropDown>
                <TitleFriends>Bean Duddies</TitleFriends>
                <DropdownUser linkTo="/profil" Icon1={<Avatare />} UserNameFriend="Edouard_Koffee" />
                <DropdownUser linkTo="/profil" Icon1={<Avatare />} UserNameFriend="Edouard_Koffee" />
                <DropdownUser linkTo="/profil" Icon1={<Avatare />} UserNameFriend="Edouard_Koffee" />
                <DropdownUser linkTo="/profil" Icon1={<Avatare />} UserNameFriend="Edouard_Koffee" />
                <DropdownUser linkTo="/profil" Icon1={<Avatare />} UserNameFriend="Edouard_Koffee" />
                <DropdownUser linkTo="/profil" Icon1={<Avatare />} UserNameFriend="Edouard_Koffee" />
                <DropdownUser linkTo="/profil" Icon1={<Avatare />} UserNameFriend="Edouard_Koffee" />
                <DropdownUser linkTo="/profil" Icon1={<Avatare />} UserNameFriend="Edouard_Koffee" />
            </DropDown>
        </>
    )
}

export default UserOption;