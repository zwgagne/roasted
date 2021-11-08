import React, { useState } from "react";
import SearchIcon from "../../../Assets/Images/Icons/Search_Icon.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {ReactComponent as Avatare} from "../../../Assets/Images/Icons/Avatar_Icon_Profil.svg";
import BtnAddFriend from "./AddFriend";

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
`;
const DropDown = styled.div`
   position: absolute;
   top: 85px;
   right: -145px;
   width: 270px;
   transform: translateX(-95%);
   background-color: #FFFCF7;
   box-shadow: 0px 11px 20px rgba(65, 40, 30, 0.15), 0px 3px 4px rgba(65, 40, 30, 0.2), 0px 6px 10px rgba(65, 40, 30, 0.2);
   border-radius: 8px;
   padding: 1rem;
   overflow: hidden;
`;
const SpanIconUser = styled.span`
   margin-right: 10px;
`;
const SpanAddFriend = styled.span`
   display: flex;
   justify-content: right;
   margin-left: 15px;
   width: 70%;
`

const SearchUsers = () => {
    return (
        <>
            <SectionUsers>
                <NavUser>
                    <DropdownSearchUser />
                </NavUser>
            </SectionUsers>
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
function NavUser(props) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <FormSearch>
                <IconSearch src={SearchIcon} onClick={() => setOpen(!open)} />
                <InputSearch type="search" onClick={() => setOpen(!open)} />
            </FormSearch>
            {open && props.children}
        </div>
    );
}
function DropdownSearchUser() {
    function DropdownUser(props) {
        return (
            <>
                <ResultUsers to={props.linkTo}>
                    <SpanIconUser>{props.Icon1}</SpanIconUser>
                    {props.children}
                    <SpanIconUser>{props.AddFriend}</SpanIconUser>
                </ResultUsers>
            </>
        )
    }
    return (
        <DropDown>
            <DropdownUser linkTo="/profil" Icon1={<Avatare />} > Edouard_Koffee <SpanAddFriend><BtnAddFriend GoTo="/" /></SpanAddFriend></DropdownUser>
            <DropdownUser linkTo="/profil" Icon1={<Avatare />} > Edouard_Koffee <SpanAddFriend><BtnAddFriend GoTo="/" /></SpanAddFriend></DropdownUser>
        </DropDown>
    )
}

export default SearchUsers;