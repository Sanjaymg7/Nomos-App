import React, { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../Components/Context/Context";
import { getCall, putCall } from "../../Components/Services/DataFetch";
import {
  friendRequest,
  friends,
  apiRetries,
  invalidAccessToken,
} from "../../Library/Constants";
import Header from "../../Components/Header/Header";
import Modal from "../../Components/Modal/Modal";
import "./AcceptFriendRequest.css";
import Loading from "../../Components/Loading/Loading";
import Request from "../../Components/Request/Request";

const AcceptFriendRequest = () => {
  const [modal, setModal] = useContext(ModalContext);
  const [friendRequests, setFriendRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [retries, setRetries] = useState(apiRetries);

  const getFriendRequests = async () => {
    if (retries) {
      try {
        const data = await getCall(friendRequest);
        setFriendRequests(
          data.map((request) => ({ ...request, didRespond: false }))
        );
        setIsLoading(false);
      } catch (err) {
        if (retries === 1 || err === invalidAccessToken) {
          setModal({ modalContent: err, showModal: true });
          setIsLoading(false);
        } else {
          setRetries(retries - 1);
        }
      }
    }
  };

  useEffect(() => {
    getFriendRequests();
  }, [retries]);

  const handleRequest = async (id, index, type) => {
    try {
      friendRequests[index].didRespond = true;
      setFriendRequests([...friendRequests]);
      await putCall(friends, {
        requested_id: id,
        respond_type: type,
      });
    } catch (err) {
      friendRequests[index].didRespond = false;
      setFriendRequests([...friendRequests]);
      setModal({
        modalContent: err,
        showModal: true,
      });
    }
  };

  const acceptRequest = (id, index) => {
    handleRequest(id, index, 1);
  };

  const rejectRequest = (id, index) => {
    handleRequest(id, index, 2);
  };

  return (
    <div>
      {modal.showModal && <Modal />}
      <Header navigateTo="home" headerText="Accept Friend Request" />
      <div className="friendRequestContainer">
        {isLoading ? (
          <Loading />
        ) : friendRequests.length === 0 ? (
          <h1 className="noRequestMessage">There are no friend requests</h1>
        ) : (
          friendRequests.map((request, index) => (
            <Request
              key={index}
              id={request.request_id}
              index={index}
              profilePicture={request.profile_picture}
              userName={request.user_name}
              response={request.didRespond}
              acceptHandler={acceptRequest}
              rejectHandler={rejectRequest}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AcceptFriendRequest;
