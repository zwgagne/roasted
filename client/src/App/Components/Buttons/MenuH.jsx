import React from "react";
import styled from "styled-components"
import MenuHamberger from "../../../Assets/Images/Icons/MenuHamberger.svg"

const BTNMenuHam = styled.button`
   border: none;
   background-color: transparent;
   cursor: pointer;
   border: solid 1px transparent;
   border-radius: 5px;
   padding: 5px;
   &:hover{
       border: solid 1px #000000
   }
`;

const MenuH = () => {
    return (
        <BTNMenuHam>
            <img src={MenuHamberger} alt="Logo Roasted Coffe club" />
        </BTNMenuHam>
    )
}

export default MenuH;