import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as DotMenu } from "../../../Assets/Images/Icons/DotMenu.svg"
import { ReactComponent as Delete } from "../../../Assets/Images/Icons/Delete.svg"

const ContainerCard = styled.div`
   background-color: #FFFCF7;
   display: flex;
   flex-wrap: wrap;
   margin-bottom: 18px;
   width: 866px;
   padding: 26px;
   border-radius: 20px;
   box-shadow: 0px 3px 4px rgba(65, 40, 30, 0.25);
   @media (max-width: 960px) {
    width: 70%;
    padding: 20px;
  }
  @media (max-width: 660px) {
    width: 100%;
    padding: 20px;
  }
`;
const HeaderCard = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   width: 100%;
   margin-bottom: 24px;
`;
const HeaderContainerCard = styled.div`
   display: flex;
   flex-wrap: wrap;
`;
const InfoPostCard = styled.div`
   display: block;
   margin-left: 20px;
`;
const InfoUserCard = styled.div`
   height: 50%;
   margin: 0px;
   font-weight: bold;
   font-size: 16px;
`;
const InfoDateCard = styled.div`
   height: 50%;
   margin: 0px;
   font-size: 12px;
   color: #8B8B85;
`;
const UlNav = styled.ul`
   padding-left: 0px;
   background-color: transparent;
   padding: 2px 8px 6px 8px;
   border-radius: 20px;
   &:hover,:active, :focus{
    background-color: #F6F5F1;
   }
`;
const DropDown = styled.div`
   position: absolute;
   top: inherit;
   width: 130px;
   transform: translateX(-90%);
   background-color: #EFEDE9;
   border: solid 1px #F0BB3C;
   border-radius: 8px;
   padding: 0.5rem;
   overflow: hidden;
`
const MenuItem = styled.button`
   display: flex;
   height: 50px;
   align-items: center;
   background-color: #EFEDE9;
   font-size: 14px;
   font-weight: bold;
   border: none;
   padding: 0px 15px;
   &:hover{
       background-color: #8b8b853b;
       border-radius: 8px;
       color: #EC4D4D;
   }
`;
const SpanIconItem = styled.span`
   margin-right: 10px;
`;

const PostCard = (props) => {
    return (
        <>
            <ContainerCard>
                <HeaderCard>
                    <HeaderContainerCard>
                        <img src={props.img} alt="Avatare" />
                        <InfoPostCard>
                            <InfoUserCard>{props.userName}</InfoUserCard>
                            <InfoDateCard>{props.datePosted}</InfoDateCard>
                        </InfoPostCard>
                    </HeaderContainerCard>
                    <NavbarProfil>
                        <NavItem icon={<DotMenu />}>
                            <DropdownDotMenu />
                        </NavItem>
                    </NavbarProfil>
                </HeaderCard>
                <p>{props.commentPosted}</p>
            </ContainerCard>
        </>
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
        <div>
            <div onClick={() => setOpen(!open)}>
                {props.icon}
            </div>
            {open && props.children}
        </div>
    )
}
function DropdownDotMenu() {
    function DropdownItem(props) {
        return (
            <MenuItem>
                <SpanIconItem>{props.Icon1}</SpanIconItem>
                {props.children}
            </MenuItem>
        )
    }
    return (
        <DropDown>
            <DropdownItem Icon1={<Delete />}> Supprimer</DropdownItem>
        </DropDown>
    )
}

export default PostCard;