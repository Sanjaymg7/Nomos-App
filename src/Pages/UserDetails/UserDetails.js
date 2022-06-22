import React, { useState, useEffect } from "react";
import userDetails from "./UserDetails.module.css";
import Image from "../../Components/Image/Image";
import Header from "../../Components/Header/Header";
import { getCall } from "../../Components/Services/DataFetch";
import { modalInitialState } from "../../Library/Constants";
import Loading from "../../Components/Loading/Loading";
import Modal from "../../Components/Modal/Modal";
import Button from "../../Components/Button/Button";

const UserDetails = () => {
  const [postData, setPostData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [modal, setModal] = useState(modalInitialState);
  const [displayData, setDisplayData] = useState(false);
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
  return (
    <>
      {isLoading && <Loading />}
      {modal.showModal && (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
      )}
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
          <div className={userDetails.footer}>
            <div className={userDetails.footerIcons}>
              <div className={userDetails.footerIcon}>
                <Image
                  className={userDetails.icon}
                  src={
                    postData.is_liked
                      ? "https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/9C5ED4B1-EE22-468D-8168-0BFD7D3C607A.png"
                      : "https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/C6DF2E4F-8890-4608-9274-5E4F21FB295E.png"
                  }
                  alt="like"
                />
                <p className={userDetails.footerText}>{postData.like_count}</p>
              </div>
              <div className={userDetails.footerIcon}>
                <Image
                  className={userDetails.icon}
                  src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/A0438201-1D9D-4041-9FC2-71DAAF64B89F.png"
                  alt="comments icon"
                />
                <p className={userDetails.footerText}>
                  {postData.comment_count}
                </p>
              </div>
            </div>
            <div className={userDetails.footerIcon}>
              <Image
                className={userDetails.viewIcon}
                src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/84C21AF0-580D-42C4-B0B7-EF84792A81E2.png"
                alt="seen icon"
              />
              <p className={userDetails.footerText}>{postData.views_count}</p>
            </div>
          </div>
          <Button
            btnName="I want to join this experience"
            className={userDetails.footerButton}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserDetails;
