import React, { useRef, useState, useEffect } from "react";
import { requestHeader } from "../../Library/Constants";
import { useLocation } from "react-router-dom";
import { getCall } from "../../Components/Services/DataFetch";
import Header from "../../Components/Header/Header";
import "./Chat.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";

const Chat = () => {
  const search = useLocation().search;
  const other_user_id = new URLSearchParams(search).get("other");
  const other_user_name = new URLSearchParams(search).get("name");
  const webSocket = useRef(null);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleMessageInput = (val) => {
    setMessage(val);
  };

  const getPreviousChats = async () => {
    try {
      console.log("Component mounted");
      const chats = await getCall(
        `chat/messages?user_id=${other_user_id}`,
        requestHeader
      );
      console.log(chats.messages);
      setChatMessages(chats.messages);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPreviousChats();
  }, []);

  useEffect(() => {
    console.log("Opening WebSocket");
    webSocket.current = new WebSocket(
      "wss://ws2.juegogames.com/NOMOS-V3?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMTcsImlhdCI6MTY1NTA5NzkyM30.qJM5iW6yMuExIoRigiifp66yiupKbwNdU3VtDaGXnoA"
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
      console.log("On message...");
      console.log(event);
      // setChatMessages([...chatMessages, { message: event }]);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      webSocket.current.send(
        JSON.stringify({
          action: "send_chat_message",
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMTcsImlhdCI6MTY1NTA5NzkyM30.qJM5iW6yMuExIoRigiifp66yiupKbwNdU3VtDaGXnoA",
          chat_type: 1,
          user_id: 318,
          message_type: 1,
          message,
        })
      );
      setMessage("");
    }
  };

  return (
    <div>
      <Header navigateTo="inbox" headerText={other_user_name} />
      {isLoading ? (
        <h1 className="loadingWrapper">Loading....</h1>
      ) : (
        <div>
          {isTyping && <div className="typingContainer">Typing...</div>}
          <div className="chatwrapper">
            {chatMessages.map((messageData, index) => (
              <div
                key={index}
                className={
                  messageData.sender_id == "318"
                    ? "chatMessage chatReceiver"
                    : "chatMessage chatSender"
                }
              >
                {messageData.message}
              </div>
            ))}
          </div>
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
      )}
    </div>
  );
};

export default Chat;
