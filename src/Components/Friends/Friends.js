import React, { useEffect, useState } from "react";
import { getRequestHeader } from "../../Library/Constants";
import { getCall } from "../Services/DataFetch";
import Image from "../Image/Image";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { modalInitialState } from "../../Library/Constants";
import "./Friends.css";

const Friends = ({ handleFriendsSubmit, selectType, userType }) => {
  const [friends, setFriends] = useState([]);
  const [selectedUsersId, setSelectedUsersId] = useState([]);
  const [selectedUsersName, setSelectedUsersName] = useState([]);
  const [modal, setModal] = useState(modalInitialState);

  const getFriends = async () => {
    try {
      const data = await getCall(
        "friends/?friendship_type=3",
        getRequestHeader()
      );
      setFriends(data.map((friend) => ({ ...friend, isSelected: false })));
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  const handleMultipleFriendSelect = (index) => {
    if (friends[index].isSelected) {
      friends[index].isSelected = false;
      selectedUsersId.splice(
        selectedUsersId.indexOf(friends[index].user_id),
        1
      );
      selectedUsersName.splice(
        selectedUsersName.indexOf(friends[index].user_name),
        1
      );
      setFriends(friends);
      setSelectedUsersName(selectedUsersName);
      setSelectedUsersId([...selectedUsersId]);
    } else {
      friends[index].isSelected = true;
      setFriends(friends);
      setSelectedUsersName([...selectedUsersName, friends[index].user_name]);
      setSelectedUsersId([...selectedUsersId, friends[index].user_id]);
    }
  };

  const handleSingleFriendSelect = (index, id, name) => {
    if (userType === "chatUser") {
      handleFriendsSubmit(id, name);
    } else {
      friends.forEach((friend) => {
        friend.isSelected = false;
      });
      friends[index].isSelected = true;
      setFriends(friends);
      setSelectedUsersName([friends[index].user_name]);
      setSelectedUsersId([friends[index].user_id]);
    }
  };

  const handleFriendSubmit = () => {
    handleFriendsSubmit(selectedUsersId, selectedUsersName, userType);
  };

  return (
    <div>
      {modal.showModal && (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
      )}
      {userType === "chatUser" ? (
        ""
      ) : (
        <h1 className="friendsTitle">Select {userType}</h1>
      )}

      <div className="friendsContainer">
        {friends.map((friend, index) => (
          <div
            key={index}
            className={
              friend.isSelected ? "friendCard activeFriendCard" : "friendCard"
            }
            onClick={() =>
              selectType === "single"
                ? handleSingleFriendSelect(
                    index,
                    friend.user_id,
                    friend.user_name
                  )
                : handleMultipleFriendSelect(index)
            }
          >
            <Image
              src={friend.profile_picture}
              className="friendsProfilePicture"
            />
            <h4 className="friendName">{friend.user_name}</h4>
          </div>
        ))}
        {userType !== "chatUser" && (
          <Button
            btnName="Submit"
            className="btnGreen"
            onBtnClick={handleFriendSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(Friends);
