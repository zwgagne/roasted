import React from "react";
import Avatare from "../../../Assets/Images/Icons/Avatar_Icon_Profil.svg";
import styled from "styled-components";

const NewPostFeed = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   background-color: #FFFCF7;
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
const BtnNewPost = styled.button`
   margin-left: 20px;
   background-color: #F6F5F1;
   border-radius: 30px;
   border: 1px solid #EFEDE9;
   color: #8B8B85;
   padding: 12px 32px;
   width: 80%;
   text-align: left;
   @media (max-width: 960px) {
    width: 80%;
  }
  @media (max-width: 440px) {
    width: 80%;
    padding: 20px;
  }
`;


const NewPost = () => {
    return (
        <>
            <NewPostFeed>
                <img src={Avatare} alt="Avatare user" />
                <BtnNewPost id="NewPost">Nouvelle publication</BtnNewPost>
            </NewPostFeed>
        </>
    )
}

export default NewPost;