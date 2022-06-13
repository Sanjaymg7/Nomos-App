import { Route, Navigate, Outlet } from "react-router-dom";
import Chat from "../../Pages/Chat/Chat";
import ResetPassword from "../../Pages/ForgotPassword/ResetPassword/ResetPassword";
import Home from "../../Pages/Home/Home/Home";
import Inbox from "../../Pages/Inbox/Inbox/Inbox";
import Intro from "../../Pages/Intro/Intro/Intro";
import ItemPost from "../../Pages/ItemPost/ItemPost";
import SignIn from "../../Pages/LogIn/SignIn";
import Post from "../../Pages/Post/Post";
import Register from "../../Pages/Register/Register";

const ProtectedRoute = ({ isProtectedRoute }) => {
  if (isProtectedRoute && !localStorage.getItem("access_token")) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

const routes = [
  { path: "/home", element: <Home />, isProtected: true },
  { path: "/post", element: <Post />, isProtected: true },
  { path: "/chat", element: <Chat />, isProtected: true },
  { path: "/inbox", element: <Inbox />, isProtected: true },
  { path: "/itempost", element: <ItemPost />, isProtected: true },
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