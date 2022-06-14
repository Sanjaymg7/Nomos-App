import React, { useEffect, useState } from "react";
import { modalInitialState } from "../../../Library/Constants";
import { useNavigate } from "react-router-dom";
import { requestHeader } from "../../../Library/Constants";
import { getCall } from "../../../Components/Services/DataFetch";
import "./Inbox.css";
import Footer from "../../../Components/FooterComponent/Footer";
import Header from "../../../Components/Header/Header";
import Modal from "../../../Components/Modal/Modal";
import Footer from "../../../Components/Footer/Footer";

const InboxComp = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(modalInitialState);
  const [chatConversations, setChatConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCloseModal = (e) => {
    setModal(modalInitialState);
  };

  const getChats = async () => {
    try {
      const data = await getCall("chat?chat_type=1", requestHeader);
      if (data) {
        setChatConversations(data.chat_conversations);
      }
    } catch (err) {
      setModal({
        modalContent: "Something went wrong.. Please try again!!",
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
          appendString + ` ${chatDate.getHours()}:${chatDate.getMinutes()} pm`
        );
      } else {
        return (
          appendString + ` ${chatDate.getHours()}:${chatDate.getMinutes()} am`
        );
      }
    } else {
      return (
        appendString +
        ` ${+chatDate.getHours() % 12}:${chatDate.getMinutes()} pm`
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
      chatDate.getMonth() === +systemDate.getMonth() - 1 &&
      chatDate.getFullYear() === +systemDate.getFullYear() - 1
    ) {
      return displayDate(chatDate, "Yesterday");
    } else {
      return displayDate(
        chatDate,
        `${chatDate.getDate()}-${+chatDate.getMonth + 1}`
      );
    }
  };

  const redirectToChatPage = (userId, userName) => {
    navigate(`/chat?other=${userId}&name=${userName}`);
  };

  return (
    <div>
      {modal.showModal && (
        <Modal
          modalContent={modal.modalContent}
          closeModal={handleCloseModal}
        />
      )}
      <Header navigateTo="home" headerText="Inbox" />
      {isLoading ? (
        <h1 className="loadingWrapper">Loading....</h1>
      ) : (
        chatConversations.map((chat, index) => (
          <div
            key={index}
            className="userMessageContainer"
            onClick={() => redirectToChatPage(chat.user_id, chat.user_name)}
          >
            <img src={chat.profile_picture} className="profilePicture" />
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
      )}
      <Footer />
    </div>
  );
};

export default InboxComp;
