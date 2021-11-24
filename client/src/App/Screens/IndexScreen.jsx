import React, { useContext, useState, useEffect } from "react";
import "../../Assets/scss/index.scss";
import NavHeader from "../Components/Header/NavHeader";
import styled from "styled-components";
import SubUser from "../Components/CallToAction/SubUser";
import { UserInfos } from "../Contexts/UserInfos";
import AddPostFeed from "../Components/Main/AddPostFeed";
import Avatare from "../../Assets/Images/Icons/Avatar_Icon_Profil.svg";
import { LightBoxNewPost } from "../Contexts/LightBoxNewPost";
import PostCard from "../Components/Main/PostCard";
import PostCardMeetUp from "../Components/Main/Meetup/PostCardMeetUp";

const MainIndex = styled.main`
   display: flex;
   flex-wrap: wrap;
   padding: 36px 66px;
   justify-content: space-between;
   @media (max-width: 960px) {
    padding: 26px;
  }
`;
const MainFeed = styled.main`
   display: flex;
   flex-wrap: wrap;
   padding: 36px 66px;
   justify-content: center;
   @media (min-width: 1985px) {
    padding: 36px 25%;
  }
   @media (max-width: 960px) {
    padding: 26px;
  }
`;

const LightBoxNewPostOver = styled.div`
   position: absolute;
   z-index: 1;
   display: flex;
   justify-content: center;
   backdrop-filter: blur(1px);
   overflow: hidden;
   background-color: #00000040;
   width: 100%;
   height: 100%;
`;

const NewPostFeed = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   background-color: #FFFCF7;
   width: 866px;
   padding: 26px;
   border-radius: 20px;
   box-shadow: 0px 3px 4px rgba(65, 40, 30, 0.25);
   margin-bottom: 26px;
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
   cursor: pointer;
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

const IndexScreen = () => {
  const { IsLoggedIn } = useContext(UserInfos)
  const [ShowLB, setShowLB] = useState(false)
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts();
}, [])

async function getUserPosts() {
    try {
        const response = await fetch("http://localhost:5000/friends/get-all-friends-posts", {
            method: "GET",
            headers: { token: localStorage.token }
        });

        const parseRes = await response.json();
        if (parseRes.rows === undefined) {
          return
        }
        setPosts(parseRes.rows)
    } catch (err) {
        console.error(err.message)
    }
}

  return (
    <>
      <LightBoxNewPost.Provider value={{ ShowLB, setShowLB }}>
        {ShowLB && <LightBoxNewPostOver>
          <AddPostFeed />
        </LightBoxNewPostOver>}
      </LightBoxNewPost.Provider>
      <NavHeader />

      {!IsLoggedIn && <MainIndex>
        <SubUser />
      </MainIndex>}

      {IsLoggedIn && 
      <MainFeed>
        <NewPostFeed>
          <img src={Avatare} alt="Avatare user" />
          <BtnNewPost onClick={() => setShowLB(!ShowLB)} id="NewPost">Nouvelle publication</BtnNewPost>
        </NewPostFeed>

        <PostCardMeetUp />

        {posts.map((post) => (
          <PostCard key={post.post_id} img={Avatare} userName={post.user_name} datePosted={post.created_at.slice(0, 10)} commentPosted={post.post_content} />
        ))}
      </MainFeed>}
    </>
  )
}

export default IndexScreen;