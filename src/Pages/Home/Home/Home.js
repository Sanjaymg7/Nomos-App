import React, { useState, useEffect } from "react";
import Header from "../../../Components/Header/Header";
import "./Home.css";
import { getCall, putCall } from "../../../Components/Services/DataFetch";
import HomeCard from "../HomeCard/HomeCard";
import { getRequestHeader } from "../../../Library/Constants";
import { modalInitialState } from "../../../Library/Constants";
import Footer from "../../../Components/Footer/Footer";
import Modal from "../../../Components/Modal/Modal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(modalInitialState);
  const [posts, setPosts] = useState();
  const [likeCount, setLikescount] = useState(false);
  // const [updateLiked, setUpdateLiked] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const setCommentsPage = (postId) => {
    localStorage.setItem("post_id", postId);
    navigate("/comments");
  };

  useEffect(() => {
    getData();
  }, [likeCount]);

  const getData = async () => {
    try {
      setLoading(true);
      const data = await getCall("posts/?type=3", getRequestHeader());
      setPosts(data.posts);
    } catch (err) {
      setModal({ modalContent: "Something went wrong!!", showModal: true });
    } finally {
      setLoading(false);
    }
  };
  const updateLikes = async (postId) => {
    try {
      await putCall("posts/like/", { post_id: postId }, getRequestHeader());
      setLikescount(!likeCount);
    } catch (err) {
      setModal({ modalContent: "Something went wrong!!", showModal: true });
    }
  };

  return (
    <>
      {isLoading && <div className="loading-text">Loading...</div>}
      {modal.showModal && (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
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
            setCommentsPage={setCommentsPage}
          />
        ))}
        <Footer />
      </div>
    </>
  );
};

export default Home;
