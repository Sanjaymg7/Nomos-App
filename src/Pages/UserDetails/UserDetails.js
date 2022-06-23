import React, { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../Components/Context/Context";
import userDetails from "./UserDetails.module.css";
import Image from "../../Components/Image/Image";
import Header from "../../Components/Header/Header";
import { getCall, postCall } from "../../Components/Services/DataFetch";
import Loading from "../../Components/Loading/Loading";
import Modal from "../../Components/Modal/Modal";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { joinExperienceEndPoint, post } from "../../Library/Constants";
import UserIcons from "../../Components/UserIcons/UserIcons";

const UserDetails = () => {
  const [postData, setPostData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [modal, setModal] = useContext(ModalContext);
  const [displayData, setDisplayData] = useState(false);
  const [user, setUser] = useState(false);
  const [button, setButton] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getPostData();
  }, []);
  const getPostData = async () => {
    try {
      setLoading(true);
      const data = await getCall(
        `posts/details?post_id=${localStorage.getItem("post_id")}`
      );
      if (data) {
        console.log(data.posts[0]);
        setPostData(data.posts[0]);
        console.log(postData.user_id == localStorage.getItem("user_id")) &&
          setUser(true);

        setDisplayData(!displayData);
      }
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    } finally {
      setLoading(false);
    }
  };
  const callDate = (timeStamp) => {
    const dt = new Date(timeStamp);
    let dateToString = dt.toUTCString().split(" ");
    return dateToString[0] + " " + dateToString[1] + " " + dateToString[2];
  };
  const isSameUser = () => {
    navigate("/inbox");
  };
  const isNotSameUser = async () => {
    try {
      setButton(true);
      await postCall(joinExperienceEndPoint, {
        post_id: localStorage.getItem("post_id"),
      });
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      {modal.showModal && <Modal />}
      <Header navigateTo="home" headerText="Details" />
      {displayData ? (
        <div className={userDetails.container}>
          <Image
            className={userDetails.image}
            src={postData.image_url}
            alt="image"
          />
          <div className={userDetails.otherUser}>
            Offered by <span>{postData.user_name}</span>
            <Image
              className={userDetails.otherUserImage}
              src={postData.profile_picture_url}
              alt="image"
            />
          </div>
          <div className={userDetails.giveOrReceive}>
            {postData.post_type === 1
              ? "Item Requested"
              : postData.post_type
              ? "Experience"
              : ""}
          </div>
          <div className={userDetails.description}>
            <h4>{postData.title}</h4>
            <div className={userDetails.dateCapacity}>
              <div className={userDetails.date}>
                <h4>{callDate(postData.start_time)}</h4>
                <h5 className={userDetails.h5}>start Date</h5>
              </div>
              <div className={userDetails.date}>
                <h4>{postData.member_limitation} people</h4>
                <h5 className={userDetails.h5}>total capacity</h5>
              </div>
            </div>
            <p className={userDetails.pTag}>{postData.description}</p>
          </div>
          <div className={userDetails.location}>
            <p className={`${userDetails.pTag} ${userDetails.removeMargin}`}>
              {postData.location.name}
            </p>
            <p className={`${userDetails.pTag} ${userDetails.removeMargin}`}>
              {postData.post_distance} miles away
            </p>
          </div>
          <h4 className={userDetails.skillText}>Skills</h4>
          <div className={userDetails.skills}>
            {postData.skills.map((skill) => (
              <Button
                key={skill.master_skills_id}
                btnName={skill.skill_title}
                className={userDetails.skill}
              />
            ))}
          </div>
          <UserIcons postData={postData} />
          <Button
            btnName={
              user ? "Check your Inbox" : "I want to join this experience"
            }
            className={
              button
                ? `${userDetails.foorteButton} ${userDetails.foorteButtonInActive}`
                : `${userDetails.foorteButton} ${userDetails.foorteButtonActive}`
            }
            onBtnClick={user ? isSameUser : isNotSameUser}
            btnDisable={button ? false : true}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserDetails;
