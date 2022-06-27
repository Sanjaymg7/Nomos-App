import React, { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../Components/Context/Context";
import Header from "../../Components/Header/Header";
import { getCall, postCall } from "../../Components/Services/DataFetch";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import {
  joinExperienceEndPoint,
  experienceRespondEndPoint,
} from "../../Library/Constants";
import UserDetailsCard from "./UserDetailsCard";
import Modal from "../../Components/Modal/Modal";

const UserDetails = () => {
  const [postData, setPostData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [modal, setModal] = useContext(ModalContext);
  const [displayData, setDisplayData] = useState(false);
  const [interestedUsers, setInterestedUsers] = useState([]);
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
        console.log(data);
        localStorage.setItem("post_user_id", data.posts[0].user_id);

        data.posts[0].interested_users = data.posts[0].interested_users.map(
          (comment) => ({
            ...comment,
            didRespond: false,
          })
        );
        setInterestedUsers(data.posts[0].interested_users);
        setPostData(data.posts[0]);
        console.log(postData);
        data.posts[0].user_id == localStorage.getItem("user_id") &&
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
      const data = await postCall(joinExperienceEndPoint, {
        post_id: localStorage.getItem("post_id"),
      });
      if (data) {
        console.log(data);
      }
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };
  const acceptRejectHandler = async (id, index, type) => {
    try {
      interestedUsers[index].didRespond = true;
      setInterestedUsers([...interestedUsers]);
      await postCall(experienceRespondEndPoint, {
        post_id: localStorage.getItem("post_id"),
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
  return (
    <>
      {isLoading && <Loading />}
      {modal.showModal && <Modal />}
      <Header navigateTo="home" headerText="Details" />
      {displayData ? (
        <UserDetailsCard
          postData={postData}
          callDate={callDate}
          isSameUser={isSameUser}
          isNotSameUser={isNotSameUser}
          user={user}
          button={button}
          response={postData.interested_users[0].didRespond}
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
