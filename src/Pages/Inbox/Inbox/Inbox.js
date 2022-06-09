import React, { useEffect } from "react";
import { navigate } from "../../../Library/Constants";
import { requestHeader } from "../../../Library/Constants";
import { getCall } from "../../../Components/Services/DataFetch";
import "./Inbox.css";
import Header from "../../../Components/Header/Header";

const InboxComp = () => {
  const chatArray = [];
  const message =
    "Hello Rohan. How are you doing? hope everything is going great and easy";

  // useEffect(() => {
  //   const getChats = async () => {
  //     try {
  //       const data = await getCall("chat?chat_type=1", requestHeader);
  //       if (data) {
  //         console.log(data);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getChats();
  // }, []);

  const redirectToChatPage = () => {
    navigate("/chat");
  };

  return (
    <div>
      <Header navigateTo="home" headerText="Inbox" />
      <div className="userMessageContainer" onClick={redirectToChatPage}>
        <img src="./nature.jpg" className="profilePicture" />
        <div>
          <h5 className="userName">Rohan Jss</h5>
          <p className="lastUserMessage">
            {message.length > 54 ? message.slice(0, 54) + "..." : message}
          </p>
        </div>
        <div>
          <span className="timeField">11:25 am</span>
          <span className="unreadCount">2</span>
        </div>
        <span className="enterChat">{">"}</span>
      </div>
      <div className="userMessageContainer" onClick={redirectToChatPage}>
        <img src="./nature.jpg" className="profilePicture" />
        <div>
          <h5 className="userName">Shawn Ks</h5>
          <p className="lastUserMessage">
            {message.length > 54 ? message.slice(0, 54) + " ..." : message}
          </p>
        </div>
        <div>
          <span className="timeField">02:35 pm</span>
          <span className="unreadCount">5</span>
        </div>
        <span className="enterChat">{">"}</span>
      </div>
    </div>
  );
};

export default React.memo(InboxComp);
