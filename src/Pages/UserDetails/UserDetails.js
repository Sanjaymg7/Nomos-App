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
import UserDetailsCard from "./UserDetailsCard";

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
        console.log(data);
        setPostData(data.posts[0]);
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
      console.log(data);
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      {/* {modal.showModal && <Modal />} */}
      <Header navigateTo="home" headerText="Details" />
      {displayData ? (
        <UserDetailsCard
          postData={postData}
          callDate={callDate}
          isSameUser={isSameUser}
          isNotSameUser={isNotSameUser}
          user={user}
          button={button}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default UserDetails;
