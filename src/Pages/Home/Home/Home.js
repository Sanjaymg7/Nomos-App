import React, { useState, useEffect } from "react";
import Header from "../../../Components/Header/Header";
import "./Home.css";
import {
  getCall,
  putCall,
  postCall,
} from "../../../Components/Services/DataFetch";
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
  const [likeCount, setLikescount] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const setCommentsPage = (postId) => {
    localStorage.setItem("post_id", postId);
    navigate("/comments");
  };

  useEffect(() => {
    getData();
  }, []);

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
  const updateLikes = async (postId, isLiked, likes) => {
    if (isLiked) {
      setIsLiked(!isLiked);
      setLikescount(likes - 1);
    }else {
      setIsLiked(!isLiked);
      setLikescount(likes + 1);
    }
    try {
      await putCall("posts/like/", { post_id: postId }, getRequestHeader());
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };
  const postViews = async (postId) => {
    console.log("View");
    try {
      await postCall("posts/view/", { post_id: postId }, getRequestHeader());
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
            views={post.views_count}
            comments={post.comment_count}
            likes={post.like_count}
            isLiked={post.is_liked}
            postViews={postViews}
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
