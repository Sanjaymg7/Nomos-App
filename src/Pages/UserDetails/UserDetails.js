import React, { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../Components/Context/Context";
import Header from "../../Components/Header/Header";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import {
  joinExperienceEndPoint,
  experienceRespondEndPoint,
  apiRetries,
  invalidAccessToken,
  home,
  inbox,
  deletePostEndPoint,
  postDetailsEndpoint,
} from "../../Library/Constants";
import UserDetailsCard from "./UserDetailsCard";
import Modal from "../../Components/Modal/Modal";
import userDetails from "./UserDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import useLocalStorage from "../../Hooks/useLocalStorage";
import useDataFetch from "../../Hooks/useDataFetch";

const UserDetails = () => {
  const [postData, setPostData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [modal, setModal] = useContext(ModalContext);
  const [displayData, setDisplayData] = useState(false);
  const [interestedUsers, setInterestedUsers] = useState([]);
  const [user, setUser] = useState(false);
  const [button, setButton] = useState(false);
  const [retries, setRetries] = useState(apiRetries);
  const [isDelete, setIsDelete] = useState(false);
  const [, setPostUserId] = useLocalStorage("post_user_id");
  const [post_id] = useLocalStorage("post_id");
  const [user_id] = useLocalStorage("user_id");
  const [getCall, putCall, postCall] = useDataFetch();

  const navigate = useNavigate();
  const getPostData = async () => {
    if (retries) {
      try {
        const data = await getCall(postDetailsEndpoint + post_id);
        if (data) {
          setPostUserId(data.posts[0].user_id);
          data.posts[0].interested_users = data.posts[0].interested_users.map(
            (comment) => ({
              ...comment,
              didRespond: false,
            })
          );
          setInterestedUsers(data.posts[0].interested_users);
          setPostData(data.posts[0]);
          data.posts[0].user_id == user_id && setUser(true);
          setDisplayData(!displayData);
        }
        setLoading(false);
      } catch (err) {
        if (err == "Post not found") {
          navigate(home);
        } else if (retries === 1 || err === invalidAccessToken) {
          setModal({ modalContent: err, showModal: true });
          setLoading(false);
        } else {
          setRetries(retries - 1);
        }
      }
    }
  };

  useEffect(() => {
    getPostData();
  }, [retries]);

  const callDate = (timeStamp) => {
    const dt = new Date(timeStamp);
    let dateToString = dt.toUTCString().split(" ");
    return dateToString[0] + " " + dateToString[1] + " " + dateToString[2];
  };
  const isSameUser = () => {
    navigate(inbox);
  };
  const isNotSameUser = async () => {
    try {
      setButton(true);
      const data = await postCall(joinExperienceEndPoint, {
        post_id: post_id,
      });
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };
  const acceptRejectHandler = async (id, index, type) => {
    try {
      interestedUsers[index].didRespond = true;
      setInterestedUsers([...interestedUsers]);
      await postCall(experienceRespondEndPoint, {
        post_id: post_id,
        response_type: type,
        user_id: id,
      });
    } catch (err) {
      interestedUsers[index].didRespond = false;
      setInterestedUsers([...interestedUsers]);
      console.log(err);
    }
  };
  const rejectHandler = (id, index) => {
    acceptRejectHandler(id, index, 2);
  };
  const acceptHandler = (id, index) => {
    acceptRejectHandler(id, index, 1);
  };
  const toggleHandler = () => {
    setIsDelete(!isDelete);
  };
  const postDeleteHandler = async () => {
    if (postData.user_id == user_id) {
      try {
        const data = await putCall(deletePostEndPoint, {
          post_id: post_id,
        });
        if (data) {
          setIsDelete(false);
          navigate(home);
        }
      } catch (err) {
        setIsDelete(false);
        setModal({ modalContent: err, showModal: true });
      }
    } else {
      setModal({ modalContent: "You cant delete post", showModal: true });
      setIsDelete(false);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      {modal.showModal && <Modal />}
      <Header navigateTo="home" headerText="Details" />
      <div onClick={toggleHandler} className={userDetails.deleteDots}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
      {isDelete && (
        <div
          onClick={postDeleteHandler}
          className={userDetails.dropdownContent}
        >
          <p>Delete</p>
        </div>
      )}
      {displayData ? (
        <UserDetailsCard
          postData={postData}
          callDate={callDate}
          isSameUser={isSameUser}
          isNotSameUser={isNotSameUser}
          user={user}
          button={button}
          acceptHandler={acceptHandler}
          rejectHandler={rejectHandler}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default UserDetails;
