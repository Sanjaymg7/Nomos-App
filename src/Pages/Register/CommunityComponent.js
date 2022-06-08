import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { doGETCall, doPOSTCall } from "../../DataFetch";
import Button from "../../Components/Button/Button";
import "./CommunityComponent.css";

const CommunityComponent = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["access_token"]);
  const requestHeader = {
    "content-type": "application/json",
    access_token: cookies.access_token,
  };
  const [community, setCommunity] = useState([]);
  const [addedCommunity, setAddedCommunity] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = await doGETCall("community/list?type=5", requestHeader);
      if (data) {
        setCommunity(data.communities);
      }
    };
    getData();
  }, [addedCommunity]);

  const handleCommunity = async (id) => {
    const requestBody = {
      community_id: id,
    };
    const data = await doPOSTCall("community/join", requestBody, requestHeader);
    if (data) {
      setAddedCommunity(addedCommunity + 1);
    } else {
      setAddedCommunity(addedCommunity);
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
      {community.length === 0 ? (
        <div className="messageContainer">
          <span className="comp4Message">
            No communities around.
            <br /> You can skip or create your own.
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
              {communityData.joined ? (
                <Button
                  btnContent={"Joined"}
                  className={"btnGrey"}
                  btnDisable={true}
                />
              ) : (
                <Button
                  btnContent={"Join"}
                  className={"joinCommunityBtn"}
                  onBtnClick={() => handleCommunity(communityData.community_id)}
                />
              )}
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
