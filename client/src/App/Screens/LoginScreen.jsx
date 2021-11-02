import React, { useState } from "react";
import NavHeader from "../Components/Header/NavHeader";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Messages from "../Components/Buttons/Messages";

const MainLogin = styled.main`
   display: flex;
   justify-content: center;
   @media (max-width: 960px) {
    padding: 26px;
  }
`;
const SectionLogin = styled.section`
   display: flex;
   justify-content: left;
   flex-wrap: wrap;
   width: 40%;
   @media (max-width: 960px) {
    width: 100%;
  }
`;
const Headind3 = styled.h3`
   width: 100%;
`;
const FormLogin = styled.form`
   width: 100%;
   margin-top: 24px;
   display: flex;
   flex-direction: column;
`;
const LabelLogin = styled.label`
   width: 100%;
   font-size: 18px;
   font-weight: bold;
`;
const InputLogin = styled.input`
width: 100%;
background-color: transparent;
border: none;
border-bottom: solid 1px #000000;
margin-top: 4px;
margin-bottom: 14px;
padding-top: 10px;
padding-bottom: 10px;
font-size: 16px;
color: #B6B6B6;
padding-left: 10px;
&:active, :hover, :focus{
    border: none;
    border-bottom: solid 1px #E7D0A7;
    outline: none;
    transition: all 0.2s ease;
 &:active, :focus {
   background-color: #FFFCF6;
   color: #211D1A;
   transition: all 0.2s ease;


 }
}
`;
const ContainerEditBtnLogin = styled.div`
   margin-top: 52px;
   text-align: center;
   @media (max-width: 960px) {
    margin-top: 20px;
  }
`
const BtnLogin = styled.button`
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

const ContainerLogin = styled.div`
   width: 100%;
   text-align: center;
   margin-top: 42px;
`;
const LinkToLogin = styled(Link)`
font-size: 18px;
font-family: 'Roboto', sans-serif;
font-weight: bold;
color: #000000;
padding: 10px 30px;
border-radius: 40px;
&:hover {
 // background-color:#FFFCF7;
 transition: all 0.3s ease;
 letter-spacing: 1px;
}
`;

const LoginScreen = ({ setAuth }) => {

   const [serverMessage, setServerMessage ] = useState([])
   const [inputs, setInputs] = useState({
      email: "",
      password: ""
   })    
   const {email, password} = inputs;

   const onChange = (e) => {
     setInputs({...inputs, [e.target.name] : e.target.value });
   };   

   const onSubmitForm = async (e) => {
      e.preventDefault();

      try {
         const body = {email, password};
         const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST", 
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
      });
         const status = await response.status;
         const res = await response.json()
         setServerMessage([])
         if (status !== 200) {
            setAuth(false);
            setServerMessage( arr => [...arr, res])
         } else {
            localStorage.setItem("token", res.token);
            setAuth(true); 
         }
      }  catch (err) {
         console.error(err.message)
      }
   }
   
   
   
    return (
        <>
            <NavHeader />
            <MainLogin>
                <SectionLogin>
                    <Headind3>Rebonjour!</Headind3>
                    <FormLogin onSubmit={onSubmitForm}>
                        <Messages serverMessage={serverMessage} />
                        <LabelLogin htmlFor="LoginEmail">Adresse courriel</LabelLogin>
                        <InputLogin type="email" id="LoginEmail" name="email" placeholder="votre@email.com" value={email} onChange={e => onChange(e)} required />

                        <LabelLogin htmlFor="LoginPassword">Mot de passe</LabelLogin>
                        <InputLogin type="password" id="LoginPassword" name="password" placeholder="••••••••••••••" value={password} onChange={e => onChange(e)} required />
                        <ContainerEditBtnLogin>
                            <BtnLogin type="submit">Connexion</BtnLogin>
                        </ContainerEditBtnLogin>
                    </FormLogin>
                    <ContainerLogin>
                        <p>Vous n’avez pas encore de compte?</p>
                        <LinkToLogin to="/register">Inscrivez-vous!</LinkToLogin>
                    </ContainerLogin>
                </SectionLogin>
            </MainLogin>
        </>
    )
}

export default LoginScreen;