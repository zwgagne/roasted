import React from "react";
import "../../Assets/scss/index.scss";
import NavHeader from "../Components/Header/NavHeader";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FrontImg from "../../Assets/Images/Img/FrontImage.jpg"

const MainIndex = styled.main`
   display: flex;
   flex-wrap: wrap;
   padding: 36px 66px;
   justify-content: space-between;
   @media (max-width: 960px) {
    padding: 26px;
  }
`;

const CallActionLeft = styled.section`
   display: flex;
   flex-wrap: wrap;
   justify-content: left;
   width: 25%;
   @media (max-width: 960px) {
    width: 100%;
  }
`;

const Heading1 = styled.h1`
   margin-bottom: 32px;
   @media (max-width: 960px) {
    font-style: 44px;
  }
`;

const SubTextCallAction = styled.p`
   width: 70%;
   margin-bottom: 48px;
   @media (max-width: 960px) {
    width: 90%;
  }
`;
const BtnRegister = styled(Link)`
   font-family: 'Roboto', sans-serif;
   font-weight: bold;
   font-size: 18px;
   background-color: #E7D0A7;
   color: #000000;
   text-decoration: none;
   padding: 15px 64px;
   border-radius: 40px;
   @media (max-width: 960px) {
    padding: 15px 80px;
  }
`;

const FrontImageRight = styled.section`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   width: 50%;
   @media (max-width: 960px) {
    width: 100%;
    margin-top: 50px;
  }
`;
const ImageSize = styled.article`
   width: 100%;
`;
const ImageFront = styled.img`
   width: 90%;
   @media (max-width: 960px) {
    width: 100%;
  }
`;

const IndexScreen = () => {

    return (
        <>
            <NavHeader />
            <MainIndex>
                <CallActionLeft>
                    <article>
                        <Heading1>Partagez votre amour du Café</Heading1>
                        <SubTextCallAction>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu commodo tincidunt phasellus sed.</SubTextCallAction>
                        <BtnRegister to="/register">Rejoignez le Club!</BtnRegister>
                    </article>
                </CallActionLeft>
                <FrontImageRight>
                    <ImageSize>
                        <ImageFront src={FrontImg} alt="Image communication café" />
                    </ImageSize>
                </FrontImageRight>
            </MainIndex>
        </>
    )
}

export default IndexScreen;