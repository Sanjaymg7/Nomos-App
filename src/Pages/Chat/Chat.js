import React, { useState, useEffect, useRef } from "react";
import {
  getRequestHeader,
  modalInitialState,
  getWebsocketURL,
} from "../../Library/Constants";
import { useLocation } from "react-router-dom";
import { getCall } from "../../Components/Services/DataFetch";
import Modal from "../../Components/Modal/Modal";
import Header from "../../Components/Header/Header";
import "./Chat.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import Loading from "../../Components/Loading/Loading";

const Chat = () => {
  const search = useLocation().search;
  const other_user_id = new URLSearchParams(search).get("other");
  const other_user_name = new URLSearchParams(search).get("name");
  // const [webSocket, setWebSocket] = useState(new WebSocket(getWebsocketURL()));
  const webSocket = useRef(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [modal, setModal] = useState(modalInitialState);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getPreviousChats = async () => {
    try {
      const chats = await getCall(
        `chat/messages?user_id=${other_user_id}&limit=100`,
        getRequestHeader()
      );
      setChatMessages(chats.messages);
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    } finally {
      setIsLoading(false);
    }
  };

  const connectWebSocket = () => {
    webSocket.current = new WebSocket(getWebsocketURL());
    console.log("Websocket connected");
  };

  const sendMessage = () => {
    if (message.trim()) {
      console.log("Sending message");
      webSocket.current.send(
        JSON.stringify({
          action: "send_chat_message",
          access_token: localStorage.getItem("access_token"),
          chat_type: 1,
          user_id: other_user_id,
          message_type: 1,
          message,
        })
      );
      setMessage("");
    }
  };

  const sendTyping = () => {
    console.log("Send Typing");
    webSocket.current.send(
      JSON.stringify({
        action: "send_typing",
        access_token: localStorage.getItem("access_token"),
        chat_type: 1,
        user_id: other_user_id,
      })
    );
  };

  const sendChatRead = (messageId) => {
    webSocket.send(
      JSON.stringify({
        action: "send_chat_read",
        access_token: localStorage.getItem("access_token"),
        chat_type: 1,
        user_id: other_user_id,
        last_message_id: messageId,
      })
    );
  };

  useEffect(() => {
    connectWebSocket();
    getPreviousChats();

    webSocket.current.onopen = (event) => {
      console.log("Websocket is open");
    };

    webSocket.current.onclose = (event) => {
      console.log("Close: ", event);
      connectWebSocket();
    };

    webSocket.current.onmessage = (response) => {
      const messageData = JSON.parse(response.data);
      console.log(messageData);
      if (messageData.event === "chat_message_received") {
        console.log("Chat received");
        setChatMessages((prevStatus) => [messageData.data, ...prevStatus]);
        if (messageData.data.sender_id === other_user_id) {
          // sendChatRead(messageData.data.message_id);
        }
      }
    };

    webSocket.current.onerror = (event) => {
      console.log("Error: ", event);
    };

    return () => {
      console.log("Closing WebSocket");
      webSocket.current.close();
    };
  }, []);

  const handleMessageInput = (val) => {
    setMessage(val);
    if (val.length === 1) {
      sendTyping();
    }
  };

  const handleKeyDown = (val) => {
    if (val.keyCode === 13) {
      sendMessage();
    }
  };

  return (
    <div>
      {modal.showModal && (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
      )}
      <Header navigateTo="inbox" headerText={other_user_name} />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {isTyping && <div className="typingContainer">Typing...</div>}
          <div className="chatwrapper">
            {chatMessages.map((messageData, index) => (
              <div
                key={index}
                className={
                  messageData.sender_id == other_user_id
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
              onKeyDown={handleKeyDown}
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
