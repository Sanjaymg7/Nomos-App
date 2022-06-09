import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Intro from "./Pages/Intro/Intro/Intro";
import SignIn from "./Pages/LogIn/SignIn";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home/Home";
import Post from "./Pages/Post/Post";
import Chat from "./Pages/Chat/Chat";
import ResetPassword from "./Pages/ForgotPassword/ResetPassword/ResetPassword";
import Inbox from "./Pages/Inbox/Inbox/Inbox";

const ProtectedRoute = ({ access_token, redirectPath = "/" }) => {
  if (!access_token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

const App = () => {
  const protectedRoutes = [
    { path: "/home", element: Home },
    { path: "/post", element: Post },
    { path: "/chat", element: Chat },
    { path: "/inbox", element: Inbox },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Intro />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/forgotpassword" element={<ResetPassword />} />
        <Route exact path="/signup" element={<Register />} />
        <Route
          element={
            <ProtectedRoute
              access_token={localStorage.getItem("access_token")}
            />
          }
        >
          {/* {protectedRoutes.map((route, index) => (
            <Route
              key={index}
              exact
              path={route.path}
              element={route.element}
            />
          ))} */}
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/post" element={<Post />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/inbox" element={<Inbox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
