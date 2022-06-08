import React, { useRef, useState } from "react";
import "./Chat.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";

const Chat = () => {
  const webSocket = useRef(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleMessageInput = (val) => {
    setMessage(val);
  };

  const sendMessage = () => {
    if (message.trim()) {
      console.log("Send Message : ", message);
      setMessage("");
    }
  };

  return (
    <div>
      <div className="chatHeader">
        <span className="navigateHome">{"<"}</span>
        <span className="userName">Rohan</span>
      </div>
      <div className="chatContainer"></div>
      <div className="inputContainer">
        <Input
          type={"text"}
          value={message}
          onInputChange={handleMessageInput}
          className={"messageInput"}
        />
        <Button
          btnContent={"Send"}
          className={"btnSend"}
          onBtnClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
