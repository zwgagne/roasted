import React, { useState, useContext } from "react";
import Avatare from "../../../Assets/Images/Icons/Avatar_Icon_Profil.svg";
import styled from "styled-components";
import { LightBoxNewPost } from "../../Contexts/LightBoxNewPost";

const LightBox = styled.div`
   position: absolute;
   z-index: 9999;
   background-color: #FFFCF6;
   display: flex;
   flex-wrap: wrap;
   justify-content: left;
   width: 400px;
   padding: 26px;
   top: 30%;
   border-radius: 20px;
   @media (max-width: 503px) {
    width: 70%;
  }
`;
const LBFirstLing = styled.div`
   display: flex;
`;
const UserNameLB = styled.p`
   margin-left: 20px;
`;
const BtnCloseLB = styled.button`
   border: none;
   background-color: transparent;
   font-weight: bold;
   font-size: 19px;
   border-radius: 50px;
   padding: 0px 10px;
   height: 40px;
   width: 40px;
   margin-left: 170px;
   @media (max-width: 503px) {
    margin-left: 45px;
    text-align: right;
  }
   &:hover{
       background-color: #F6F5F1;
   }
`;
const FormLB = styled.form`
   width: 100%;
`;
const CommentsText = styled.textarea`
   background-color: transparent;
   border: none;
   resize: none;
   width: 100%;
   height: 160px;
   outline: none;
   color: #8B8B85;
   font-size: 18px;
`;
const ContainerBtnShareLB = styled.div`
   width: 100%;
   text-align: center;
`;
const BtnShareLB = styled.button`
   background-color: #EAE8E3;
   color: #8B8B85;
   font-size: 18px;
   font-weight: bold;
   padding: 15px 60px;
   border: none;
   border-radius: 40px;
   cursor: pointer;
`;

const AddPostFeed = () => {
    const { setShowLB } = useContext(LightBoxNewPost);
    const [inputs, setInputs] = useState({ content: "" });
    const { content } = inputs;
    const reload = () => {
        setTimeout(action, 1)
        function action () {
            window.location.reload();
        }
    }
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value });
      };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (content === ""){
            return
        }

        try {
            const body = { content };
            await fetch("http://localhost:5000/posts/create", {
                method: "POST",
                headers: {
                    token: localStorage.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            setShowLB(false)
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <LightBox>
                <LBFirstLing>
                    <img src={Avatare} alt="Avatare user" />
                    <UserNameLB>Edouard_Koffee</UserNameLB>
                    <BtnCloseLB onClick={() => setShowLB(false)} >X</BtnCloseLB>
                </LBFirstLing>
                <FormLB onSubmit={onSubmitForm}>
                    <CommentsText id="postContent" name="content" onChange={e => onChange(e)} value={content} placeholder="| Que voulez-vous partager?" />
                    <ContainerBtnShareLB>
                        <BtnShareLB onClick={() => reload()} type="submit" >Publier</BtnShareLB>
                    </ContainerBtnShareLB>
                </FormLB>
            </LightBox>
        </>
    )
}

export default AddPostFeed;