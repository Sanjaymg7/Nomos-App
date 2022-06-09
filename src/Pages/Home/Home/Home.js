import React, { useState, useEffect } from "react";
import Header from "../../../Components/Header/Header";
import "./Home.css";
import { getCall } from "../../../Components/Services/DataFetch";
import { useCookies } from "react-cookie";
import HomeCard from "../HomeCard/HomeCard";
import Footer from "../../../Components/FooterComponent/Footer";

const Home = () => {
  const [cookies] = useCookies();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const data = await getCall("posts/", {
      "content-type": "application/json",
      access_token: cookies.access_token,
    });
    setPosts(data.posts);
  };

  return (
    <div className="home-container">
      <Header />
      {posts?.map((post) => (
        <HomeCard
          key={post.post_id}
          userName={post.user_name}
          title={post.title}
          profilePicture={post.profile_picture_url}
          description={post.description}
          imageURL={post.image_url}
          interested={post.interested_user_count}
          views={post.views_count}
          comments={post.comment_count}
          likes={post.like_count}
        />
      ))}

      <Footer />
    </div>
  );
};

export default React.memo(Home);
