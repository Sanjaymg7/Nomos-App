import React, { useState, useEffect } from "react";
import Button from "../../Components/Button";
import HomeCard from "./HomeCard";
import MenuComp from "./MenuComp";
import InboxComp from "./InboxComp";
import Title from "../../Components/Title";
import "./Home.css";
import { doGETCall } from "../../DataFetch";
import { useCookies } from "react-cookie";

const Home = () => {
  const [cookies, setCookie] = useCookies();
  const [component, setComponent] = useState(2);
  const [posts, setPosts] = useState();
  // useEffect(() => {
  //   const data = doGETCall("posts/", {
  //     "content-type": "application/json",
  //     access_token: cookies.access_token,
  //   });
  //   setPosts(data.posts);
  //   console.log(posts);
  // }, []);

  return (
    <div className="home-container">
      <Title />
      {component === 0 && posts?.map((post) => <HomeCard />)}
      {component === 1 && <MenuComp />}
      {component === 2 && <InboxComp />}

      <div className="footer">
        <Button
          className="home-btn"
          btnContent="Intro"
          onBtnClick={() => setComponent(0)}
        />
        <Button
          className="home-btn"
          btnContent="Menu"
          onBtnClick={() => setComponent(1)}
        />
        <Button
          className="home-btn"
          btnContent="Inbox"
          onBtnClick={() => setComponent(2)}
        />
      </div>
    </div>
  );
};

export default Home;
