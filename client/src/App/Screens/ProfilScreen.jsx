import React, { useState, useEffect } from "react";
import NavHeader from "../Components/Header/NavHeader";
import styled from "styled-components";
import DefaultAvatar from "../../Assets/Images/Icons/AvatarDefault.svg"

const MainProfil = styled.main`
   display: flex;
   justify-content: center;
   @media (max-width: 960px) {
    padding: 26px;
  }
`;
const SectionRegister = styled.section`
   display: flex;
   justify-content: left;
   flex-wrap: wrap;
   width: 40%;
   @media (max-width: 960px) {
    width: 100%;
  }
`;
const Heading3 = styled.h3`
   width: 100%;
`
const BGAvatar = styled.div`
   background-color: #F7F7F7;
   border: solid 1px #000000;
   width: 100px;
   height: 100px;
   border-radius: 50px;
   display: flex;
   justify-content: center;
   margin-bottom: 24px;
`;
const ImgAvatarSize = styled.img`
   width: 50%;
`;
const FormProfil = styled.form`
   margin-top: 24px;
`;
const LabelInputProfil = styled.label`
   width: 100%;
   font-size: 16px;
   font-weight: bold;
`;
const SpanProfil = styled.span`
width: 100%;
font-size: 16px;
font-weight: bold;
`;
const InputProfil = styled.input`
   width: 100%;
   background-color: transparent;
   border: none;
   border-bottom: solid 1px #000000;
   margin-top: 14px;
   margin-bottom: 24px;
   font-size: 16px;
   color: #8B8B85;
   padding-left: 10px;
   &:active, :hover, :focus{
       border: none;
       border-bottom: solid 1px #EC734D;
   }
`;
const ContainerEditBtnProfil = styled.div`
   margin-top: 176px;
   text-align: center;
   @media (max-width: 960px) {
    margin-top: 106px;
  }
`
const BtnEditInfoProfil = styled.button`
   cursor: pointer;
   background-color: #D0C4A5;
   font-size: 18px;
   font-weight: bold;
   font-family: 'Roboto', sans-serif;
   border: none;
   padding: 15px 60px;
   border-radius: 40px;
`;

const ProfilScreen = ({ setAuth }) => {

    const [inputs, setInputs] = useState({ email: "", name: "" })
    const { name, email } = inputs;

    async function getUserInfo() {
        try {
            const response = await fetch("http://localhost:5000/profile/edit", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            setInputs({
                email: parseRes.user_email,
                name: parseRes.user_name
            });

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])



    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = { name };
            await fetch("http://localhost:5000/profile/edit", {
                method: "POST",
                headers: {
                    token: localStorage.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <>
            <NavHeader />
            <MainProfil>
                <SectionRegister>
                    <Heading3>Profil</Heading3>
                    <BGAvatar>
                        <ImgAvatarSize src={DefaultAvatar} alt="Avatar profil" />
                    </BGAvatar>
                    <FormProfil onSubmit={onSubmitForm}>
                        <LabelInputProfil htmlFor="profilFieldUserName">Nom d'utilisateur</LabelInputProfil>
                        <InputProfil id="profilFieldUserName" name="name" type="text" value={name} onChange={e => onChange(e)} />
                        <SpanProfil>{email}</SpanProfil>
                        <ContainerEditBtnProfil>
                            <BtnEditInfoProfil type="submit">Modifier</BtnEditInfoProfil>
                        </ContainerEditBtnProfil>
                    </FormProfil>
                </SectionRegister>
            </MainProfil>
        </>
    )
}

export default ProfilScreen;