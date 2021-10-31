import React, { useState, useContext } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";
import { UserInfos } from "../../Contexts/UserInfos";
import { ReactComponent as MenuIcon } from "../../../Assets/Images/Icons/MenuHamberger.svg";
//import { ReactComponent as CloseMenu } from "../../../Assets/Images/Icons/close.svg";
import { ReactComponent as Logout } from "../../../Assets/Images/Icons/Logout.svg";
import { ReactComponent as Login } from "../../../Assets/Images/Icons/Login.svg";
import { ReactComponent as HomePage } from "../../../Assets/Images/Icons/HomePage.svg";

const BTNMenuHam = styled.div`
   padding: 7px 0px;
   cursor: pointer;
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
   top: 75px;
   right: -80px;
   width: 200px;
   transform: translateX(-40%);
   background-color: #2F2F2C;
   border: solid 1px #F0BB3C;
   border-radius: 8px;
   padding: 1rem;
   overflow: hidden;
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
`
const SpanIconItem = styled.span`
   margin-right: 10px;
`

const MenuH = () => {
    return (
        <BTNMenuHam>
            <NavbarProfil>
                <NavItem icon={<MenuIcon />} >
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
    const logout = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }
    function DropdownItem(props) {
        return (
            <>
                <MenuItem to={props.linkTo}>
                    <SpanIconItem>{props.Icon1}</SpanIconItem>
                    {props.children}
                    <SpanIconItem>{props.Icon2}</SpanIconItem>
                </MenuItem>
            </>
        )
    }
    return (
        <DropDown>
            <DropdownItem linkTo="/" Icon1={<HomePage />}> Accueil</DropdownItem>
            {!IsLoggedIn && <DropdownItem linkTo="/login" Icon1={<Login />}> Connexion</DropdownItem>}
            {IsLoggedIn && <DropdownItem Icon1={<Logout />}><span onClick={e => logout(e)}>Déconnexion</span> </DropdownItem>}
        </DropDown>
    )
}

export default MenuH;