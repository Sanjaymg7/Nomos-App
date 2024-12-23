import React, { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../Components/Context/Context";
import {
  userChat,
  friendDetails,
  send,
  apiRetries,
  invalidAccessToken,
  chatMessageReceived,
  chatTyping,
  userOnline,
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
import { getTime } from "../../Components/Services/DateAndTimeService";

const Chat = () => {
  const otherUserId = localStorage.getItem("other_user_id");
  const [otherUserName, setOtherUserName] = useState("User");
  const [
    isConnected,
    response,
    setResponse,
    sendMessage,
    sendTyping,
    sendRead,
  ] = useContext(WebSocketContext);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [modal, setModal] = useContext(ModalContext);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [messageRetries, setMessageRetries] = useState(apiRetries);
  const [userRetries, setUserRetries] = useState(apiRetries);
  const [didConnect, setDidConnect] = useState(false);

  const sendChatMessage = () => {
    if (message.trim()) {
      sendMessage({
        chat_type: 1,
        user_id: otherUserId,
        message_type: 1,
        message,
      });
      setMessage("");
    }
  };

  const sendChatTyping = () => {
    sendTyping({
      chat_type: 1,
      user_id: otherUserId,
    });
  };

  const sendChatRead = (messageId) => {
    sendRead({
      chat_type: 1,
      user_id: otherUserId,
      last_message_id: messageId,
    });
  };

  const getPreviousChats = async () => {
    if (messageRetries) {
      try {
        const chats = await getCall(userChat + otherUserId);
        setChatMessages(chats.messages);
        if (chats.messages[0].sender_id == otherUserId) {
          sendChatRead(chats.messages[0].message_id);
        }
        setIsLoading(false);
      } catch (err) {
        if (messageRetries === 1 || err === invalidAccessToken) {
          setModal({ modalContent: err, showModal: true });
          setIsLoading(false);
        } else {
          setMessageRetries(messageRetries - 1);
        }
      }
    }
  };

  const getOtherUser = async () => {
    if (userRetries) {
      try {
        const user = await getCall(friendDetails + otherUserId);
        setOtherUserName(user.user_name);
        setIsOnline(user.online_status);
      } catch (err) {
        if (userRetries === 1 || err === invalidAccessToken) {
          setModal({ modalContent: err, showModal: true });
        } else {
          setUserRetries(userRetries - 1);
        }
      }
    }
  };

  useEffect(() => {
    if (isConnected) {
      getPreviousChats();
    }
  }, [isConnected, messageRetries]);

  useEffect(() => {
    if (isConnected) {
      getOtherUser();
    }
  }, [isConnected, userRetries]);

  useEffect(() => {
    if (response) {
      const { event, data } = JSON.parse(response);
      if (event === chatMessageReceived) {
        setChatMessages((prevStatus) => [data, ...prevStatus]);
        if (data.sender_id == otherUserId) {
          sendChatRead(data.message_id);
        }
      } else if (event === chatTyping) {
        if (data.user_id == otherUserId) {
          if (didConnect) {
            getPreviousChats();
            setDidConnect(false);
          }
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 3000);
        }
      } else if (event === userOnline) {
        if (data.user_id == otherUserId && data.online_status == 1) {
          setIsOnline(true);
          setDidConnect(true);
        } else if (data.user_id == otherUserId && data.online_status == 0) {
          setIsOnline(false);
        }
      }
      setResponse(null);
    }
  }, [response]);

  const handleMessageInput = (val) => {
    setMessage(val);
    if (val.length % 5 === 1) {
      sendChatTyping();
    }
  };

  const handleKeyDown = (val) => {
    if (val.keyCode === 13) {
      sendChatMessage();
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
              onBtnClick={sendChatMessage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
