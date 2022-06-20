import React, { useState, useEffect } from "react";
import { getCall } from "../../Components/Services/DataFetch";
import { modalInitialState, friendRequest } from "../../Library/Constants";
import Header from "../../Components/Header/Header";
import Modal from "../../Components/Modal/Modal";
import Image from "../../Components/Image/Image";
import "./AcceptFriendRequest.css";
import Button from "../../Components/Button/Button";
import Loading from "../../Components/Loading/Loading";

const AcceptFriendRequest = () => {
  const [modal, setModal] = useState(modalInitialState);
  const [friendRequests, setFriendRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFriendRequests = async () => {
    try {
      const data = await getCall(friendRequest);
      setFriendRequests(
        data.map((request) => ({ ...request, didRespond: false }))
      );
    } catch (err) {
      setModal({
        modalContent: err,
        showModal: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const acceptRequest = (id, index) => {
    console.log(id);
  };

  const rejectRequest = (id, index) => {
    console.log(id);
  };

  useEffect(() => {
    getFriendRequests();
  }, []);

  return (
    <div>
      {modal.showModal && (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
      )}
      <Header navigateTo="home" headerText="Accept Friend Request" />
      <div className="friendRequestContainer">
        {isLoading ? (
          <Loading />
        ) : (
          friendRequests.map((request, index) => (
            <div key={index} className="friendRequestWrapper">
              <Image
                src={request.profile_picture}
                className="requestUserProfilePicture"
              />
              <h4 className="requestUserName">{request.user_name}</h4>
              <Button
                btnName="Accept"
                className={
                  request.didRespond ? "respondBtnDisabled" : "requestAcceptBtn"
                }
                onBtnClick={() => acceptRequest(request.user_id, index)}
                btnDisable={request.didRespond ? true : false}
              />
              <Button
                btnName="Reject"
                className={
                  request.didRespond ? "respondBtnDisabled" : "requestRejectBtn"
                }
                onBtnClick={() => rejectRequest(request.user_id, index)}
                btnDisable={request.didRespond ? true : false}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AcceptFriendRequest;
