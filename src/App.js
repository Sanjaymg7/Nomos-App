import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./Pages/Intro/Intro";
import SignIn from "./Pages/LogIn/SignIn";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import Post from "./Pages/Post/Post";
import Chat from "./Pages/Chat/Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Intro />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/post" element={<Post />} />
        <Route exact path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
