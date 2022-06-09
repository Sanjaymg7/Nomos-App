import React, { useState, useEffect } from "react";
import { requestHeader } from "../../../Library/Constants";
import { navigate } from "../../../Library/Constants";
import { getCall, postCall } from "../../../Components/Services/DataFetch";
import Button from "../../../Components/Button/Button";
import "./CommunityComponent.css";

const CommunityComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [community, setCommunity] = useState([]);
  const [addedCommunity, setAddedCommunity] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getCall("community/list?type=5", requestHeader);
        if (data) {
          setCommunity(data.communities);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [addedCommunity]);

  const handleCommunity = async (id) => {
    const requestBody = {
      community_id: id,
    };
    try {
      const data = await postCall("community/join", requestBody, requestHeader);
      if (data) {
        setAddedCommunity(addedCommunity + 1);
      }
    } catch (err) {
      setAddedCommunity(addedCommunity);
      console.log(err);
    }
  };

  const btnClickHandler = () => {
    navigate("/post");
  };

  return (
    <div className="comp4Container">
      <h3 className="comp4h3">Join Community</h3>
      <span className="comp4Text">
        Select from the list below or create your own
      </span>
      {isLoading}
      {community.length === 0 ? (
        <div className="messageContainer">
          <span className="comp4Message">
            {isLoading
              ? "Please Wait..."
              : `No communities around.
            <br /> You can skip or create your own.`}
          </span>
        </div>
      ) : (
        community.map((communityData) => {
          return (
            <div
              key={communityData.community_id}
              className="communityCardContainer"
            >
              <img
                className="communityImage"
                src={communityData.community_cover_picture_url}
              />
              <h2 className="communityName">{communityData.community_name}</h2>
              <p className="communityDescription">
                {communityData.community_description}
              </p>
              <Button
                btnContent={communityData.joined ? "Joined" : "Join"}
                className={
                  communityData.joined ? "btnGrey" : "joinCommunityBtn"
                }
                btnDisable={communityData.joined ? true : false}
                onBtnClick={() => handleCommunity(communityData.community_id)}
              />
            </div>
          );
        })
      )}
      <Button
        btnContent={"Finish"}
        className={"btnGreen"}
        onBtnClick={btnClickHandler}
      />
    </div>
  );
};

export default React.memo(CommunityComponent);
