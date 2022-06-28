import React, { useState, useContext } from "react";
import { ModalContext } from "../../Components/Context/Context";
import { getCall, postCall } from "../../Components/Services/DataFetch";
import {
  friends,
  search,
  searchUser,
  userDefaultImage,
} from "../../Library/Constants";
import Header from "../../Components/Header/Header";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import Loading from "../../Components/Loading/Loading";
import "./SearchUser.css";
import Image from "../../Components/Image/Image";
import Modal from "../../Components/Modal/Modal";

const SearchUser = () => {
  const [modal, setModal] = useContext(ModalContext);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [users, setUsers] = useState([]);

  const handleSearchInputChange = (val) => {
    setSearchInput(val);
  };

  const handleUserSearch = async () => {
    if (searchInput.trim() !== "") {
      setIsLoading(true);
      try {
        const data = await getCall(searchUser + searchInput);
        const peopleData = data.people;
        setUsers(peopleData);
        setIsFirst(false);
      } catch (err) {
        setModal({
          modalContent: err,
          showModal: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const sendRequest = async (id, index) => {
    try {
      users[index].friendship_type = 2;
      setUsers([...users]);
      await postCall(friends, { friend_user_id: id });
    } catch (err) {
      users[index].friendship_type = 4;
      setUsers([...users]);
      setModal({
        modalContent: err,
        showModal: true,
      });
    }
  };

  return (
    <div>
      {modal.showModal && <Modal />}
      <Header navigateTo="home" headerText="Search Friend" />
      <div className="userSearchWrapper">
        <Input
          type="text"
          value={searchInput}
          className="searchUserInput"
          onInputChange={handleSearchInputChange}
        />
        <Button
          btnName={search}
          className="btnGreen"
          onBtnClick={handleUserSearch}
        />
      </div>
      <div className="userSearchResultContainer">
        {isLoading ? (
          <Loading />
        ) : users.length === 0 && !isFirst ? (
          <h4 className="userNotFound">User not found</h4>
        ) : (
          users.map((user, index) => (
            <div key={index} className="userSearchResult">
              <Image
                src={user.profile_picture || userDefaultImage}
                className="userSearchProfilePicture"
              />
              <h4 className="userSearchName">{user.user_name}</h4>
              {user.friendship_type === 1 && (
                <h6 className="friendshipStatus">Friend Request Received</h6>
              )}
              {user.friendship_type === 2 && (
                <h6 className="friendshipStatus">Friend Request Sent</h6>
              )}
              {user.friendship_type === 4 && (
                <Button
                  btnName="Send Request"
                  className={
                    user.isSent ? "sendRequestBtnDisabled" : "sendRequestBtn"
                  }
                  onBtnClick={() => sendRequest(user.user_id, index)}
                  btnDisable={user.isSent ? true : false}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchUser;
