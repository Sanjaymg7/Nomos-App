// import { useNavigate } from "react-router-dom";

// const GetNavigator = () => {
//   const navigate = useNavigate();
//   return navigate;
// };
const getRequestHeader = () => ({
  "content-type": "application/json",
  access_token: localStorage.getItem("access_token"),
});

export const requestHeader = getRequestHeader();
export const navigate = (val) => {};
