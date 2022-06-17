import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css";

const Loading = () => (
  <ReactLoading
    type="spinningBubbles"
    color="#00a86b"
    height="4rem"
    width="4rem"
    className="loading"
  />
);

export default Loading;
