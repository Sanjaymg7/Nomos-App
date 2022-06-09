import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import "./Chat.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";

const Chat = () => {
  const search = useLocation().search;
  const other_user_id = new URLSearchParams(search).get("other");
  const webSocket = useRef(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleMessageInput = (val) => {
    setMessage(val);
  };

  useEffect(() => {
    console.log("Opening WebSocket");
    webSocket.current = new WebSocket(
      "wss://ws2.juegogames.com/NOMOS-V3?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMTcsImlhdCI6MTY1NDc2ODEwN30.zkZ3F5op_IT9WIn90C1vcLRiO4ICoFxcAMpWhlFoO9Y"
    );

    webSocket.current.onopen = (event) => {
      console.log("Open: ", event);
    };

    webSocket.current.onclose = (event) => {
      console.log("Close: ", event);
    };

    webSocket.current.onerror = (event) => {
      console.log("Error: ", event);
    };

    return () => {
      console.log("Closing WebSocket");
      webSocket.current.close();
    };
  }, []);

  useEffect(() => {
    webSocket.current.onmessage = (event) => {
      console.log(event);
      setChatMessages([...chatMessages, { message: event }]);
    };
  }, [chatMessages]);

  const sendMessage = () => {
    if (message.trim()) {
      console.log("Send Message : ", message);
      webSocket.current.send({
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMTcsImlhdCI6MTY1NDc2ODEwN30.zkZ3F5op_IT9WIn90C1vcLRiO4ICoFxcAMpWhlFoO9Y",
        chat_type: 1,
        user_id: 318,
        message_type: 1,
        message,
      });
      setMessage("");
    }
  };

  return (
    <div>
      <Header navigateTo="inbox" headerText="Rohan" />
      <div className="chatwrapper"></div>
      <div className="inputwrapper">
        <Input
          type={"text"}
          value={message}
          onInputChange={handleMessageInput}
          className={"messagedata"}
          isLabelRequired={false}
        />
        <Button
          btnName={"Send"}
          className={"btnSendMessage"}
          onBtnClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
