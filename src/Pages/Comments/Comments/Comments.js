import React, { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../../Components/Context/Context";
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import "./Comments.css";
import Modal from "../../../Components/Modal/Modal";
import CommentCard from "../CommentCard/CommentCard";
import { getCall, putCall } from "../../../Components/Services/DataFetch";
import { comment } from "../../../Library/Constants";
import Image from "../../../Components/Image/Image";

const Comments = () => {
  const [commentMessage, setCommentMessage] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [modal, setModal] = useContext(ModalContext);
  const [userData, setUserData] = useState();
  useEffect(() => {
    getData();
    getUserData();
  }, []);
  const getData = async () => {
    try {
      const data = await getCall(
        `posts/comment/?post_id=${localStorage.getItem("post_id")}`
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
      const data = await getCall("users/");
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
      await putCall("posts/comment/", {
        post_id: localStorage.getItem("post_id"),
        comment: commentMessage,
      });
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    } finally {
      setCommentMessage("");
    }
  };
  return (
    <>
      {modal.showModal && <Modal />}
      <div className="commentwrapper">
        {commentData.length == 0 ? (
          <div className="no-comments">
            <Image src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/364D1859-4214-4D34-A64C-CB5CFDEA89AA.png" />
            No comments yet be <br></br> the first to comment
          </div>
        ) : (
          commentData?.map((comment, index) => (
            <CommentCard key={index} commentItem={comment} />
          ))
        )}
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
          btnName={comment}
          className="btnSendMessage"
          onBtnClick={sendMessage}
        />
      </div>
    </>
  );
};

export default Comments;
