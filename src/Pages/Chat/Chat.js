import React, { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../Components/Context/Context";
import {
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { WebSocketContext } from "../../Components/Context/Context";

const Chat = () => {
  const otherUserId = localStorage.getItem("other_user_id");
  const [otherUserName, setOtherUserName] = useState("User");
  const [isConnected, response, setResponse, sendRequest] =
    useContext(WebSocketContext);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [modal, setModal] = useContext(ModalContext);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);

  const sendMessage = () => {
    if (message.trim()) {
      sendRequest({
        action: "send_chat_message",
        access_token,
        chat_type: 1,
        user_id: otherUserId,
        message_type: 1,
        message,
      });
      setMessage("");
    }
  };

  const sendTyping = () => {
    sendRequest({
      action: "send_typing",
      access_token,
      chat_type: 1,
      user_id: otherUserId,
    });
  };

  const sendChatRead = (messageId) => {
    sendRequest({
      action: "send_chat_read",
      access_token,
      chat_type: 1,
      user_id: otherUserId,
      last_message_id: messageId,
    });
  };

  const getPreviousChats = async () => {
    try {
      const chats = await getCall(userChat + otherUserId);
      setChatMessages(chats.messages);
      if (chats.messages[0].sender_id == otherUserId) {
        sendChatRead(chats.messages[0].message_id);
      }
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    } finally {
      setIsLoading(false);
    }
  };

  const getOtherUser = async () => {
    try {
      const user = await getCall(friendDetails + otherUserId);
      setOtherUserName(user.user_name);
      setIsOnline(user.online_status);
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };

  useEffect(() => {
    if (isConnected) {
      getOtherUser();
      getPreviousChats();
    }
  }, [isConnected]);

  useEffect(() => {
    if (response) {
      console.log(response);
      const { event, data } = JSON.parse(response);
      if (event === "chat_message_received") {
        if (data.sender_id != otherUserId && isOnline) {
          data.message_read = true;
        }
        setChatMessages((prevStatus) => [data, ...prevStatus]);
        if (data.sender_id == otherUserId) {
          sendChatRead(data.message_id);
        }
      } else if (event === "chat_typing") {
        if (data.user_id == otherUserId) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 5000);
        }
      } else if (event === "user_online_status") {
        if (data.user_id == otherUserId && data.online_status == 0) {
          setIsOnline(false);
        } else {
          setIsOnline(true);
          setTimeout(() => getPreviousChats(), 10000);
        }
      }
      setResponse(null);
    }
  }, [response]);

  const handleMessageInput = (val) => {
    setMessage(val);
    if (val.length % 5 === 1) {
      sendTyping();
    }
  };

  const handleKeyDown = (val) => {
    if (val.keyCode === 13) {
      sendMessage();
    }
  };

  const getTime = (time) => {
    const date = new Date(time);
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (hour < 12) {
      return `${hour}:${minute < 10 ? "0" + minute : minute} am`;
    } else if (hour == 12) {
      return `${hour}:${minute < 10 ? "0" + minute : minute} pm`;
    } else {
      return `${hour - 12}:${minute < 10 ? "0" + minute : minute} pm`;
    }
  };

  return (
    <div>
      {modal.showModal && <Modal />}
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
                <div className="chatTimeStamp">
                  {getTime(messageData.message_sent_time)}
                  {messageData.sender_id != otherUserId ? (
                    messageData.message_read ? (
                      <FontAwesomeIcon
                        icon={faCheckDouble}
                        className="chatCheck"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faCheck} className="chatCheck" />
                    )
                  ) : (
                    ""
                  )}
                </div>
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
