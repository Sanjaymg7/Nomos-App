import React, {useState, useEffect} from "react";
import Button from "../Components/Button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";
const Home = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        
    },[])
  return (
    <div>
      <div className="header">
          <p className="title">Nomos</p>
      </div>
      <div className="card"></div>
      <div className="footer">
        <Button className="home-btn" btnContent="Home" onBtnClick={() => console.log("Home")} />
        <Button className="home-btn" btnContent="Menu" onBtnClick={() => "Home"} />
        <Button className="home-btn" btnContent="Inbox" onBtnClick={() => "Home"} />
      </div>
    </div>
  );
};

export default Home;
