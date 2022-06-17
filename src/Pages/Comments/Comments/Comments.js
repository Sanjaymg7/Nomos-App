import React, { useState, useEffect } from "react";
import Header from "../../../Components/Header/Header";
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import "./Comments";
import { modalInitialState } from "../../../Library/Constants";
import Modal from "../../../Components/Modal/Modal";
import CommentCard from "../CommentCard/CommentCard";
import { getCall, putCall } from "../../../Components/Services/DataFetch";
import { getRequestHeader } from "../../../Library/Constants";

const Comments = () => {
  const [commentMessage, setCommentMessage] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [modal, setModal] = useState(modalInitialState);
  const [userData, setUserData] = useState();
  useEffect(() => {
    getData();
    getUserData();
  }, []);
  const getData = async () => {
    try {
      const data = await getCall(
        `posts/comment/?post_id=${localStorage.getItem("post_id")}`,
        getRequestHeader()
      );
      if (data) {
        setCommentData(data.comments);
      }
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };
  const getUserData = async () => {
    try {
      const data = await getCall("users/", getRequestHeader());
      if (data) {
        setUserData(data);
      }
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };
  const sendMessage = async () => {
    setCommentData([
      {
        user_id: userData.user_id,
        user_name: userData.user_name,
        profile_picture_url: userData.profile_picture_url,
        comment: commentMessage,
        commented_at: Date.now(),
      },
      ...commentData,
    ]);
    try {
      await putCall(
        "posts/comment/",
        { post_id: localStorage.getItem("post_id"), comment: commentMessage },
        getRequestHeader()
      );
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    } finally {
      setCommentMessage("");
    }
  };
  return (
    <>
      {modal.showModal && (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
      )}
      <Header navigateTo="home" headerText="Details" />
      <div className="chatwrapper">
        {commentData?.map((comment, index) => (
          <CommentCard
            key={index}
            commentItem={comment}
            profileURL={comment.profile_picture_url}
            userName={comment.user_name}
            comment={comment.comment}
            commentedAt={comment.commented_at}
          />
        ))}
      </div>
      <div className="inputwrapper">
        <Input
          type="text"
          value={commentMessage}
          onInputChange={setCommentMessage}
          className="messagedata"
          isLabelRequired={false}
        />
        <Button
          btnName="Comment"
          className="btnSendMessage"
          onBtnClick={sendMessage}
        />
      </div>
    </>
  );
};

export default Comments;
