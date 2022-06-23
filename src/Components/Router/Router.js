import { Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Chat from "../../Pages/Chat/Chat";
import ResetPassword from "../../Pages/ForgotPassword/ResetPassword/ResetPassword";
import Home from "../../Pages/Home/Home/Home";
import Inbox from "../../Pages/Inbox/Inbox/Inbox";
import Intro from "../../Pages/Intro/Intro/Intro";
import ItemPost from "../../Pages/ItemPost/ItemPost";
import SignIn from "../../Pages/LogIn/SignIn";
import Post from "../../Pages/Post/ServicePost";
import Comments from "../../Pages/Comments/Comments/Comments";
import Register from "../../Pages/Register/Register";
import ExperiencePost from "../../Pages/Experience/ExperiencePost";
import CommunityPost from "../../Pages/Community/CommunityPost";
import SearchUser from "../../Pages/SearchUser/SearchUser";
import AcceptFriendRequest from "../../Pages/AcceptFriendRequest/AcceptFriendRequest";
import UserDetails from "../../Pages/UserDetails/UserDetails";
import InfoPost from "../../Pages/InfoPost/InfoPost";

const ProtectedRoute = ({ isProtectedRoute }) => {
  const location = useLocation();
  if (isProtectedRoute && !localStorage.getItem("access_token")) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

const routes = [
  { path: "/home", element: <Home />, isProtected: true },
  { path: "/post", element: <Post />, isProtected: true },
  { path: "/chat", element: <Chat />, isProtected: true },
  { path: "/inbox", element: <Inbox />, isProtected: true },
  { path: "/itempost", element: <ItemPost />, isProtected: true },
  { path: "/comments", element: <Comments />, isProtected: true },
  { path: "/experience", element: <ExperiencePost />, isProtected: true },
  { path: "/community", element: <CommunityPost />, isProtected: true },
  { path: "/infopost", element: <InfoPost />, isProtected: true },
  { path: "/searchUser", element: <SearchUser />, isProtected: true },
  { path: "/acceptUser", element: <AcceptFriendRequest />, isProtected: true },
  { path: "/userdetails", element: <UserDetails />, isProtected: true },
  { path: "/", element: <Intro />, isProtected: false },
  { path: "/signin", element: <SignIn />, isProtected: false },
  { path: "/forgotpassword", element: <ResetPassword />, isProtected: false },
  { path: "/signup", element: <Register />, isProtected: false },
];

export const appRoutes = routes.map((route, index) => (
  <Route
    key={index}
    element={<ProtectedRoute isProtectedRoute={route.isProtected} />}
  >
    <Route exact path={route.path} element={route.element} />
  </Route>
));
