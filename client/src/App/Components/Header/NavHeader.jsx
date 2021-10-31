import React, { useContext } from "react";
import styled from "styled-components";
import LogoRCC from "../Buttons/LogoRCC";
import ProfilIcons from "../Buttons/ProfilIcon";
import MenuH from "../Buttons/MenuH";
import { UserInfos } from "../../Contexts/UserInfos";

const ContainerNav = styled.nav`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   padding: 22px 16px 18px 66px;
   @media (max-width: 960px) {
    padding: 22px 22px 18px 26px;
  }
`;
const PositionNav = styled.div`
   display: flex;
`

const NavHeader = () => {
    const { IsLoggedIn } = useContext(UserInfos)
    return (
        <ContainerNav>
            <LogoRCC />
            <PositionNav>
                {IsLoggedIn && <ProfilIcons />}
                <MenuH />
            </PositionNav>
        </ContainerNav>
    )
}

export default NavHeader;