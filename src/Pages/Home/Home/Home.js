import React, { useState, useEffect } from "react";
import Header from "../../../Components/Header/Header";
import "./Home.css";
import { getCall, putCall } from "../../../Components/Services/DataFetch";
import HomeCard from "../HomeCard/HomeCard";
import { getRequestHeader } from "../../../Library/Constants";
import { modalInitialState } from "../../../Library/Constants";
import Footer from "../../../Components/FooterComponent/Footer";
import Modal from "../../../Components/Modal/Modal";

const Home = () => {
  const [modal, setModal] = useState(modalInitialState);
  const [posts, setPosts] = useState();
  const [likeCount, setLikescount] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleCloseModal = () => {
    setModal(modalInitialState);
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const data = await getCall("posts/?type=3", getRequestHeader());
      setPosts(data.posts);
      setLoading(false);
      console.log(data.posts)
    } catch (err) {
      setLoading(false)
      setModal({ modalContent: err, showModal: true });
    }
  };
  const updateLikes = async (postId) => {
    try {
      await putCall("posts/like/", { post_id: postId }, getRequestHeader());
      setLikescount(!likeCount);
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };

  return (
    <>
    {isLoading&&<div className="loading-text">Loading...</div>}
      {modal.showModal && (
        <Modal
          modalContent={modal.modalContent}
          closeModal={handleCloseModal}
        />
      )}
      <div className="home-container">
        <Header />
        {posts?.map((post) => (
          <HomeCard
            key={post.post_id}
            postId={post.post_id}
            userName={post.user_name}
            title={post.title}
            profilePicture={post.profile_picture_url}
            description={post.description}
            imageURL={post.image_url}
            interested={post.interested_user_count}
            views={post.views_count}
            comments={post.comment_count}
            likes={post.like_count}
            isLiked={post.is_liked}
            updateLikes={updateLikes}
          />
        ))}
        <Footer />
      </div>
    </>
  );
};

export default React.memo(Home);
