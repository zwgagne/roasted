import React, { useContext } from "react";
import "../../Assets/scss/index.scss";
import NavHeader from "../Components/Header/NavHeader";
import styled from "styled-components";
import SubUser from "../Components/CallToAction/SubUser";
import { UserInfos } from "../Contexts/UserInfos";

const MainIndex = styled.main`
   display: flex;
   flex-wrap: wrap;
   padding: 36px 66px;
   justify-content: space-between;
   @media (max-width: 960px) {
    padding: 26px;
  }
`;

const IndexScreen = () => {
  const { IsLoggedIn } = useContext(UserInfos)
    return (
        <>
            <NavHeader />
            <MainIndex>
                {!IsLoggedIn && <SubUser />}
            </MainIndex>
        </>
    )
}

export default IndexScreen;