import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FrontImg from "../../../Assets/Images/Img/FrontImage.jpg"

const CallActionLeft = styled.section`
   display: flex;
   flex-wrap: wrap;
   justify-content: left;
   width: 33%;
   @media (max-width: 1300px) {
    width: 50%;
  }
   @media (max-width: 960px) {
    width: 100%;
  }
`;

const Heading1 = styled.h1`
   margin-bottom: 32px;
   @media (max-width: 960px) {
    font-size: 44px;
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
background-color: #E7D0A7;
text-decoration: none;
font-size: 18px;
font-weight: bold;
font-family: 'Roboto', sans-serif;
border: none;
padding: 15px 60px;
border-radius: 40px;
&:hover {
  background-color: #EEDDBE;
  box-shadow: 0px 3px 4px rgba(65, 40, 30, 0.25);
  transition: all 0.2s ease;
}
&:active {
 background: #E7D0A7;
 box-shadow: inset 1px 2px 10px rgba(65, 40, 30, 0.15);
 transition: all 0.2s ease;
}
&:disabled {
 background: #EAE8E3;
 color: #8B8B85;
}
&:visited {
  color: inherit;
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

const SubUser = () => {
    return (
        <>
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
        </>
    )
}

export default SubUser;