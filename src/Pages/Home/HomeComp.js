import React, { useState, useEffect } from "react";
import "./HomeComp.css";
import { doGETCall } from "../../DataFetch";
import { useCookies } from "react-cookie";
import HomeCard from "./HomeCard";

const HomeComp = () => {
  const [cookies, setCookie] = useCookies();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await doGETCall("posts/", {
        "content-type": "application/json",
        access_token: cookies.access_token,
      });
      setPosts(data.posts);
      console.log(posts);
    };
    getData();
  }, []);
  return (
    <>
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
    </>
  );
};

export default HomeComp;
