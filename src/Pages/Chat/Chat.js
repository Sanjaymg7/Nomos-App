import React, { useState, useEffect, useRef, useContext } from "react";
import { ModalContext } from "../../Components/Context/Context";
import {
  websocketURL,
  access_token,
  userChat,
  friendDetails,
  send,
} from "../../Library/Constants";
import { getCall } from "../../Components/Services/DataFetch";
import Modal from "../../Components/Modal/Modal";
import Header from "../../Components/Header/Header";
import "./Chat.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import Loading from "../../Components/Loading/Loading";

const Chat = () => {
  const otherUserId = localStorage.getItem("other_user_id");
  const [otherUserName, setOtherUserName] = useState("User");
  const webSocket = useRef(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [modal, setModal] = useContext(ModalContext);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);

  const getOtherUser = async () => {
    try {
      const user = await getCall(friendDetails + otherUserId);
      setOtherUserName(user.user_name);
      setIsOnline(user.online_status);
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };

  const getPreviousChats = async () => {
    try {
      const chats = await getCall(userChat + otherUserId);
      setChatMessages(chats.messages);
      console.log("Chat read");
      if (chats.messages[0].sender_id == otherUserId) {
        sendChatRead(chats.messages[0].message_id);
      }
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    } finally {
      setIsLoading(false);
    }
  };

  const connectWebSocket = () => {
    webSocket.current = new WebSocket(websocketURL);
  };

  const sendMessage = () => {
    if (message.trim()) {
      webSocket.current.send(
        JSON.stringify({
          action: "send_chat_message",
          access_token,
          chat_type: 1,
          user_id: otherUserId,
          message_type: 1,
          message,
        })
      );
      setMessage("");
    }
  };

  const sendTyping = () => {
    webSocket.current.send(
      JSON.stringify({
        action: "send_typing",
        access_token,
        chat_type: 1,
        user_id: otherUserId,
      })
    );
  };

  const sendChatRead = (messageId) => {
    webSocket.current.send(
      JSON.stringify({
        action: "send_chat_read",
        access_token,
        chat_type: 1,
        user_id: otherUserId,
        last_message_id: messageId,
      })
    );
  };

  useEffect(() => {
    connectWebSocket();
    getOtherUser();
    getPreviousChats();

    webSocket.current.onopen = () => {
      console.log("Websocket is open");
    };

    webSocket.current.onclose = (event) => {
      console.log("Websocket closed");
      if (event.wasClean === false) {
        connectWebSocket();
      }
    };

    webSocket.current.onmessage = (response) => {
      console.log(response);
      const messageData = JSON.parse(response.data);
      if (messageData.event === "chat_message_received") {
        setChatMessages((prevStatus) => [messageData.data, ...prevStatus]);
        if (messageData.data.sender_id == otherUserId) {
          sendChatRead(messageData.data.message_id);
        }
      } else if (messageData.event === "chat_typing") {
        if (messageData.data.user_id == otherUserId) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 5000);
        }
      } else if (messageData.event === "user_online_status") {
        if (
          messageData.data.user_id == otherUserId &&
          messageData.data.online_status == 0
        ) {
          setIsOnline(false);
        } else {
          setIsOnline(true);
        }
      }
    };

    webSocket.current.onerror = (event) => {
      console.log("Error");
    };

    return () => {
      console.log("Closing WebSocket");
      webSocket.current.close();
    };
  }, []);

  const handleMessageInput = (val) => {
    setMessage(val);
    if (val.length > 0) {
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
      {/* {modal.showModal && <Modal />} */}
      <Header navigateTo="inbox" headerText={otherUserName} />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {isTyping && <div className="typingContainer">Typing...</div>}
          <div
            className={
              isOnline ? "onlineContainer online" : "onlineContainer offline"
            }
          ></div>
          <div className="chatwrapper">
            {chatMessages.map((messageData, index) => (
              <div
                key={index}
                className={
                  messageData.sender_id == otherUserId
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
              btnName={send}
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
