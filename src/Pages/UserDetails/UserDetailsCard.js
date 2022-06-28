import React, { useState } from "react";
import userDetails from "./UserDetails.module.css";
import Image from "../../Components/Image/Image";
import Button from "../../Components/Button/Button";
import UserIcons from "../../Components/UserIcons/UserIcons";
import Comments from "../Comments/Comments/Comments";
import People from "../../Components/People/People";
import Request from "../../Components/Request/Request";
import { userDefaultImage } from "../../Library/Constants";

const UserDetailsCard = ({
  postData,
  callDate,
  isSameUser,
  isNotSameUser,
  user,
  button,
  acceptHandler,
  rejectHandler,
}) => {
  const [people, setPeople] = useState(false);
  const [comments, setComments] = useState(true);
  const peopleHandler = () => {
    setComments(false);
    setPeople(true);
  };
  const commentsHandler = () => {
    setComments(true);
    setPeople(false);
  };
  //   1- experience, 2- service request, 3- item borrow 6. info post
  return (
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
          src={postData.profile_picture_url || userDefaultImage}
          alt="image"
        />
      </div>
      <div className={userDetails.giveOrReceive}>
        {postData.post_type === 1 && "Experience"}
        {postData.post_type === 2 && "Service"}
        {postData.post_type === 3 && "Item Borrow"}
        {postData.post_type === 6 && "Info"}
      </div>
      <div className={userDetails.description}>
        <h4>{postData.title}</h4>
        {postData.post_type === 1 && (
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
        )}
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
      {postData.skills.length > 0 && (
        <>
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
        </>
      )}
      <UserIcons postData={postData} />
      {postData.interested_users.filter(
        (user) => user.user_id == localStorage.getItem("user_id")
      ).length > 0
        ? ""
        : postData.post_type === 1 && (
            <Button
              btnName={
                user ? "Check your Inbox" : "I want to join this experience"
              }
              className={
                button
                  ? `${userDetails.foorteButton} ${userDetails.footerButtonInActive}`
                  : `${userDetails.foorteButton} ${userDetails.footerButtonActive}`
              }
              onBtnClick={user ? isSameUser : isNotSameUser}
              btnDisable={button ? true : false}
            />
          )}
      {postData.post_type == 1 && (
        <div className={userDetails.peopleComments}>
          <Button
            btnName="People"
            className={people ? userDetails.peopleActive : userDetails.people}
            onBtnClick={peopleHandler}
          />
          <Button
            btnName="Comments"
            className={
              comments ? userDetails.commentsActive : userDetails.comments
            }
            onBtnClick={commentsHandler}
          />
        </div>
      )}
      <div className={userDetails.peopleOrCommentContainer}>
        {postData.post_type == 1 && people ? (
          user ? (
            postData.interested_users.length == 0 ? (
              <div className="no-comments">
                <Image src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/CCDC8F0E-3303-497F-8236-F98E48805D0A.png" />
                Nobody here yet <br /> be the first
              </div>
            ) : (
              postData.interested_users.map((people, index) =>
                people.status == 1 ? (
                  <Request
                    key={index}
                    index={index}
                    id={people.user_id}
                    userName={people.user_name}
                    profilePicture={people.profile_picture_url}
                    status={people.status}
                    acceptHandler={acceptHandler}
                    rejectHandler={rejectHandler}
                    response={people.didRespond}
                  />
                ) : people.status == 2 ? (
                  <People
                    key={index}
                    userId={people.user_id}
                    name={people.user_name}
                    profilePicture={people.profile_picture_url}
                    status={people.status}
                  />
                ) : (
                  ""
                )
              )
            )
          ) : postData.interested_users.length == 0 ? (
            <div className="no-comments">
              <Image src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/CCDC8F0E-3303-497F-8236-F98E48805D0A.png" />
              Nobody here yet <br /> be the first
            </div>
          ) : (
            postData.interested_users.map((people, index) => (
              <People
                key={index}
                userId={people.user_id}
                name={people.user_name}
                profilePicture={people.profile_picture_url}
                status={people.status}
              />
            ))
          )
        ) : (
          ""
        )}
        {comments && <Comments />}
      </div>
    </div>
  );
};

export default UserDetailsCard;