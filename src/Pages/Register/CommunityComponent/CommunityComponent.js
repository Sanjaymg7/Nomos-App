import React, { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../../Components/Context/Context";
import { useNavigate } from "react-router-dom";
import {
  communityNearby,
  joinCommunity,
  home,
  finish,
  waitingMessage,
} from "../../../Library/Constants";
import { getCall, postCall } from "../../../Components/Services/DataFetch";
import Button from "../../../Components/Button/Button";
import "./CommunityComponent.css";
import Modal from "../../../Components/Modal/Modal";
import Loading from "../../../Components/Loading/Loading";

const CommunityComponent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [community, setCommunity] = useState([]);
  const [addedCommunity, setAddedCommunity] = useState(0);
  const [modal, setModal] = useContext(ModalContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getCall(communityNearby);
        if (data) {
          setCommunity(
            data.communities.map((communityData) => ({
              ...communityData,
              isJoining: false,
            }))
          );
        }
      } catch (err) {
        setModal({ modalContent: err, showModal: true });
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [addedCommunity]);

  const handleCommunity = async (id, index) => {
    community[index].isJoining = true;
    setCommunity(community);
    const requestBody = {
      community_id: id,
    };
    try {
      const data = await postCall(joinCommunity, requestBody);
      if (data) {
        setAddedCommunity(addedCommunity + 1);
      }
    } catch (err) {
      setAddedCommunity(addedCommunity);
      setModal({ modalContent: err, showModal: true });
    }
  };

  const btnClickHandler = () => {
    navigate(home);
  };

  return (
    <div className="comp4Container">
      {modal.showModal && <Modal />}
      <h3 className="comp4h3">Join Community</h3>
      <h4 className="comp4Text">
        Select from the list below or create your own
      </h4>
      {isLoading ? (
        <div className="loadingContainer">
          <Loading />
        </div>
      ) : community.length === 0 ? (
        <div className="messageContainer">
          <p className="comp4Message">
            `No communities around.
            <br /> You can skip or create your own.`
          </p>
        </div>
      ) : (
        community.map((communityData, index) => {
          return (
            <div key={index} className="communityCardContainer">
              <img
                className="communityImage"
                src={communityData.community_picture_url}
                alt="Community"
              />
              <h2 className="communityName">{communityData.community_name}</h2>
              <p className="communityDescription">
                {communityData.community_description}
              </p>
              <Button
                btnName={
                  communityData.joined
                    ? "Joined"
                    : communityData.isJoining
                    ? waitingMessage
                    : "Join"
                }
                className={
                  communityData.joined || communityData.isJoining
                    ? "btnGrey"
                    : "joinCommunityBtn"
                }
                btnDisable={
                  communityData.joined || communityData.isJoining ? true : false
                }
                onBtnClick={() =>
                  handleCommunity(communityData.community_id, index)
                }
              />
            </div>
          );
        })
      )}
      <Button
        btnName={finish}
        className={"btnGreen"}
        onBtnClick={btnClickHandler}
      />
    </div>
  );
};

export default CommunityComponent;
