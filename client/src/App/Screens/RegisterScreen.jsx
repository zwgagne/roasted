import React, { useState } from "react";
import NavHeader from "../Components/Header/NavHeader";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Messages from "../Components/Buttons/Messages";

const MainRegister = styled.main`
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

const FormRegister = styled.form`
   width: 100%;
   margin-top: 24px;
`;
const LabelInputRegister = styled.label`
   width: 100%;
   font-size: 16px;
   font-weight: bold;
`;
const InputRegister = styled.input`
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
const ContainerEditBtnRegister = styled.div`
   margin-top: 52px;
   text-align: center;
   @media (max-width: 960px) {
    margin-top: 20px;
  }
`
const BtnEditInfoRegister = styled.button`
   background-color: #D0C4A5;
   font-size: 18px;
   font-weight: bold;
   font-family: 'Roboto', sans-serif;
   border: none;
   padding: 15px 60px;
   border-radius: 40px;
`;
const ContainerLogin = styled.div`
   width: 100%;
   text-align: center;
   margin-top: 42px;
`;
const LinkToLogin = styled(Link)`
   font-style: 18px;
   font-family: 'Roboto', sans-serif;
   font-weight: bold;
   color: #000000;
`;
const SpanMatchPassword = styled.span`
   font-style: 18px;
   font-family: 'Roboto', sans-serif;
   font-weight: bold;
`;

const RegisterScreen = ({ setAuth }) => {
    const [serverMessage, setServerMessage] = useState([])
    const [inputs, setInputs] = useState({
        email: "",
        name: "",
        password: ""
      })
      
      const {email, name, password} = inputs;
    
      const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value });
      };
    
      const body = {email, name, password};
    
      const onSubmitForm = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("http://localhost:5000/auth/register", {
            method: "POST", 
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)    
          });
          const status = await response.status;
          const res = await response.json()
           setServerMessage([])
          console.log(status)
          if (status !== 200) {
             setAuth(false);
             setServerMessage( arr => [...arr, res])
          } else {
             localStorage.setItem("token", res.token);
             setAuth(true); 
          }
 

        } catch (err) {
          console.error(err.message)
        }
      }
      
      function check_pass() {
            if (document.getElementById('RegisterFieldPassword').value === document.getElementById('RegisterFieldConfirmPassword').value) {
                document.getElementById('MatchConfirmationMessage').innerHTML = ' ok!';
                document.getElementById('MatchConfirmationMessage').style.color= 'green';
            } else {
                document.getElementById('MatchConfirmationMessage').innerHTML = ' !!!';
                document.getElementById('MatchConfirmationMessage').style.color= 'red';
            }
        }

    return (
        <>
            <NavHeader />
            <MainRegister>
                <SectionRegister>
                    <h3>Joignez-vous au Club!</h3>
                    <FormRegister onSubmit={onSubmitForm}>
                        <LabelInputRegister htmlFor="RegisterFieldUserName">Nom d'utilisateur</LabelInputRegister>
                        <InputRegister id="RegisterFieldUserName" name="name" type="text" value={name} onChange={e => onChange(e)} required />

                        <LabelInputRegister htmlFor="RegisterFieldEmail">Adresse courriel</LabelInputRegister>
                        <InputRegister id="RegisterFieldEmail" name="email" type="email" value={email} onChange={e => onChange(e)} required />
                        <Messages serverMessage={serverMessage} />

                        <LabelInputRegister id="labelPw" htmlFor="RegisterFieldPassword">Mot de passe</LabelInputRegister>
                        <InputRegister id="RegisterFieldPassword" name="password" type="password" value={password} onChange={e => onChange(e)} required />

                        <LabelInputRegister htmlFor="RegisterFieldConfirmPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">Confirmer mot de passe</LabelInputRegister>
                        <SpanMatchPassword id="MatchConfirmationMessage"></SpanMatchPassword>
                        <InputRegister id="RegisterFieldConfirmPassword" onKeyUp={check_pass} type="password" required />


                        <ContainerEditBtnRegister>
                            <BtnEditInfoRegister type="submit">Créer mon compte</BtnEditInfoRegister>
                        </ContainerEditBtnRegister>
                    </FormRegister>
                    <ContainerLogin>
                        <p>Déjà membre?</p>
                        <LinkToLogin to="/">Connectez-vous</LinkToLogin>
                    </ContainerLogin>
                </SectionRegister>
            </MainRegister>
        </>
    )
}

export default RegisterScreen;