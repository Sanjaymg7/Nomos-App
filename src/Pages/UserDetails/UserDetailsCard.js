import React, { useState } from "react";
import userDetails from "./UserDetails.module.css";
import Image from "../../Components/Image/Image";
import Button from "../../Components/Button/Button";
import UserIcons from "../../Components/UserIcons/UserIcons";
import Comments from "../Comments/Comments/Comments";
import People from "../../Components/People/People";
import Request from "../../Components/Request/Request";

const UserDetailsCard = ({
  postData,
  callDate,
  isSameUser,
  isNotSameUser,
  user,
  button,
  acceptHandler,
  rejectHandler,
  response,
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
          src={postData.profile_picture_url}
          alt="image"
        />
      </div>
      <div className={userDetails.giveOrReceive}>
        {postData.post_type === 1
          ? "Experience"
          : postData.post_type
          ? "Item"
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
      <div className={userDetails.peopleComments}>
        <Button
          btnName="People"
          className={userDetails.people}
          onBtnClick={peopleHandler}
        />
        <Button
          btnName="Comments"
          className={userDetails.comments}
          onBtnClick={commentsHandler}
        />
      </div>
      <div className={userDetails.peopleOrCommentContainer}>
        {people
          ? user
            ? postData.interested_users.map((people, index) => (
                <Request
                  key={index}
                  id={people.user_id}
                  userName={people.user_name}
                  profilePicture={people.profile_picture_url}
                  status={people.status}
                  acceptHandler={acceptHandler}
                  rejectHandler={rejectHandler}
                  response={response}
                />
              ))
            : postData.interested_users.map((people, index) => (
                <People
                  key={index}
                  userId={people.user_id}
                  name={people.user_name}
                  profilePicture={people.profile_picture_url}
                  status={people.status}
                />
              ))
          : ""}
        {comments && <Comments />}
      </div>
      <Button
        btnName={user ? "Check your Inbox" : "I want to join this experience"}
        className={
          button
            ? `${userDetails.foorteButton} ${userDetails.footerButtonInActive}`
            : `${userDetails.foorteButton} ${userDetails.footerButtonActive}`
        }
        onBtnClick={user ? isSameUser : isNotSameUser}
        btnDisable={button ? true : false}
      />
    </div>
  );
};

export default UserDetailsCard;
