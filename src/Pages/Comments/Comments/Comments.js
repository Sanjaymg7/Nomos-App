import React, { useState, useEffect } from "react";
import Header from "../../../Components/Header/Header";
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import "./Comments";
import CommentCard from "../CommentCard/CommentCard";
import { useNavigate } from "react-router-dom";
import { getCall, putCall } from "../../../Components/Services/DataFetch";
import { getRequestHeader } from "../../../Library/Constants";

const Comments = () => {
  const [commentMessage, setCommentMessage] = useState("");
  const [commentData, setCommentData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
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
      console.log(err);
    } finally {
      setCommentMessage("");
    }
  };
  const sendMessage = async () => {
    console.log(commentMessage);
    try {
      const data = await putCall(
        "posts/comment/",
        { post_id: localStorage.getItem("post_id"), comment: commentMessage },
        getRequestHeader()
      );
      if(data) {
        navigate("/comments");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header navigateTo="home" headerText="Details" />
      {/* {isTyping && <div className="typingContainer">Typing...</div>} */}
      <div className="chatwrapper">
        {commentData?.map((comment) => (
          <CommentCard
            key={comment.comment_id}
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
          btnName="Send"
          className="btnSendMessage"
          onBtnClick={sendMessage}
        />
      </div>
    </>
  );
};

export default Comments;
