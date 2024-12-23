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
  const {
    image_url,
    user_name,
    profile_picture_url,
    post_type,
    title,
    start_time,
    member_limitation,
    description,
    location,
    post_distance,
    skills,
    interested_users,
    photo_urls,
  } = postData;
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
  const experiencePost = 1;
  const serviceRequestPost = 2;
  const itemBorrowPost = 3;
  const infoPost = 6;
  return (
    <div className={userDetails.container}>
      <Image className={userDetails.image} src={image_url} alt="image" />
      <div className={userDetails.otherUser}>
        Offered by <span>{user_name}</span>
        <Image
          className={userDetails.otherUserImage}
          src={profile_picture_url || userDefaultImage}
          alt="image"
        />
      </div>
      <div className={userDetails.giveOrReceive}>
        {post_type === experiencePost && "Experience"}
        {post_type === serviceRequestPost && "Service"}
        {post_type === itemBorrowPost && "Item Borrow"}
        {post_type === infoPost && "Info"}
      </div>
      <div className={userDetails.description}>
        <h4>{title}</h4>
        {post_type === experiencePost && (
          <div className={userDetails.dateCapacity}>
            <div className={userDetails.date}>
              <h4>{callDate(start_time)}</h4>
              <h5 className={userDetails.h5}>start Date</h5>
            </div>
            <div className={userDetails.date}>
              <h4>{member_limitation} people</h4>
              <h5 className={userDetails.h5}>total capacity</h5>
            </div>
          </div>
        )}
        <p className={userDetails.pTag}>{description}</p>
      </div>
      <div className={userDetails.location}>
        <p className={`${userDetails.pTag} ${userDetails.removeMargin}`}>
          {location.name}
        </p>
        <p className={`${userDetails.pTag} ${userDetails.removeMargin}`}>
          {post_distance} miles away
        </p>
      </div>
      {skills.length > 0 && (
        <>
          <h4 className={userDetails.skillText}>Skills</h4>
          <div className={userDetails.skills}>
            {skills.map((skill) => (
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
      {interested_users.filter(
        (user) => user.user_id == localStorage.getItem("user_id")
      ).length > 0
        ? ""
        : post_type === experiencePost && (
            <Button
              btnName={
                user ? "Check your Inbox" : "I want to join this experience"
              }
              className={
                button
                  ? `${userDetails.footerButton} ${userDetails.footerButtonInActive}`
                  : `${userDetails.footerButton} ${userDetails.footerButtonActive}`
              }
              onBtnClick={user ? isSameUser : isNotSameUser}
              btnDisable={button ? true : false}
            />
          )}
      {post_type == experiencePost && (
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
      {photo_urls.length >= 0 &&
        (post_type == experiencePost ||
          post_type == serviceRequestPost ||
          post_type == itemBorrowPost ||
          post_type == infoPost) && (
          <div className={userDetails.photos}>
            {photo_urls.map((photo, index) => (
              <Image
                className={userDetails.photo}
                key={index}
                src={photo.url}
                alt="iamge"
              />
            ))}
          </div>
        )}
      <div className={userDetails.peopleOrCommentContainer}>
        {post_type == experiencePost && people ? (
          user ? (
            interested_users.length == 0 ? (
              <div className="no-comments">
                <Image src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/CCDC8F0E-3303-497F-8236-F98E48805D0A.png" />
                Nobody here yet <br /> be the first
              </div>
            ) : (
              interested_users.map((people, index) =>
                people.status == experiencePost ? (
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
                ) : people.status == serviceRequestPost ? (
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
          ) : interested_users.length == 0 ? (
            <div className="no-comments">
              <Image src="https://cdn.zeplin.io/5ee1133b3c75ae9aea1e8b2f/assets/CCDC8F0E-3303-497F-8236-F98E48805D0A.png" />
              Nobody here yet <br /> be the first
            </div>
          ) : (
            interested_users.map((people, index) => (
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
