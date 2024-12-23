import React, { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../../Components/Context/Context";
import Header from "../../../Components/Header/Header";
import "./Home.css";
import {
  getCall,
  putCall,
  postCall,
} from "../../../Components/Services/DataFetch";
import HomeCard from "../HomeCard/HomeCard";
import Footer from "../../../Components/Footer/Footer";
import Modal from "../../../Components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  intro,
  likeEndPoint,
  logOutEndPoint,
  postsEndPoint,
  viewEndPoint,
  apiRetries,
  invalidAccessToken,
} from "../../../Library/Constants";

const Home = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useContext(ModalContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [retries, setRetries] = useState(apiRetries);

  const getData = async () => {
    if (apiRetries) {
      try {
        setLoading(true);
        const data = await getCall(postsEndPoint);
        setPosts(data.posts);
        setLoading(false);
      } catch (err) {
        if (retries === 1 || err === invalidAccessToken) {
          setModal({ modalContent: err, showModal: true });
          setLoading(false);
        } else {
          setRetries(retries - 1);
        }
      }
    }
  };

  useEffect(() => {
    getData();
  }, [retries]);

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
      await putCall(likeEndPoint, { post_id: postId });
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
      updateLikesSetter(post);
    }
  };
  const postViews = async (postId) => {
    try {
      await postCall(viewEndPoint, { post_id: postId });
    } catch (err) {
      setModal({ modalContent: err, showModal: true });
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate(intro);
  };

  const logOutHandler = async () => {
    try {
      await postCall(logOutEndPoint, {});
      logout();
    } catch (err) {
      if (err === "Invalid access token") {
        logout();
      }
      setModal({ modalContent: err, showModal: true });
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      {modal.showModal && <Modal />}
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
            postViews={postViews}
            updateLikes={updateLikes}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
