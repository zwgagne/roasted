import React, { useState, useContext } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";
import { UserInfos } from "../../Contexts/UserInfos";
import { ReactComponent as Logout } from "../../../Assets/Images/Icons/Logout.svg";
import { ReactComponent as MyProfil } from "../../../Assets/Images/Icons/MyProfil.svg";
import { ReactComponent as Login } from "../../../Assets/Images/Icons/Login.svg";
import { ReactComponent as SearchIcon } from "../../../Assets/Images/Icons/Search_Icon.svg";
import { ReactComponent as Avatare } from "../../../Assets/Images/Icons/Avatare2.svg";
import SearchUsers from "../Buttons/SearchUsers";
import UserOptionMobil from "./UserOptionMobil"
import BtnMenu from "./BtnMenu";

const BTNMenuHam = styled.div`
   padding: 10px 15px;
   border-radius: 50px;
   width: 50%;
   cursor: pointer;
   align-self: center;
   border-radius: 50px;
   &:hover{
       box-shadow: 0px 3px 4px rgba(65, 40, 30, 0.25);
       background-color: #EEDDBE;
   }
   &:active{
       box-shadow: inset 1px 2px 10px rgba(65, 40, 30, 0.15);
   }
`;
const ItemNavUser = styled.div`
   list-style-type: none;
`
const ItemNavLink = styled.div`
   text-decoration: none;
`
const UlNav = styled.ul`
   padding-left: 0px;
`
const DropDown = styled.div`
   position: absolute;
   top: 80px;
   right: -80px;
   width: 200px;
   transform: translateX(-40%);
   background-color: #2F2F2C;
   border: solid 1px #F0BB3C;
   border-radius: 8px;
   padding: 1rem;
   overflow: hidden;
   @media (max-width: 796px) {
       right: -40px;
       transform: translateX(-18%);
       width: 80%;
    }
`
const MenuItem = styled(Link)`
   display: flex;
   height: 50px;
   align-items: center;
   color: #FFF6E5;
   text-decoration: none;
   font-size: 18px;
   padding: 0px 15px;
   &:hover{
       background-color: #444440;
       border-radius: 8px;
   }
`;
const SpanIconAvatare = styled.span`
   height: 50px;
`;
const SpanIconItem = styled.span`
   margin-right: 10px;
`;
const DisplayMobil = styled.span`
   @media (min-width: 797px) {
       display: none;
    }
`;

const MenuH = () => {
    return (
        <BTNMenuHam>
            <NavbarProfil>
                <NavItem icon={<BtnMenu />} >
                    <DropdownProfilMenu />
                </NavItem>
            </NavbarProfil>
        </BTNMenuHam>
    )
}


function NavbarProfil(props) {
    return (
        <nav>
            <UlNav>{props.children}</UlNav>
        </nav>
    );
}
function NavItem(props) {
    const [open, setOpen] = useState(false);
    return (
        <ItemNavUser>
            <ItemNavLink onClick={() => setOpen(!open)}>
                {props.icon}
            </ItemNavLink>
            {open && props.children}
        </ItemNavUser>
    );
}
function DropdownProfilMenu() {
    const { IsLoggedIn, setIsLoggedIn } = useContext(UserInfos)
    const [open, setOpen] = useState(false);
    const [openF, setOpenF] = useState(false);
    const logout = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }
    function DropdownItem(props) {
        return (
            <>
                <MenuItem to={props.linkTo}>
                    <SpanIconAvatare>{props.Avatare}</SpanIconAvatare>
                    <SpanIconItem>{props.Icon1}</SpanIconItem>
                    {props.children}
                    <SpanIconItem>{props.Icon2}</SpanIconItem>
                </MenuItem>
            </>
        )
    }
    return (
        <>
            <DropDown>
                {IsLoggedIn && <DropdownItem linkTo="/profil" Avatare={<Avatare />}>Mon Profil</DropdownItem>}
                {!IsLoggedIn && <DropdownItem linkTo="/login" Icon1={<Login />}> Connexion</DropdownItem>}
                <DisplayMobil>
                    {IsLoggedIn && <DropdownItem linkTo="?" Icon1={<MyProfil />}><span onClick={() => setOpenF(!openF)}>Bean Buddies</span></DropdownItem>}
                    {openF && <UserOptionMobil />}

                    {IsLoggedIn && <DropdownItem linkTo="?" Icon1={<SearchIcon />}><span onClick={() => setOpen(!open)}>Recherche</span></DropdownItem>}
                    {open && <SearchUsers />}
                </DisplayMobil>
                {IsLoggedIn && <DropdownItem linkTo="/" Icon1={<Logout />}><span onClick={e => logout(e)}>Déconnexion</span> </DropdownItem>}
            </DropDown>
        </>
    )
}

export default MenuH;