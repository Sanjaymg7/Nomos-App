import React, { useEffect, useState, useContext } from "react";
import { ModalContext } from "../../../Components/Context/Context";
import {
  privateChats,
  chat,
  userDefaultImage,
} from "../../../Library/Constants";
import { useNavigate } from "react-router-dom";
import { getCall } from "../../../Components/Services/DataFetch";
import "./Inbox.css";
import Header from "../../../Components/Header/Header";
import Modal from "../../../Components/Modal/Modal";
import Footer from "../../../Components/Footer/Footer";
import Friends from "../../../Components/Friends/Friends";
import Loading from "../../../Components/Loading/Loading";
import Image from "../../../Components/Image/Image";

const InboxComp = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useContext(ModalContext);
  const [chatConversations, setChatConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInbox, setIsInbox] = useState(true);

  const getChats = async () => {
    try {
      const data = await getCall(privateChats);
      if (data) {
        setChatConversations(data.chat_conversations);
      }
    } catch (err) {
      setModal({
        modalContent: err,
        showModal: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  const displayDate = (chatDate, appendString = "") => {
    if (chatDate.getHours() <= 12) {
      if (chatDate.getHours() === 12) {
        return (
          appendString +
          ` ${chatDate.getHours()}:${
            chatDate.getMinutes() < 10
              ? "0" + chatDate.getMinutes()
              : chatDate.getMinutes()
          } pm`
        );
      } else {
        return (
          appendString +
          ` ${chatDate.getHours()}:${
            chatDate.getMinutes() < 10
              ? "0" + chatDate.getMinutes()
              : chatDate.getMinutes()
          } am`
        );
      }
    } else {
      return (
        appendString +
        ` ${+chatDate.getHours() % 12}:${
          chatDate.getMinutes() < 10
            ? "0" + chatDate.getMinutes()
            : chatDate.getMinutes()
        } pm`
      );
    }
  };

  const handleDate = (date) => {
    const chatDate = new Date(date);
    const systemDate = new Date();
    if (
      chatDate.getDate() === systemDate.getDate() &&
      chatDate.getMonth() === systemDate.getMonth() &&
      chatDate.getFullYear() === systemDate.getFullYear()
    ) {
      return displayDate(chatDate);
    } else if (
      chatDate.getDate() === +systemDate.getDate() - 1 &&
      chatDate.getMonth() === systemDate.getMonth() &&
      chatDate.getFullYear() === systemDate.getFullYear()
    ) {
      return displayDate(chatDate, "Yesterday");
    } else {
      return displayDate(
        chatDate,
        `${chatDate.getDate()}-${chatDate.getMonth() + 1}-${chatDate
          .getFullYear()
          .toString()
          .slice(2)}`
      );
    }
  };

  const redirectToChatPage = (userId) => {
    localStorage.setItem("other_user_id", userId);
    navigate(chat);
  };

  return (
    <div>
      {modal.showModal && <Modal />}
      <Header navigateTo="home" headerText="Inbox" />
      <div className="addChatFriends" onClick={() => setIsInbox(!isInbox)}>
        +
      </div>
      {isLoading ? (
        <Loading />
      ) : isInbox ? (
        chatConversations.length === 0 ? (
          <h1 className="noUserChats">There are no messages</h1>
        ) : (
          chatConversations.map((chat, index) => (
            <div
              key={index}
              className="userMessageContainer"
              onClick={() => redirectToChatPage(chat.user_id, chat.user_name)}
            >
              <Image
                src={chat.profile_picture || userDefaultImage}
                className="profilePicture"
              />
              <div>
                <h5 className="userName">{chat.user_name}</h5>
                <p className="lastUserMessage">
                  {chat.last_message.length > 54
                    ? chat.last_message.slice(0, 54) + "..."
                    : chat.last_message}
                </p>
              </div>
              <div>
                <span className="timeField">
                  {handleDate(chat.last_message_time)}
                </span>
                <span className="unreadCount">{chat.unread_count}</span>
              </div>
              <span className="enterChat">{">"}</span>
            </div>
          ))
        )
      ) : (
        <Friends
          handleFriendsSubmit={redirectToChatPage}
          selectType="single"
          userType="chatUser"
        />
      )}
      <Footer />
    </div>
  );
};

export default InboxComp;
