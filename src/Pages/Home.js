import React, { useState } from "react";
import Button from "../Components/Button";
import HomeCard from "../Components/HomeCard";
import MenuComp from "../Components/MenuComp";
import InboxComp from "../Components/InboxComp";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";
const Home = () => {
  const [component, setComponent] = useState();
  return (
    <div>
      <div className="header">
        <p className="title">Nomos</p>
      </div>
      <div className="card">
        {component === 1 ? (
          <HomeCard />
        ) : component === 2 ? (
          <MenuComp />
        ) : (
          component === 3 && <InboxComp />
        )}
      </div>
      <div className="footer">
        <Button
          className="home-btn"
          btnContent="Intro"
          onBtnClick={() => setComponent(1)}
        />
        <Button
          className="home-btn"
          btnContent="Menu"
          onBtnClick={() => "Intro"}
        />
        <Button
          className="home-btn"
          btnContent="Inbox"
          onBtnClick={() => "Intro"}
        />
      </div>
    </div>
  );
};

export default Home;
