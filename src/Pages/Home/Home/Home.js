import React, { useState, useEffect } from "react";
import Header from "../../../Components/Header/Header";
import "./Home.css";
import {
  getCall,
  putCall,
  postCall,
} from "../../../Components/Services/DataFetch";
import HomeCard from "../HomeCard/HomeCard";
import { modalInitialState } from "../../../Library/Constants";
import Footer from "../../../Components/Footer/Footer";
import Modal from "../../../Components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [modal, setModal] = useState(modalInitialState);
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      const data = await getCall("posts/?type=3");
      setPosts(data.posts);
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    } finally {
      setLoading(false);
    }
  };
  const updateLikesSetter = (post, index) => {
    posts[index].is_liked = !post.is_liked;
    posts[index].like_count = post.is_liked
      ? post.like_count + 1
      : post.like_count - 1;
    setPosts([...posts]);
  };
  const updateLikes = async (postId, post, index) => {
    updateLikesSetter(post, index);
    try {
      await putCall("posts/like/", { post_id: postId });
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
      updateLikesSetter(post);
    }
  };
  const postViews = async (postId) => {
    try {
      await postCall("posts/view/", { post_id: postId });
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };

  const logOutHandler = async () => {
    try {
      await postCall("users/logout", {});
      localStorage.removeItem("access_token");
      navigate("/");
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      {modal.showModal && (
        <Modal modalContent={modal.modalContent} closeModal={setModal} />
      )}
      <div className="home-container">
        <Header />
        <div onClick={logOutHandler} className="home-container-logout-div">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
        {posts?.map((post, index) => (
          <HomeCard
            key={post.post_id}
            index={index}
            post={post}
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
      </div>
      <Footer />
    </>
  );
};

export default Home;
