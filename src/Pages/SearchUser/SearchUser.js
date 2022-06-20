import React, { useState } from "react";
import { getCall, postCall } from "../../Components/Services/DataFetch";
import {
  friends,
  modalInitialState,
  searchUser,
} from "../../Library/Constants";
import Header from "../../Components/Header/Header";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import Loading from "../../Components/Loading/Loading";
import "./SearchUser.css";
import Image from "../../Components/Image/Image";
import Modal from "../../Components/Modal/Modal";

const SearchUser = () => {
  const [modal, setModal] = useState(modalInitialState);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const handleSearchInputChange = (val) => {
    setSearchInput(val);
  };

  const handleUserSearch = async () => {
    if (searchInput.trim() !== "") {
      setIsLoading(true);
      try {
        const data = await getCall(searchUser + searchInput);
        const nonFriends = data.people.filter(
          (friend) => friend.friendship_type === 4
        );
        setUsers(
          nonFriends.map((nonFriend) => ({ ...nonFriend, isSent: false }))
        );
        console.log(users);
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
      await postCall(friends, { friend_user_id: id });
    } catch (err) {
      setModal({
        modalContent: err,
        showModal: true,
      });
    }
    users[index].isSent = true;
    setUsers([...users]);
  };
  return (
    <div>
      {modal.showModal && (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
      )}
      <Header navigateTo="home" headerText="Search Friend" />
      <div className="userSearchWrapper">
        <Input
          type="text"
          value={searchInput}
          className="searchUserInput"
          onInputChange={handleSearchInputChange}
        />
        <Button
          btnName="Search"
          className="btnGreen"
          onBtnClick={handleUserSearch}
        />
      </div>
      <div className="userSearchResultContainer">
        {isLoading ? (
          <Loading />
        ) : (
          users.map((user, index) => (
            <div key={index} className="userSearchResult">
              <Image
                src={user.profile_picture}
                className="userSearchProfilePicture"
              />
              <h4 className="userSearchName">{user.user_name}</h4>
              <Button
                btnName="Send Request"
                className={
                  user.isSent ? "sendRequestBtnDisabled" : "sendRequestBtn"
                }
                onBtnClick={() => sendRequest(user.user_id, index)}
                btnDisable={user.isSent ? true : false}
              />
            </div>
          ))
        )}
        {/* <div className="userSearchResult">
          <Image src={"./logo192.png"} className="userSearchProfilePicture" />
          <h4 className="userSearchName">Rohan</h4>
          <Button
            btnName="Send Request"
            className="sendRequestBtn"
            onBtnClick={() => sendRequest(3)}
          />
        </div> */}
      </div>
    </div>
  );
};

export default SearchUser;
