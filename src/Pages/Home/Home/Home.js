import React, { useState } from "react";
import Button from "../../../Components/Button/Button";
import HomeComp from "../HomeComponent/HomeComp";
import MenuComp from "../Menu/MenuComp";
import InboxComp from "../Inbox/InboxComp";
import Title from "../../../Components/Title/Title";
import "./Home.css";

const Home = () => {
  const [component, setComponent] = useState(0);
  const [menu, toggleMenu] = useState(false);

  return (
    <div className="home-container">
      <Header />
      {menu && <MenuComp toggleMenu={toggleMenu} />}
      {component === 0 && <HomeComp />}
      {component === 1 && <InboxComp />}

      <div className="footer">
        <Button
          className="home-btn"
          btnContent="Home"
          onBtnClick={() => setComponent(0)}
        />
        <Button
          className="home-btn"
          btnContent="Menu"
          onBtnClick={() => toggleMenu(!menu)}
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