import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doGETCall } from "../../DataFetch";
import Button from "../../Components/Button";
import "./CommunityComponent.css";

const CommunityComponent = ({ accessToken }) => {
  const navigate = useNavigate();
  const requestHeader = {
    "content-type": "application/json",
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyOTUsImlhdCI6MTY1NDI0MTQwNn0.fLe-hjqxHkbNbH_wr9ynKNOvcakk_vnYY3eiXQRK8Cs",
  };
  const [community, setCommunity] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await doGETCall("community/list?type=5", requestHeader);
      if (data) {
        setCommunity(data.communities);
      }
    };
    getData();
  }, []);

  const handleCommunity = (id) => {
    console.log(id);
  };

  const btnClickHandler = () => {
    navigate("/home");
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
              <Button
                btnContent={"Join"}
                className={"joinCommunityBtn"}
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
