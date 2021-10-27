import React from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";
import ProfilIcon from "../../../Assets/Images/Icons/Avatar_Icon_Profil.svg"

const Avatar = styled.div`
   margin-right: 30px;
   display: flex;
   align-self: center;
`

const ProfilIcons = () => {
    return (
        <>
            <Avatar>
                <Link to="/profil">
                    <img src={ProfilIcon} alt="Logo Roasted Coffe club" />
                </Link>
            </Avatar>
        </>
    )
}

export default ProfilIcons;